const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors")
const scrape = require("./scrape.js");
const axios = require("axios");
const functions = require('./functions')
const locations = require('../client/utils/locations')
let nameToIndex = functions.nameToIndex

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/api/data', async function (req, res) {
    const params = global.queryParams
    const data = await scrape(params.query, params.locationId, params.maxPrice, params.minPrice)
    return res.status(200).send(data)
});

app.get('/api/getAppData', (async (req, res) => {
    const response = await axios.get('https://cdn.9annas.tn/data/appdata.json?v=3');
    return res.status(200).send(response.data)
}))
app.listen(3001);

app.post('/login', async (req, res) => {
    res.redirect('http://localhost:3000/Search');
    console.log(req.body)
})

app.post('/Search', async (req, res) => {
    res.redirect('http://localhost:3000');
    const query = req.body.searchBar
    let locationId
    if(req.body.combo === '')
    {
        locationId = null
    }else{
        locationId = locations[nameToIndex(req.body.combo)].id
    }

    const maxPrice = req.body.maxPrice !== '' ? req.body.maxPrice : null
    const minPrice = req.body.minPrice !== '' ? req.body.minPrice : null
    console.log({query, locationId, maxPrice, minPrice})
    await prisma.search.create({
        data: {
            query: query,
            locationId: locationId,
            minPrice: minPrice,
            maxPrice: maxPrice
        },
    })
})
app.post('/Register', async (req, res) => {
    try {
        await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password1,
                avatarUrl: req.body.avatar
            },
        })
    } catch (e) {
        console.log(e)
    }

    res.redirect('http://localhost:3000/Search');
    console.log(req.body)
})



