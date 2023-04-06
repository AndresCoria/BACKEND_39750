const express = require('express')
const routers = require('./routers/index.router')

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static( __dirname + '/public'))

    app.use("/api", routers)

const server = app.listen(PORT, () => {
    console.log(`Listening app port ${server.address().port}`)
});

server.on('error', (error) => {
    console.log('Error', error)
});









