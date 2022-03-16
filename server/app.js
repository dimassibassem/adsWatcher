const bcrypt = require('bcrypt');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors")
const scrape = require("./scrape.js");
const axios = require("axios");
const functions = require('./functions')
const locations = require('../client/utils/locations')
let nameToIndex = functions.nameToIndex
const jwt = require('jsonwebtoken');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const dotenv = require('dotenv');

// get config vars
dotenv.config();

// access config var
const TOKEN_SECRET = process.env.TOKEN_SECRET;
app.use(cors());

app.use(bodyParser.json());


function generateAccessToken(username) {
    return jwt.sign(username, TOKEN_SECRET, {expiresIn: '172800s'});
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}


app.get('/api/data', async function (req, res) {

    const search = await prisma.search.findFirst({
        where: {
            userId: 11
        }
    })
    const data = await scrape(search.query, search.locationId, search.maxPrice, search.minPrice)
    return res.status(200).send(data)
});

app.get('/api/getAppData', (async (req, res) => {
    const response = await axios.get('https://cdn.9annas.tn/data/appdata.json?v=3');
    return res.status(200).send(response.data)
}))
app.listen(3001);


app.post('/login', async (req, res) => {

    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    })

    bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
            // handle error
            return res.json({success: false, message: 'Failed to log in'});
        }
        if (result) {
            // Send JWT
            const token = generateAccessToken({username: req.body.username});
            return res.json({success: true, token: token});
        } else {
            // response is OutgoingMessage object that server response http request
            return res.json({success: false, message: 'passwords do not match'});
        }
    });
})

app.post('/search', async (req, res) => {
    const query = req.body.searchBar
    const userId = req.body.userId
    console.log(req.body)
    let locationId
    if (req.body.combo === '') {
        locationId = null
    } else {
        locationId = locations[nameToIndex(req.body.combo)].id
    }

    const maxPrice = req.body.maxPrice !== '' ? req.body.maxPrice : null
    const minPrice = req.body.minPrice !== '' ? req.body.minPrice : null
    console.log({query, locationId, maxPrice, minPrice,userId})
    await prisma.search.create({
        data: {
            query: query,
            locationId: locationId,
            minPrice: minPrice,
            maxPrice: maxPrice,
            userId: req.body.userId
        },
    })
    return res.sendStatus(200)
})

app.post('/register', async (req, res) => {
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



