const router = require('express').Router()
const AuthController = require("../controllers/user.controller")

router.post('/login', AuthController.login)
router.get('/verifyToken', AuthController.verifyToken)
router.get('/dashboard', AuthController.viewDashboard)
router.post('/generateToken', AuthController.generateToken)

module.exports = router