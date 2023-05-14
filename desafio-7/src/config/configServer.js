const {connect} = require('mongoose')

const url = "mongodb+srv://andrescoria1984:Martin17b@comision39750.v1faao5.mongodb.net/Ecommerce?retryWrites=true&w=majority"

module.exports = {
  connectDB: ()=>{
    connect(url)
    console.log('Base de datos conectada')
  }
}