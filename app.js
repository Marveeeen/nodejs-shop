const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const PORT = '8080'

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => console.log('Server running'))