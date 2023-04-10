const {promises} = require ("fs")
const fsP = promises
const fs = require("fs")

const cart = [{id: 1,
products: []}]

const path = "cart.json"

class CartManager {

constructor (path) {
    this.path = path
    this.products = cart
}

async createCart() {
    try {
        await fsP.writeFile(this.path, JSON.stringify(this.products, null, 2), {encoding: "utf-8"})
        // const readCart = await fsP.readFile(this.path, "utf-8")
        // const data = JSON.stringify(readCart)
    
        // return fsP.writeFile(this.path, JSON.stringify(data, null, 2))
        
    }
    catch (err){
        console.log(err)
    }
}

async getProducts(cid) {
    try{    
        const data = await fsP.readFile(this.path, "utf-8")
        const cart = JSON.parse(data)
        const index = cart.find(prod => prod.id == cid)
        if(!index) return console.log("Product not found") 
        else {
            return index
        }
    } 
    catch(err){
        console.log(err)
    }
}

// async addProduct(product) {
//     try {
//     const products = await fsP.readFile(this.path, "utf-8")
//     const cartProducts = JSON.parse(products)

//     //valido que exista el producto
//     if(!product) return console.log("Every fields are request")
//     const index = cartProducts.findIndex(product => product.id === product.id)
//     if(index !== -1){
//         index.quantity + 1
//     } else {
//         console.log(`Product with id ${product.id} not found`)
//     }

//     //asigno id autoincremental
//     cartProducts.push({id: cartProducts.length+1, ...product})
//     return fsP.writeFile(this.path, JSON.stringify(cartProducts, null, 2))
    
//     } catch (err) {
//         console.log(err)
//     }
// }

}

module.exports = CartManager;