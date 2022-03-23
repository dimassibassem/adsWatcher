const functions = require('./functions')
// const locations = require('../client/utils/locations.js')
const axios = require('axios')
const prisma = require('./prismaClient')

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

async function addToDatabase(item, crawlerAdUrls) {
    const existingArticle = await prisma.article.findUnique({
        where: {
            articleId: item.id
        }
    })
    if (existingArticle) {
        return false
    } else {
        await prisma.article.create({
            data: {
                articleId: item.id,
                title: (item.title === null) ? "No title" : item.title,
                description: item.description,
                price: item.price,
                categoryId: item.categoryId,
                location: item.location,
                timestamp: item.timestamp,
                thumbnail: item.thumbnail,
                externalId: item.externalId,
                sourceId: item.sourceId,
                crawlerId: item.crawlerId,
                sourceUrl: crawlerAdUrls[item.crawlerId].replace(/{id}/g, item.externalId),
            }
        })
        return true
    }
}

async function scrape(query, locationId, maxPrice, minPrice) {
    const breakThreshold = 100
    let countToThreshold = 0

    const locations = await getLocations()
    const dataConfig = params(query, locationId, locations, minPrice, maxPrice)
    const firstResult = await search(dataConfig.data, dataConfig.config)

    const appData = await getData();
    const decodedAppData = decode(appData, 4)
    const crawlerAdUrlsArray = decode(decodedAppData.cau, 3)

    const pages = firstResult.pages
    const hits = firstResult.hits;
    const results = firstResult.results;


    const newArticles = []

    console.log("query: ", query);
    console.log("hits: " + hits);

    // ! FIRST PAGE
    for (let i = 0; i < results.length; i++) {
        let item = results[i];
        item = {
            ...item,
            sourceUrl: crawlerAdUrlsArray[item.crawlerId].replace(/{id}/g, item.externalId),
        }

        const added = await addToDatabase(item, crawlerAdUrlsArray)
        if (added) {
            console.log("Added to database")
            newArticles.push(item)
            countToThreshold = 0
        }
        if (!added) {
            console.log("Article already exists in database")
            countToThreshold++
        }
    }

    let lastItem = results[results.length - 1]

    // ! REST OF PAGES
    for (let i = 0; i < pages; i++) {
        console.log(`page: ${i}`)

        if (countToThreshold > breakThreshold) {
            break
        }

        const searchMoreData = await searchMore(getOffset(lastItem.id, lastItem.timestamp), query, locationId, locations, minPrice, maxPrice)
        for (let item of searchMoreData) {
            item = {
                ...item,
                sourceUrl: crawlerAdUrlsArray[item.crawlerId].replace(/{id}/g, item.externalId),
                //images: await getImages(item.id)
            }

            lastItem = item

            const added = await addToDatabase(item, crawlerAdUrlsArray)
            if (added) {
                console.log("Added to database")
                newArticles.push(item)
                countToThreshold = 0
            }
            if (!added) {
                console.log("Article already exists in database");
                countToThreshold++
            }
        }
    }

    console.log("Done scraping")
    console.log(newArticles);
}

module.exports = scrape


