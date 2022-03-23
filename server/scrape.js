const functions = require('./functions')
// const locations = require('../client/utils/locations.js')
const axios = require('axios')

async function getLocations() {
    const res = await axios.get(`http://localhost:3001/api/getLocationData`)
    return res.data
}

let params = functions.params
let getOffset = functions.getOffset
let search = functions.search
let searchMore = functions.searchMore
let getImages = functions.getImages
let decode = functions.decode
let getData = functions.getData

async function scrape(query, locationId, maxPrice, minPrice) {
    const locations = await getLocations()
    const dataConfig = params(query, locationId, locations, minPrice, maxPrice)
    const firstResult = await search(dataConfig.data, dataConfig.config)

    const pages = firstResult.pages
    const hits = firstResult.hits;
    const results = firstResult.results;


    const appData = await getData()
// console.log("appData: ", appData)
    const decodedAppData = decode(appData, 4)

    //console.log("Source: ", decode(decodedAppData.src, 1))
    // console.log("categoryDisplayNames: ", decode(decodedAppData.cat, 2))
    const crawlerAdUrls = decode(decodedAppData.cau, 3)
    // console.log(crawlerAdUrls);

    console.log("hits: " + hits);

    for (let i = 0; i < pages; i++) {
        console.log(`page: ${i}`)
        const lastItem = results[results.length - 1];

        const searchMoreData = await searchMore(getOffset(lastItem.id, lastItem.timestamp), query, locationId, locations, minPrice, maxPrice)
        for (let item of searchMoreData) {
            item = {
                ...item,
                sourceUrl: crawlerAdUrls[item.crawlerId].replace(/{id}/g, item.externalId),
                //images: await getImages(item.id)
            }
            results.push(item)
        }
    }


    return (results.sort((a, b) => a.timestamp + b.timestamp))
}

module.exports = scrape


