class ProductManager {
    constructor() {
        this.products = []
    }
    addProducts = (title, description, price, thumbnail, stock) => {
        const product = {
            title,
            description,
            price,
            thumbnail,
            stock
        }
        if(this.products.length === 0){
            product.id = 1
        }else{
            product.id = this.products[this.products.length - 1].id +1
        }
        if (Object.values(product).every(value => value)) {
            this.products.push(product);
        } else {
            console.log("Todos los campos son obligatorios");
        }
    }
    getProducts = () => {
        return this.products
    }
    getProductsById = ( id ) => {
        const obj = this.products.find(product => product.id === id);
        return obj ? obj : console.log('No products found');
    }
}

const aplicacion = new ProductManager()
aplicacion.addProducts('Cs 1.6','Servidor de calidad media cs 1.6', 500, 'thumnbail', 15);
aplicacion.addProducts('Cs 1.6', 'Servidor de calidad alta cs 1.6', 1000, 'thumbnail', 10);
aplicacion.addProducts('Cs Go', 'Servidor de CSGO medio', 850, 'thumnail', 15);
aplicacion.addProducts('Cs Go', 'Servidor de CSGO alto', 950, 'thumnail', 15);
aplicacion.addProducts('Cs Go', 'Servidor de CSGO bajo', 750, 'thumnail', 15);
console.log('Muestra solo el producto con id: 2 ', aplicacion.getProductsById(2))
console.log('Muestra todos los productos agregados ', aplicacion.getProducts())
