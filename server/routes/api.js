const prisma = require("../utils/prismaClient");
const axios = require("axios");
const {decode, getImages} = require("../utils/scrapeTools");
const {authenticateToken} = require('../utils/jwtAuth');
const express = require('express');
const {
    getArticlesNoMinMaxPrice, getArticlesNoMinPrice, getArticlesNoMaxPrice, getArticlesAllFilterPrice,
    getFavArticlesNoMinPrice, getFavArticlesNoMaxPrice, getFavArticlesAllFilterPrice, getFavArticlesNoMinMaxPrice
} = require("../utils/articleService");
const router = express.Router();

function exclude(user, ...keys) {
    for (let key of keys) {
        delete user[key]
    }
    return user
}


router.get('/getCategoryDisplayNames', authenticateToken, async (req, res) => {
    const category = await prisma.category.findMany()
    return res.send(category)
})

router.get('/getSource', authenticateToken, async (req, res) => {
    const source = await prisma.source.findMany()
    return res.send(source)
})

router.get('/users/:id', authenticateToken, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
        })
        const userWithoutPassword = exclude(user, 'password')
        return res.json(userWithoutPassword)
    } catch (e) {
    }
})

router.get('/article/:searchId', authenticateToken, async (req, res) => {
    const {searchId} = req.params
    const page = parseInt(req.query.page) || 1
    const search = await prisma.search.findUnique({
        where: {
            id: parseInt(searchId)
        }
    })

    if (!search) {
        return res.status(404).send({
            error: 'Search not found'
        })
    }


    if (search.minPrice === null && search.maxPrice === null) {
        let {articles, articlesCount} = await getArticlesNoMinMaxPrice(search, page)
        const user = req.user

        // convert articles to display format
        articles = articles.map(article => {
            article.favorite = article.favorite.some(favorite => favorite.id === user.userId)
            return article
        })

        articles.sort((a, b) => {
            return a.timestamp + b.timestamp
        })
        const pages = Math.ceil(articlesCount / 36)
        console.log(pages);
        return res.status(200).send({articles, pages})
    }
    if (search.minPrice === null) {
        let {articles, articlesCount} = await getArticlesNoMinPrice(search, page)
        const user = req.user
        console.log(user)

        // convert articles to display format
        articles = articles.map(article => {
            article.favorite = article.favorite.some(favorite => favorite.id === user.userId)
            return article
        })

        articles.sort((a, b) => {
            return a.timestamp + b.timestamp
        })
        const pages = Math.ceil(articlesCount / 36)
        console.log(pages);
        return res.status(200).send({articles, pages})
    }
    if (search.maxPrice === null) {
        const {articles, articlesCount} = await getArticlesNoMaxPrice(search, page)

        articles.sort((a, b) => {
            return a.timestamp + b.timestamp
        })
        const pages = Math.ceil(articlesCount / 36)
        console.log(pages);
        return res.status(200).send({articles, pages})
    } else {
        const {articles, articlesCount} = await getArticlesAllFilterPrice(search, page)
        articles.sort((a, b) => {
            return a.timestamp + b.timestamp
        })
        const pages = Math.ceil(articlesCount / 36)
        return res.status(200).send({articles, pages})
    }
});

router.get('/data', authenticateToken, async (req, res) => {
    const userId = req.user.userId
    const articles = await prisma.search.findMany({
        where: {
            userId: userId
        },
    })
    return res.status(200).send(articles)
});

router.get('/getAppData', authenticateToken, async (req, res) => {
    const response = await axios.get('https://cdn.9annas.tn/data/appdata.json?v=3');
    let data = response.data
    let decodedAppData = decode(data, 4)
    let crawlerAdUrls = decode(decodedAppData.cau, 3)
    return res.json({
        crawlerAdUrls: crawlerAdUrls
    })
})

router.get('/getMoreImages/:id', authenticateToken, async (req, res) => {
    return res.json(await getImages(req.params.id))
})

router.get('/getLocationData', async (req, res) => {
    const locations = await prisma.location.findMany()
    return res.json(locations)
})

// Update an article by id to favorite or not
router.get('/favorite/:articleId', authenticateToken, async (req, res) => {
    const {articleId} = req.params
    try {
        let article = await prisma.article.findUnique({
            include: {
                favorite: true
            },
            where: {
                id: parseInt(articleId)
            }
        })

        // If it's already favorited, remove it
        if (article.favorite.some(favorite => favorite.id === req.user.userId)) {
            // make the article not favorite
            const favs = article.favorite.filter(favorite => favorite.id !== req.user.userId)
            await prisma.article.update({
                where: {
                    id: parseInt(articleId)
                },
                data: {
                    favorite: {
                        set: favs
                    }
                }
            })
        } else {
            // make the article favorite
            await prisma.article.update({
                where: {
                    id: parseInt(articleId)
                },
                data: {
                    favorite: {
                        connect: {
                            id: req.user.userId
                        }
                    }
                }
            })
        }

        article.favorite = !article.favorite.some(favorite => favorite.id === req.user.userId)

        return res.status(200).send(article)
    } catch (e) {
        console.log(e);
    }
})

router.get('/fav_articles/:searchId', authenticateToken, async (req, res) => {
    const {searchId} = req.params
    const page = parseInt(req.query.page) || 1
    const user = req.user
    try {
        const search = await prisma.search.findUnique({
            where: {
                id: parseInt(searchId)
            }
        })

        if (!search) {
            return res.status(404).send({
                error: 'Search not found'
            })
        }


        if (search.minPrice === null && search.maxPrice === null) {
            let {articles, articlesCount} = await getFavArticlesNoMinMaxPrice(search, page, user)

            // convert articles to display format
            articles = articles.map(article => {
                article.favorite = article.favorite.some(favorite => favorite.id === user.userId)
                return article
            })

            articles.sort((a, b) => {
                return a.timestamp + b.timestamp
            })
            const pages = Math.ceil(articlesCount / 36)
            return res.status(200).send({articles, pages})
        }
        if (search.minPrice === null) {
            let {articles, articlesCount} = await getFavArticlesNoMinPrice(search, page, user)

            // convert articles to display format
            articles = articles.map(article => {
                article.favorite = article.favorite.some(favorite => favorite.id === user.userId)
                return article
            })

            articles.sort((a, b) => {
                return a.timestamp + b.timestamp
            })
            const pages = Math.ceil(articlesCount / 36)
            return res.status(200).send({articles, pages})
        }
        if (search.maxPrice === null) {
            const {articles, articlesCount} = await getFavArticlesNoMaxPrice(search, page, user)

            articles.sort((a, b) => {
                return a.timestamp + b.timestamp
            })
            const pages = Math.ceil(articlesCount / 36)
            return res.status(200).send({articles, pages})
        } else {
            const {articles, articlesCount} = await getFavArticlesAllFilterPrice(search, page, user)
            articles.sort((a, b) => {
                return a.timestamp + b.timestamp
            })
            const pages = Math.ceil(articlesCount / 36)
            return res.status(200).send({articles, pages})
        }
    } catch (e) {
        console.log(e);
    }
})

router.get('/verifyImage/:id', async (req, res) => {
    const {id} = req.params
    try {
        const article = await prisma.article.findFirst({
            where: {
                articleId: parseInt(id)
            }
        })
        await axios.get(article.thumbnail)
        return res.json({
            message: 'Image verified'
        })
    } catch (e) {
        return res.json({
            message: 'Image Not Found'
        })
    }
})

router.get('/getArticle', async (req, res) => {
    const page = req.query.page || 1
    const articles = await prisma.article.findMany({
        skip: (page - 1) * 36,
        take: 36,
        orderBy: {
            timestamp: 'desc'
        }
    })
    return res.json(articles)
})


module.exports = router;
