const express = require('express');
const prisma = require('./utils/prismaClient');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors")
const scrape = require("./utils/scrape.js");
const dotenv = require('dotenv');
const cron = require("node-cron");
const nodemailer = require('nodemailer');
const userRoute = require('./routes/user.js');
const apiRoute = require('./routes/api.js');
const axios = require("axios");

// get config vars
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_HOST,
        pass: process.env.EMAIL_PASSWORD,
    }
});

async function addToDbAndSendEmails() {
    const distinctSearches = await prisma.search.findMany({distinct: ['query']})
    const searches = await prisma.search.findMany({include: {user: true}})
    for (let distinctSearch of distinctSearches) {
        try {
            const newArticles = await scrape(distinctSearch, null, null, null, null)
            searches.forEach(search => {
                if (search.query === distinctSearch.query) {

                    const email = search.user.email

                    const resultToSend = newArticles.filter(newArticle => {
                        return newArticle.price === 0
                            || (newArticle.price >= search.minPrice
                                || search.minPrice === null)
                            && (newArticle.price <= search.maxPrice
                                || search.maxPrice === null);
                    })
                    if (resultToSend.length > 0) {
                        const mailOptions = {
                            from: process.env.EMAIL_HOST,
                            to: email,
                            subject: 'New articles found',
                            html: resultToSend.map(article => {
                                return `<h3 style="display: inline">${article.title}</h3> <h5>${article.price === 0 ? "price not available" : article.price + " TND"}</h5> <img style="width: 280px;border-radius: 5px;height: 200px;" src="${article.thumbnail}" alt=""/><a style="display: block; width: 115px; height: 25px; background: #ffae90; padding: 10px; text-align: center; border-radius: 5px; color: black; font-weight: bold; line-height: 25px;" href="${article.sourceUrl}">take a look </a>`
                            }).join("\n")
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                    }
                }
            })

        } catch (e) {
            console.log(e)
        }
    }

}

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));

app.use('/', userRoute);
app.use('/api', apiRoute);

// cron job to run every 10 minutes
cron.schedule("*/10 * * * *", async function () {
    console.log("Cron Begin");
    try {
        await addToDbAndSendEmails()
    } catch (e) {
        console.log(e)
    }
    console.log("running a task every 10 minutes")
    let date = new Date().getTime() / 1000;
    try {
        let deleted = await prisma.article.deleteMany({
            where: {timestamp: {lt: parseInt(date - 2764800)}}
        })
        if (deleted) console.log("deleted old articles")
    } catch (e) {
        console.log(e)
    }
});

app.listen(3001);
