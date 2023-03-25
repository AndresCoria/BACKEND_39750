class ProductManager {
    constructor() {
        this.path = path
    }
    addProduct = (title, description, price, thumbnail, code, stock) => {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        if(this.products.length === 0){
            product.id = 1
        }else{
            product.id = this.products[this.products.length - 1].id +1
        }
        let newProduct = this.products.find(prod => prod.code === product.code)
        if (newProduct) return console.log('Un producto con ese code ya fue ongresado')

        if (Object.values(product).every(value => value)) {
            this.products.push(product);
        } else {
            console.log("Todos los campos son obligatorios");
        }
    }
    getProducts = () => {
        return this.products
    }
    getProductById = ( id ) => {
        const obj = this.products.find(product => product.id === id);
        return obj ? obj : console.log('No products found');
    }
}

const aplicacion = new ProductManager()
aplicacion.addProduct('Cs 1.6','Servidor de calidad media cs 1.6', 500, 'thumnbail', 001, 15);
aplicacion.addProduct('Cs 1.6', 'Servidor de calidad alta cs 1.6', 1000, 'thumbnail', 002, 10);
// aplicacion.addProduct('Cs Go', 'Servidor de CSGO medio', 850, 'thumnail', 15);
// aplicacion.addProduct('Cs Go', 'Servidor de CSGO alto', 950, 'thumnail', 15);
// aplicacion.addProduct('Cs Go', 'Servidor de CSGO bajo', 750, 'thumnail', 15);
// console.log('Muestra solo el producto con id: 2 ', aplicacion.getProductById(2))
console.log('Muestra todos los productos agregados ', aplicacion.getProducts())
