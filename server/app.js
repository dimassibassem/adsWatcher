const bcrypt = require('bcrypt');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors")
const scrape = require("./scrape.js");
const axios = require("axios");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {decode, getImages, getData} = require("./functions");
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const prisma = require('./prismaClient');
const cron = require("node-cron");
const nodemailer = require('nodemailer');

// get config vars
dotenv.config();

// access config var
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_HOST,
        pass: process.env.EMAIL_PASSWORD,
    }
});


app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));


function generateAccessToken(username, email, userId) {
    return jwt.sign({username, email, userId}, TOKEN_SECRET, {expiresIn: '172800s'});
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, TOKEN_SECRET, (err, payload) => {
        console.log(err)

        if (err) return res.sendStatus(403)
        req.user = payload

        next()
    })
}

function exclude(user, ...keys) {
    for (let key of keys) {
        delete user[key]
    }
    return user
}


async function persistToDb() {
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
                                return `<h3 style="display: inline">${article.title}</h3>: <h5>${article.price} TND</h5> <img style="width: 280px;border-radius: 5px;height: 200px;" src="${article.thumbnail}" alt=""/><a style="display: block; width: 115px; height: 25px; background: #ffae90; padding: 10px; text-align: center; border-radius: 5px; color: black; font-weight: bold; line-height: 25px;" href="${article.sourceUrl}">take a look </a>`
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

app.delete('/api/search/:id', async (req, res) => {
    try {
        const {id} = req.params
        const search = await prisma.search.delete({
            where: {
                id: parseInt(id)
            }
        })
        return res.send(search)
    } catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
})

app.get('/api/getCategoryDisplayNames', authenticateToken, async (req, res) => {
    const category = await prisma.category.findMany()
    return res.send(category)
})

app.get('/api/getSource', authenticateToken, async (req, res) => {
    const source = await prisma.source.findMany()
    return res.send(source)
})

app.get('/api/users/:id', authenticateToken, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
        })
        const userWithoutPassword = exclude(user, 'password')
        return res.json(userWithoutPassword)
    } catch (e) {
    }
})

// cron job to run every 10 minutes
cron.schedule("*/10 * * * *", async function () {
    try {
        await persistToDb()
    } catch (e) {
        console.log(e)
    }
    console.log("running a task every 10 minutes")
});

app.get('/api/article/:id', async function (req, res) {
    const {id} = req.params
    const search = await prisma.search.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (search.minPrice === null && search.maxPrice === null) {
        const searches = await prisma.article.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search.query
                        },
                    }, {
                        title: {
                            contains: search.query
                        },
                        price: {
                            equals: 0,
                        }
                    },
                ]
            }
        })
        searches.sort((a, b) => {
            return a.timestamp + b.timestamp
        })
        return res.status(200).send(searches)
    }
    if (search.minPrice === null) {
        const searches = await prisma.article.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search.query
                        },
                        price: {
                            lte: parseFloat(search.maxPrice),
                        }
                    }, {
                        title: {
                            contains: search.query
                        },
                        price: {
                            equals: 0,
                        }
                    },
                ]
            }
        })
        searches.sort((a, b) => {
            return a.timestamp + b.timestamp
        })
        return res.status(200).send(searches)
    }
    if (search.maxPrice === null) {
        const searches = await prisma.article.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search.query
                        },
                        price: {
                            gte: parseFloat(search.minPrice),

                        }
                    }, {
                        title: {
                            contains: search.query
                        },
                        price: {
                            equals: 0,
                        }
                    },
                ]
            }
        })
        searches.sort((a, b) => {
            return a.timestamp + b.timestamp
        })
        return res.status(200).send(searches)
    } else {
        const searches = await prisma.article.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search.query
                        },
                        price: {
                            gte: parseFloat(search.minPrice),
                            lte: parseFloat(search.maxPrice),
                        }
                    }, {
                        title: {
                            contains: search.query
                        },
                        price: {
                            equals: 0,
                        }
                    },
                ]
            }
        })
        searches.sort((a, b) => {
            return a.timestamp + b.timestamp
        })
        return res.status(200).send(searches)
    }
});


app.get('/api/data', authenticateToken, async function (req, res) {
    const userId = req.user.userId
    const searches = await prisma.search.findMany({
        where: {
            userId: userId
        },
    })
    return res.status(200).send(searches)
});

app.get('/api/getAppData', authenticateToken, (async (req, res) => {
    const response = await axios.get('https://cdn.9annas.tn/data/appdata.json?v=3');
    let data = response.data
    let decodedAppData = decode(data, 4)
    let crawlerAdUrls = decode(decodedAppData.cau, 3)
    return res.json({
        crawlerAdUrls: crawlerAdUrls
    })
}))

app.get('/api/getMoreImages/:id', authenticateToken, async (req, res) => {
    return res.json(await getImages(req.params.id))
})

app.get('/api/getLocationData', (async (req, res) => {
    const locations = await prisma.location.findMany()
    return res.json(locations)
}))

app.post('/login', async (req, res) => {

    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    let user = {}
    try {
        user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        })
    } catch (e) {
        return res.status(400).send({
            message: 'User not found'
        })
    }

    if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                // handle error
                return res.json({success: false, message: 'Failed to log in'});
            }
            if (result) {
                // Send JWT
                const token = generateAccessToken(user.username, user.email, user.id);
                return res.json({success: true, token: token});
            } else {
                // response is OutgoingMessage object that server response http request
                return res.json({success: false, message: 'Invalid password'});
            }
        })
    } else {
        return res.json({success: false, message: 'User not found'});
    }
})


app.post('/search', authenticateToken, async (req, res) => {
    const query = req.body.searchBar
    const userId = req.user.userId
    let locationId = req.body.selectedLocation?.id
    if (!locationId) {
        locationId = null
    }

    const maxPrice = req.body.maxPrice !== '' ? req.body.maxPrice : null
    const minPrice = req.body.minPrice !== '' ? req.body.minPrice : null
    console.log({query, locationId, maxPrice, minPrice, userId})
    await prisma.search.create({
        data: {
            query: query,
            locationId: locationId,
            minPrice: minPrice,
            maxPrice: maxPrice,
            userId: userId
        },
    })
    return res.sendStatus(200)
})

app.post('/register', async (req, res) => {
    const test1 = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        },
    })
    if (test1) {
        return res.json({
            message: 'Username already exists'
        })
    }
    const test2 = await prisma.user.findUnique({
        where: {
            email: req.body.email,
        },
    })
    if (test2) {
        return res.json({
            message: 'Email already exists'
        })
    }
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return res.json({success: false, message: 'Failed to create user'});
        }

        bcrypt.hash(req.body.password1, salt, async function (err, hash) {
            if (err) {
                return res.json({success: false, message: 'Failed to create user'});
            }
            await prisma.user.create({
                data: {
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                    avatarUrl: req.body.avatar
                },
            })
            return res.json({success: true, message: 'Create user successful'});
        });
    });
})

app.put('/updateUser/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId)
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    })
    if (user) {
        if (req.body.username) {
            user.username = req.body.username
        }
        if (req.body.email) {
            user.email = req.body.email
        }
        if (req.body.password1) {
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    return res.json({success: false, message: 'Failed to update user'});
                }

                bcrypt.hash(req.body.password1, salt, async function (err, hash) {
                    if (err) {
                        return res.json({success: false, message: 'Failed to update user'});
                    }
                    user.password = hash
                });
            });
        }
        if (req.body.avatar) {
            user.avatarUrl = req.body.avatar
        }
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                username: user.username,
                email: user.email,
                password: user.password,
                avatarUrl: user.avatarUrl
            },
        })
        return res.json({success: true, message: 'Update user successful'});
    } else {
        return res.json({success: false, message: 'User not found'});
    }
})
app.listen(3001);
