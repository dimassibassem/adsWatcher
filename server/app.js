const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors")
const scrape = require("./scrape.js");
const axios = require("axios");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/data', async function (req, res) {
    const data = await scrape()
    return res.status(200).send(data)
});

app.get('/api/getAppData', (async (req, res) => {
    const response = await axios.get('https://cdn.9annas.tn/data/appdata.json?v=3');
    return res.status(200).send(response.data)
}))
app.listen(3001);
