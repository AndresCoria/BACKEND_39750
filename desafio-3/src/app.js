const express = require('express')
const Container = require('./productsManager')

const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }))

const server = app.listen(PORT, () => {
    console.log(`Listening app port ${server.address().port}`)
});

server.on('error', (error) => {
    console.log('Error', error)
});

const products = new Container('./products.json')

app.get("/products", async (req, res) => {
    const productsList = await products.getProducts()
    const limit =  req.query.limit
    if(!limit) return res.send(productsList)
    res.send(productsList.slice(0, limit))
})

app.get("/products/:pid", async (req, res) => {
    const id = parseInt(req.params.pid)
    const product = await products.getProductById(id)
    if(!product) res.send( '<h1 style="color: red">PRODUCT NOT FOUND</h1>')
    res.send(product)
})


