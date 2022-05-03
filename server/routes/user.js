const prisma = require("../utils/prismaClient");
const bcrypt = require('bcrypt');
const {authenticateToken, generateAccessToken} = require('../utils/jwtAuth');
const express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();

router.post('/login', async (req, res) => {

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
    let region;
    if (!locationId) {
        locationId = null
    }
    let LocationName = req.body.selectedLocation?.name
    if (LocationName === undefined) {
        region = ''
    } else {
        region = LocationName.substr(LocationName.indexOf(",") + 1)
    }
    const maxPrice = req.body.maxPrice !== '' ? req.body.maxPrice : null
    const minPrice = req.body.minPrice !== '' ? req.body.minPrice : null
    await prisma.search.create({
        data: {
            query: query,
            locationId: locationId,
            minPrice: minPrice,
            maxPrice: maxPrice,
            userId: userId,
            region: region
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

router.post('/contactUs', async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_HOST,
            pass: process.env.EMAIL_PASSWORD,
        }
    });
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phone = req.body.phone;
    const subject = req.body.subject;
    const message = req.body.message;

    const mailOptions = {
        from: process.env.EMAIL_HOST,
        to: process.env.EMAIL_HOST,
        subject: `${firstName} ${lastName} sent you a message`,
        html: `<h1>subject: ${subject}</h1>
                <h3>${phone === "" ? "" : "phone: " + phone}</h3>
                <h3>email: ${email}</h3>
                <h2>message: </h2>
                <h4>${message}</h4>`
    }
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return res.json({success: false, message: 'Failed to send email'});
        } else {
            console.log('Email sent: ' + info.response);
            return res.json({success: true, message: 'Email sent'});
        }
    });

})


module.exports = router;
