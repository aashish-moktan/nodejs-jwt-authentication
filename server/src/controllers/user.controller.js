const JWT = require('jsonwebtoken')
const dbConnect = require('../database/dbConnectPool')

const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers['authorization'] || req.headers['x-access-token']
        if(!token) {
            res.status(401).send({ message: 'Invalid request' })
        }
        // check for bearer token
        if(token.slice(0,3) === "Bea") {
            token =  token.split(" ")[1]
        }

        const isVerified = JWT.verify(token, "access-token")
        console.log("is verified = ", isVerified)
        if(isVerified) {
            res.status(200).send({
                message: "Token is valid"
            })
        } else {
            res.status(401).send({
                message: "Invalid token"
            })
        }
    } catch (e) {
        res.status(401).send({
            message: e.message
        })
    }
}

const generateToken = async (req, res, next) => {
    try {
        const { token } = req.body
        if(!token) {
            res.status(401).send({ message: 'Invalid request' })
        }
        
        const payload = JWT.verify(token, "access-token")

        if(payload) {
            res.status(200).send({
                success: true,
                token: {
                    accessToken: JWT.sign({ id: payload?.id, name: payload?.name, email: payload?.email }, "access-token", { expiresIn: '1m' })
                }
            })
        } else {
            res.status(401).send({
                message: 'Invalid request'
            })
        }
        
    } catch (e) {
        res.status(401).send({
            message: e.message
        })
    }
}

const login = async (req, res, next) => {  
    const { email, password } = req.body

    const pool = await dbConnect()

    const user = await pool.query(`SELECT id, email, name FROM users WHERE email = $1 AND password = $2`, [email, password])

    if (user?.rows?.length) {
        const payload = {
            id: user.rows[0].id,
            name: user.rows[0].name,
            email: user.rows[0].email
        }

        const accessToken = JWT.sign(payload, "access-token", { expiresIn: '1m' })
        const refreshToken = JWT.sign(payload, "access-token", { expiresIn: '5m' })

        res.status(200).send({
            success: true,
            message: "User logged in successfully",
            token: {
                accessToken,
                refreshToken
            }
        })
    } else {
        res.status(401).send({
            success: false,
            message: 'Invalid email or password'
        })
    }

}


const viewDashboard = async (req, res, next) => {
    // const name = req.name
    // const email = req.email
    // const role = req.role

    // const pool = await dbConnect()

    // const user = await pool.query(`SELECT id, email, name, role FROM users WHERE email = $1 AND password = $2 AND role = $3`, [email, password, role])

    res.render('pages/dashboard')

}

module.exports = {
    login,
    verifyToken,
    generateToken,
    viewDashboard
}