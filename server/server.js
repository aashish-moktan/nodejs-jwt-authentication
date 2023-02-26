const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const authMiddleware = require('./src/middleware/authMiddleware')
const AuthRoutes = require('./src/routes/auth.routes')
const ViewRoutes = require('./src/routes/view.routes')

const APP_PORT = 8000

const app = express()

// setting up view engine
app.use(express.static(path.join(__dirname, 'src/views')))
app.set('views', './src/views')
app.set('view engine', 'ejs')

// setting up middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(authMiddleware)

// setting up routes
app.use('/auth', AuthRoutes)

app.get('/', (req, res, next) => {
    res.render('pages/login')
})


// setting up global error handler
app.use((error, req, res, next) => {
    res.status(400).send(error)
}); 
 
app.listen(APP_PORT, () => {
    console.log(`Server is running at port ${APP_PORT} ...`)
})
