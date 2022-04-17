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
                                || search.maxPrice === null)
                        //todo: need to add sending emails with location conditions

                    })
                    if (resultToSend.length > 0) {
                        const mailOptions = {
                            from: process.env.EMAIL_HOST,
                            to: email,
                            subject: 'New articles found of ' + search.query + (search.region !== "" ? " in" + search.region : ""),
                            html: `<h1>Found ${resultToSend.length > 1 ? resultToSend.length + " new articles !" : "a new article !"} 🎉🎉</h1>` +
                                resultToSend.map(article => {
                                    return `<div style="padding: 20px">
                                            <h3 style="display: inline">${article.title}</h3> 
                                            <h4 style="color: #414141;">${article.price === 0 ? "Price not specified" : article.price + " TND"}</h4> 
                                            <div style="height: auto;">
                                                <img style="border-radius: 5px; max-width: 672px; max-height: 504px;" id="${article.id}"  src="${article.thumbnail}" alt="${article.title}"/>
                                                <div style=" width: auto; height: auto;margin: 0 auto;padding: 10px; justify-items: center">
                                                    <a style="width: 115px; height: 25px; background: #ffae90; padding: 20px; text-align: center; border-radius: 5px; color: black; font-weight: bold; line-height: 25px;" href="${article.sourceUrl}">
                                                    take a look 
                                                    </a>
                                                </div>
                                            </div>
                                        </div>`
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
    console.log("task Begin");
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
        if (deleted.count > 0) {
            deleted.count > 1 ? console.log("deleted ", deleted.count, " old articles") : console.log("deleted an old article")
        }
    } catch (e) {
        console.log(e)
    }
});
//running task evrey 3 hour
cron.schedule("0 0 */3 * * *", async function () {
    console.log("checking-existance task begin");
    let articles = await prisma.article.findMany({})
    for (const article of articles) {
        try {
            await axios.get(article.sourceUrl)
        } catch (e) {
            await prisma.article.delete({
                where: {
                    id: article.id
                }
            })
            console.log("deleted an article that no longer exists, id: ", article.id)
        }
        try {
            await axios.get(article.thumbnail)
        } catch (e) {
            await prisma.article.update({
                where: {
                    id: article.id
                }, data: {
                    thumbnail: "https://www.linkpicture.com/q/sorry-image-not-available.png"
                }
            })
            console.log("replacing an article's thumbnail with a default image, id: ", article.id);
        }

    }
});


app.listen(3001);
