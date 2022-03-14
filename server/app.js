const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors")
const scrape = require("./scrape.js");
const axios = require("axios");
const functions = require('./functions')
const locations = require('../client/utils/locations')
let nameToIndex = functions.nameToIndex

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/data', async function (req, res) {
    const params = global.queryParams
    const data = await scrape(params.query,params.locationId, params.maxPrice, params.minPrice)
    return res.status(200).send(data)
});

app.get('/api/getAppData', (async (req, res) => {
    const response = await axios.get('https://cdn.9annas.tn/data/appdata.json?v=3');
    return res.status(200).send(response.data)
}))
app.listen(3001);

app.post('/auth/login', async (req, res) => {
    console.log(req.body.email, req.body.password)
})

app.post('/Search', async (req, res) => {
    res.redirect('http://localhost:3000');
    const query = req.body.searchBar
    const locationId = locations[nameToIndex(req.body.combo)].id
    const maxPrice = req.body.maxPrice
    const minPrice = req.body.minPrice
    console.log(query, locationId, maxPrice, minPrice)
    global.queryParams = {query,locationId,maxPrice,minPrice}

}
)



