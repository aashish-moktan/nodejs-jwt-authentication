const authRoutes = require('../routes/auth.routes')
const viewRoutes = require('../routes/view.routes')

const applyRoutes = (app) => {
    app.use('/auth', authRoutes)
}

module.exports =  applyRoutes