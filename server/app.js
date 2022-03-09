const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors")
const scrape = require("./scrape.js");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/data', async function (req, res) {
    const data = await scrape()
    return res.status(200).send(data)
});

app.listen(3001);
