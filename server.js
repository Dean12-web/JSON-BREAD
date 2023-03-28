const express = require('express')
// Node.js body parsing middleware.
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require('body-parser')
const app = express()
const port = 3001
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})