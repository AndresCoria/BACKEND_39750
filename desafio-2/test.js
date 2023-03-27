const ProductManager = require ('./app.js')
const products = new ProductManager ('./products.json')

async function Test() {

  const objeto1 = {
    title: "Cs 1.6",
    description: 'Servidor de calidad media cs 1.6',
    price: 800,
    thumbnail: "url",
    code: 1,
    stock: 15
  }

  const objeto2 = {
    title: "Cs 1.6",
    description: 'Servidor de calidad baja cs 1.6',
    price: 500,
    thumbnail: "url",
    code: 2,
    stock: 14
  }

  const objeto3 = {
    title: "Cs 1.6",
    description: 'Servidor de calidad media cs 1.6',
    price: 1000,
    thumbnail: "url",
    code: 3,
    stock: 12
  }

  const objeto4 = {
    title: "Cs 1.6",
    description: 'Servidor de calidad alta cs 1.6',
    price: 1200,
    thumbnail: "url",
    code: 4,
    stock: 15
  }

  const upDateObject = {
    id: 1,
    title: "Cs GO",
    description: 'Servidor de calidad alta Global Ofenssive',
    price: 1800,
    thumbnail: "url",
    code: 4,
    stock: 5
  }

  // await products.addProduct(objeto1).then(data => console.log(data));
  // await products.addProduct(objeto2).then(data => console.log(data));
  // await products.addProduct(objeto3).then(data => console.log(data));
  // await products.addProduct(objeto4).then(data => console.log(data));
  // await products.getProducts().then(data => console.log(data));
  await products.getProductById(5).then(data => console.log(data));
  // await products.updateProduct(1, {
  //   "title": "CS GO",
  //   "description": 'Servidor de calidad alta Global Ofenssive',
  //   "price": 1800,
  //   "thumbnail": "url",
  //   "code": 4,
  //   "stock": 5,
  // })
  // await products.deleteById(4)
}

Test();