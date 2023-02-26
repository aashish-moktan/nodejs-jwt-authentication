const JWT = require('jsonwebtoken')
const whiteListRoutes = ['/auth/login', '/auth/verifyToken', '/auth/generateToken']

const authMiddleware = (req, res, next) => {
    if(whiteListRoutes.includes(req.path)) {
        next()
    } else {
        let token = req.headers['authorization'] || req.headers['x-access-token'];
        if(!token) {
            res.status(401).send({ message: 'Invalid request' })
        }

        // check for bearer token
        if(token.slice(0,3) === "Bea") {
            token =  token.split(" ")[1]
        }

        // verify token
        const user = JWT.verify(token, 'access-token')
        req.email = user.email
        req.name = user.name

        next()
    }
}

module.exports = authMiddleware