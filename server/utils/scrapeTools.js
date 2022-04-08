const locations = require('../../client/utils/locations.js');
const axios = require('axios')

const locationIndex = (locationId) => {
    return locations.findIndex(element => {
        if (element.id === locationId) {
            return true;
        }
    });
}

const nameToIndex = (locationName) => {
    return locations.findIndex(element => {
        if (element.name === locationName) {
            return true;
        }
    });
}

function numToLetters(e) {
    let t = "";
    for (const n of e.toString())
        t += String.fromCharCode(98 + parseInt(n, 10));
    return t
}

function getOffset(id, timestamp) {
    return numToLetters(id + 99).toUpperCase() + "A" + numToLetters(timestamp - 1420070400).toUpperCase()
}

async function search(data, config) {
    const results = [];
    const response = await axios(config);
    for (const ad of response.data.ads) {
        results.push(ad)
    }


    const hits = response.data.hits
    let pages;
    if (hits % 20 === 0) {
        pages = Math.floor(hits / 20) - 1
    } else {
        pages = Math.floor(hits / 20)
    }

    return {
        hits: hits,
        pages: pages,
        results: results,
    }
}

async function getData() {
    try {
        const res = await axios.get('https://cdn.9annas.tn/data/appdata.json?v=3');
        if (res.status === 200) {
            return res.data
        } else {
            return null
        }
    } catch (e) {
        // repeat if failed
        return getData()
    }
}


async function getImages(id) {
    const url = `https://api.9annas.tn/images/?ad=${id}`;
    const res = await axios.get(url);
    return res.data
}

function params(query, locationId, locations, minPrice, maxPrice) {
    const data = JSON.stringify({
        "query": query,
        "location": {
            "id": (locationId === null) ? null : locationId,
            "name": (locationId === null) ? "" : locations[locationIndex(locationId)].name,
            "radius": 10
        },
        "filter": {
            "categoryId": null,
            "priceMin": (minPrice === null) ? null : minPrice,
            "priceMax": (maxPrice === null) ? null : maxPrice,
            "onlyWithPrice": false
        },
        "isUserSearch": true,
        "isFilterSearch": (locationId !== null) || (minPrice !== null) || (maxPrice !== null)
    });


    const config = {
        method: 'post',
        url: 'https://api.9annas.tn/search',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    if (locationId != null) {
        console.log("id: " + locations[locationIndex(locationId)].id + " is for " + locations[locationIndex(locationId)].name)
    }
    return {
        data: data,
        config: config,
    }
}


async function searchMore(offset, query, locationId, locations, minPrice, maxPrice) {

    const data = JSON.stringify({
        "searchQuery": {
            "query": query,
            "location": {
                "id": (locationId === null) ? null : locationId,
                "name": (locationId === null) ? "" : locations[locationIndex(locationId)].name,
                "radius": 10
            },
            "filter": {
                "categoryId": null,
                "priceMin": (minPrice === null) ? null : minPrice,
                "priceMax": (maxPrice === null) ? null : maxPrice,
                "onlyWithPrice": false
            },
            "isUserSearch": true,
            "isFilterSearch": (locationId !== null) || (minPrice !== null) || (maxPrice !== null)
        },
        "offset": offset
    });


    let config = {
        method: 'post',
        url: 'https://api.9annas.tn/searchmore',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    const response = await axios(config)

    return response.data

}

function decode(e, t) {
    return e = e.substr(0, t) + String.fromCharCode(e.charCodeAt(t) - t) + e.substr(t + 1),
        JSON.parse(atob(e))
}

module.exports = {
    decode, searchMore, search, getImages, getOffset, getData, params, nameToIndex
}
