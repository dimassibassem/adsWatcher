const prisma = require("../utils/prismaClient");
const bcrypt = require('bcrypt');
const {authenticateToken, generateAccessToken} = require('../utils/jwtAuth');
const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {

    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    let user = {}
    try {
        user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        })
    } catch (e) {
        return res.status(400).send({
            message: 'User not found'
        })
    }

    if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                // handle error
                return res.json({success: false, message: 'Failed to log in'});
            }
            if (result) {
                // Send JWT
                const token = generateAccessToken(user.username, user.email, user.id);
                return res.json({success: true, token: token});
            } else {
                // response is OutgoingMessage object that server response http request
                return res.json({success: false, message: 'Invalid password'});
            }
        })
    } else {
        return res.json({success: false, message: 'User not found'});
    }
})

router.post('/search', authenticateToken, async (req, res) => {
    const query = req.body.searchBar
    const userId = req.user.userId
    let locationId = req.body.selectedLocation?.id
    if (!locationId) {
        locationId = null
    }

    const maxPrice = req.body.maxPrice !== '' ? req.body.maxPrice : null
    const minPrice = req.body.minPrice !== '' ? req.body.minPrice : null
    console.log({query, locationId, maxPrice, minPrice, userId})
    await prisma.search.create({
        data: {
            query: query,
            locationId: locationId,
            minPrice: minPrice,
            maxPrice: maxPrice,
            userId: userId
        },
    })
    return res.sendStatus(200)
})

router.post('/register', async (req, res) => {
    const test1 = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        },
    })
    if (test1) {
        return res.json({
            message: 'Username already exists'
        })
    }
    const test2 = await prisma.user.findUnique({
        where: {
            email: req.body.email,
        },
    })
    if (test2) {
        return res.json({
            message: 'Email already exists'
        })
    }
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return res.json({success: false, message: 'Failed to create user'});
        }

        bcrypt.hash(req.body.password1, salt, async function (err, hash) {
            if (err) {
                return res.json({success: false, message: 'Failed to create user'});
            }
            await prisma.user.create({
                data: {
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                    avatarUrl: req.body.avatar
                },
            })
            return res.json({success: true, message: 'Create user successful'});
        });
    });
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

router.post('/favorite/:id', async (req, res) => {
    const {id} = req.params
    const userId = req.body.userId

    const favoriteExist = await prisma.favorite.findFirst({
        where: {
            articleId: parseInt(id)
        }
    })
    if (favoriteExist) {
        await prisma.favorite.delete({
            where: {
                id: favoriteExist.id
            }
        })
        return res.json({
            message: 'Delete favorite successful'
        })
    } else {
        await prisma.favorite.create({
            data: {
                userId: userId,
                articleId: parseInt(id)
            }
        })
        return res.json({
            message: 'Create favorite successful'
        })
    }
})

module.exports = router;
