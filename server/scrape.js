const functions = require('./functions')
const locations = require('../client/utils/locations.js')

let params=functions.params
let getOffset = functions.getOffset
let search = functions.search
let searchMore = functions.searchMore
let getImages = functions.getImages
let decode = functions.decode
let getData = functions.getData
async function scrape() {
    let query = "iphone 12"
    let locationId = "1734" //null
    let maxPrice = null //2500 // null
    let minPrice = null// 1500 // null

    const dataConfig = params(query, locationId, locations, minPrice, maxPrice)
    const firstResult = await search(dataConfig.data, dataConfig.config)

    const pages = firstResult.pages
    const hits = firstResult.hits;
    const results = firstResult.results;


    const appData = await getData()
// console.log("appData: ", appData)
    const decodedAppData = decode(appData, 4)

    console.log("Source: ", decode(decodedAppData.src, 1))
    console.log("categoryDisplayNames: ", decode(decodedAppData.cat, 2))
    const crawlerAdUrls = decode(decodedAppData.cau, 3)
    console.log(crawlerAdUrls);

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


