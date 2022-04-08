const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET;

function generateAccessToken(username, email, userId) {
    return jwt.sign({username, email, userId}, TOKEN_SECRET, {expiresIn: '172800s'});
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, TOKEN_SECRET, (err, payload) => {
        if (err) {
            console.log(err)
        }

        if (err) return res.sendStatus(403)
        req.user = payload

        next()
    })
}

module.exports = {
    generateAccessToken,
    authenticateToken
}
