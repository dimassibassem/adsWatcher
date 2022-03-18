const bcrypt = require('bcrypt');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors")
const scrape = require("./scrape.js");
const axios = require("axios");
const jwt = require('jsonwebtoken');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const dotenv = require('dotenv');
const {decode} = require("./functions");
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

// get config vars
dotenv.config();

// access config var
const TOKEN_SECRET = process.env.TOKEN_SECRET;

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

app.get('/api/users/:id', authenticateToken, async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(req.params.id)
        },
    })
    const userWithoutPassword = exclude(user, 'password')
    return res.json(userWithoutPassword)
})

app.get('/api/data', authenticateToken, async function (req, res) {
    const userId = req.user.userId
    const search = await prisma.search.findFirst({
        where: {
            userId: userId
        }
    })
    const data = await scrape(search.query, search.locationId, search.maxPrice, search.minPrice)
    return res.status(200).send(data)
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

//
// passport.use(new GitHubStrategy({
//         clientID: process.env.GITHUB_CLIENT_ID,
//         clientSecret: process.env.GITHUB_CLIENT_SECRET,
//         callbackURL: "http://localhost:3001/api/auth/callback/github"
//     },
//     async function (accessToken, refreshToken, profile, done) {
//         await prisma.user.upsert({
//             where: {
//                 email: profile.emails[0].value
//             },
//             update: {},
//             create: {
//                 email: profile.emails[0].value,
//                 name: profile.displayName,
//             },
//         },
//         //     function (err, user) {
//         //     return done(err, user);
//         // }
//         )
//         console.log(profile)
//     }
// ));
//
// app.get('/api/auth/github',
//     passport.authenticate('github', {scope: ['user:email']}));
//
// app.get('/api/auth/github/callback',
//     passport.authenticate('github', {failureRedirect: 'http://localhost:3000/Login'}),
//     function (req, res) {
//         // Successful authentication, redirect home.
//         res.redirect('http://localhost:3000');
//     });

app.listen(3001);
