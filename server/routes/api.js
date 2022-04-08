const prisma = require("../utils/prismaClient");
const axios = require("axios");
const {decode, getImages} = require("../utils/scrapeTools");
const bcrypt = require('bcrypt');
const {authenticateToken, generateAccessToken} = require('../utils/jwtAuth');
const express = require('express');
const router = express.Router();

function exclude(user, ...keys) {
    for (let key of keys) {
        delete user[key]
    }
    return user
}

router.delete('/search/:id', async (req, res) => {
    try {
        const {id} = req.params
        const search = await prisma.search.delete({
            where: {
                id: parseInt(id)
            }
        })
        return res.send(search)
    } catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
})

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

router.get('/article/:id', async (req, res) => {
    const {id} = req.params
    const search = await prisma.search.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (search.minPrice === null && search.maxPrice === null) {
        const searches = await prisma.article.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search.query
                        },
                    }, {
                        title: {
                            contains: search.query
                        },
                        price: {
                            equals: 0,
                        }
                    },
                ]
            }
        })
        searches.sort((a, b) => {
            return a.timestamp + b.timestamp
        })
        return res.status(200).send(searches)
    }
    if (search.minPrice === null) {
        const searches = await prisma.article.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search.query
                        },
                        price: {
                            lte: parseFloat(search.maxPrice),
                        }
                    }, {
                        title: {
                            contains: search.query
                        },
                        price: {
                            equals: 0,
                        }
                    },
                ]
            }
        })
        searches.sort((a, b) => {
            return a.timestamp + b.timestamp
        })
        return res.status(200).send(searches)
    }
    if (search.maxPrice === null) {
        const searches = await prisma.article.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search.query
                        },
                        price: {
                            gte: parseFloat(search.minPrice),

                        }
                    }, {
                        title: {
                            contains: search.query
                        },
                        price: {
                            equals: 0,
                        }
                    },
                ]
            }
        })
        searches.sort((a, b) => {
            return a.timestamp + b.timestamp
        })
        return res.status(200).send(searches)
    } else {
        const searches = await prisma.article.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search.query
                        },
                        price: {
                            gte: parseFloat(search.minPrice),
                            lte: parseFloat(search.maxPrice),
                        }
                    }, {
                        title: {
                            contains: search.query
                        },
                        price: {
                            equals: 0,
                        }
                    },
                ]
            }
        })
        searches.sort((a, b) => {
            return a.timestamp + b.timestamp
        })
        return res.status(200).send(searches)
    }
});

router.get('/data', authenticateToken, async (req, res) => {
    const userId = req.user.userId
    const searches = await prisma.search.findMany({
        where: {
            userId: userId
        },
    })
    return res.status(200).send(searches)
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

router.put('/updateUser/:userId', authenticateToken, async (req, res) => {
    const userId = parseInt(req.params.userId)
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    })
    if (user) {
        if (req.body.username) {
            user.username = req.body.username
        }
        if (req.body.email) {
            user.email = req.body.email
        }
        if (req.body.password1) {
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    return res.json({success: false, message: 'Failed to update user'});
                }

                bcrypt.hash(req.body.password1, salt, async function (err, hash) {
                    if (err) {
                        return res.json({success: false, message: 'Failed to update user'});
                    }
                    user.password = hash
                });
            });
        }
        if (req.body.avatar) {
            user.avatarUrl = req.body.avatar
        }
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                username: user.username,
                email: user.email,
                password: user.password,
                avatarUrl: user.avatarUrl
            },
        })
        const token = generateAccessToken(user.username, user.email, user.id);
        return res.json({success: true, token: token, message: 'Update user successful'});
    } else {
        return res.json({success: false, message: 'User not found'});
    }
})

module.exports = router;
