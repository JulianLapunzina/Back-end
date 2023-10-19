// Desafío N°1 - Julián Lapunzina CoderHouse


const product = {
    title: 'Harry Potter y el Cáliz de fuego',
    price: 1000,
    code: 'HP-0004',
    stock: 12,
    description: 'Obra de la escritora británica J. K. Rowling y el cuarto libro de la serie literaria Harry Potter',
    thumbnail: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT0PyHvUeEZjG3PeVsGH_usVy52_J9TZ4-IIkWKUZdSIdAoioL3'
}
const product1 = {
    title: 'El señor de los Anillos: El retorno del Rey',
    price: 1200,
    code: 'SdA-0003',
    stock: 120,
    description: 'Tercera parte de la novela El Señor de los Anillos, del escritor británico J. R. R. Tolkien.',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCSHXJkh8B7et4l1_sCx5cn5OYKTWevSgzFBakNGzK8hcNO0GR'
}

// Dejo esta copia por si quiere probar el throw new Error de la clase ProductManager

// const product1copy = {
//     title: 'El señor de los Anillos: El retorno del Rey',
//     price: 1200,
//     code: 'SdA-0003',
//     stock: 120,
//     description: 'Tercera parte de la novela El Señor de los Anillos, del escritor británico J. R. R. Tolkien.',
//     thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCSHXJkh8B7et4l1_sCx5cn5OYKTWevSgzFBakNGzK8hcNO0GR'
// }

class ProductManager {
    constructor() {
        this.products = []
    }
    addProduct(product) {
        if(!product.title ||
            !product.price ||
            !product.code || 
            !product.stock ||
            !product.description ||
            !product.thumbnail) {
            throw new Error('Every fields are requested')
            }
        else {
            let codes = this.products.map(product => product.code)
            if(codes.includes(product.code)) {
                throw new Error('Product already exists')
            } else {
                this.products.push({id: this.products.length + 1, ...product})
            }
        }
    }
    getProducts() {
        return this.products
    }
    getProductById(id) {
        let ids = this.products.map(product => product.id)
        if(!ids.includes(id)) {
            throw new Error('Product not found')
        }
        else {
            return this.products.find(product => product.id === id)
        }
    }
}

// Instancia del obj ProductManager
const productManager = new ProductManager

// Agrego los prods
productManager.addProduct(product)
productManager.addProduct(product1)
// productManager.addProduct(product1copy) ---> Descomentar para probar 

// Obtengo todos los prods
productManager.getProducts()

// Obtengo un prod por id
console.log(productManager.getProductById(1))
console.log(productManager.getProductById(2))
// console.log(productManager.getProductById(3)) ---> Descomentar para probar
