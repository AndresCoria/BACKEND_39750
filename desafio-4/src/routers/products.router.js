const {Router} = require('express')
const ProductManager = require('../controllers/productsManager')

const router = Router()
const productsList = new ProductManager(__filename + '../db/products.json')
const notFound = { error: "Product not found" }

/* ok: 200
   created: 201
   no content: 204
   bad request: 400
   forbidden: 403
   not found: 404
   internal server error: 500
    */

router.get("/", async (req, res) => {
  console.log(productsList);
  const limit = req.query.limit
  const products = await productsList.getProducts()
  console.log(products)
  if (!limit) {
    res.status(200).send({ status:'success', payload: products })
  } else {
    const limitedProducts = products.slice(0, limit)
    res.status(200).send({ status:'success', payload: limitedProducts })
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params
  const product = await productsList.getProductById(parseInt(pid))
  !product ? res.status(404).send(notFound) : res.status(200).send({ status:'success', payload: product })
});

router.post("/", async (req, res) => {
  const product = req.body
  console.log(product);
  const addedProduct = await productsList.addProduct(product);
  !addedProduct
    ? res.status(400).send({ error: "Could not add product" })
    : res.status(201).send({status:'success', payload: product})
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params
  const modification = req.body
  const modifiedProduct = await productsList.updateProduct(
    parseInt(pid),
    modification
  );
  !modifiedProduct
    ? res.status(400).send({ error: `Could not modify product` })
    : res.status(200).send({ status:'success', payload: modifiedProduct });
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const removedProduct = await productsList.deleteById(parseInt(pid))
  !removedProduct
    ? res.status(404).send(notFound)
    : res.status(200).send({ status:'success', message:'product removed' })
});

module.exports = router