const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.path = path
    }

    writeFile = async data => {
        try {
            await fs.promises.writeFile(
                this.path, JSON.stringify(data, null, 2)
                )
            }catch(err) {
            console.log(err);
            }
        }

    getProducts = async() => {
        try {
            const productsList = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(productsList)
            // if(products.length === 0) return []
            return products
        }catch(error) {
            if(error.message.includes('ENOENT: no such file or directory')) return []
            console.log(`este error ${error}`);
            }
    }

    addProduct = async product => {
        try {
            let products = await this.getProducts()
            let newId
            let newCode = products.find(prod => prod.code === product.code)
            //Chequeo no se repitan las id
            products.length === 0 ? newId = 1 : newId = products[products.length - 1 ].id + 1
            //Chequeo que todos los campos esten completos
            if(!Object.values(product).every(value => value)){
                return console.log('All fields are required')
            }
            //Chequeo que el campo "code" no se repita
            if (newCode) return console.log('a product has already been entered with that code');
            const newProduct = {...product, id: newId}
            products.push(newProduct)
            await this.writeFile(products)
            return this.getProducts()
        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async (id, data) => {
        try {
            const productos = await this.getProducts()
            Object.assign(productos[id-1], data)
            await this.writeFile(productos)
        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async id => {
        try {
            let products = await this.getProducts()
            const product = products.find(prod => prod.id === id)
            return product
        } catch (error) {
            console.log(error);
        }
    }

    deleteById = async id => {
        try {
            let products = await this.getProducts()
            const obj = products.filter(obj => obj.id !== id);
            await this.writeFile(obj);
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = ProductManager;