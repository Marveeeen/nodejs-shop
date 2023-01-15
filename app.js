const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const PORT = '8080'

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.routes)
app.use(shopRoutes)

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'PAGE NOT FOUND', path: ''})
})

app.listen(PORT, () => console.log('Server running'))