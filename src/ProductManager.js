const {promises} = require("fs")
const fsP = promises

class ProductManager {

constructor() {
    this.products = []
    this.path = "DB.json"
}

// Agrega productos al JSON
async addProduct(product) {
    try {
    const productsFile = await fsP.readFile(this.path, "utf-8")
    let products = JSON.parse(productsFile)

    //valida que esten los campos
    const { title, description, price, thumbnail, code, status, stock } = product;
    if(!title || !description || !price || !thumbnail || !code || !status || !stock) {
        throw new Error("Every fields are requested");
    }

    //asigna un id autoincremental
    products.push({id: this.products.length + 1, ...product})

    //escribe los datos en el archivo
    fsP.writeFile(this.path, JSON.stringify(products, null, 2))
    return product;
    } catch (err) {
        throw new Error(err)
    }
}

// Método que elimina un producto con el ID desde el JSON
async deleteProduct(pid) {
    try {
    const data = await fsP.readFile(this.path,"utf-8")
    const products = JSON.parse(data)
    const index = products.findIndex(product => product.id === pid)
    if(index !== -1) {
        products.splice(index, 1)
    } else {
        throw new Error(`Product with id ${pid} not found`)
    }
    fsP.writeFile(this.path, JSON.stringify(products, null, 2),"utf-8")
    return console.log(`Product with id ${pid} has been deleted correctly`)
    } catch(err) {
        throw new Error(err)
    }
}

// Traer productos desde el JSON
getProducts = async(limit)=> {
    try {
    let data = await fsP.readFile(this.path,"utf-8")
    const parseData = JSON.parse(data)            
    return parseData
    } catch (error) {
        return []
    }
}
// Actualizar/modificar productos
async updateProduct (pid, newProduct) {
    try {
    const data = await fsP.readFile(this.path, "utf-8")
    const products = JSON.parse(data)
    const index = products.findIndex(product => product.id === pid)
    if (index !== -1) {
        newProduct.id = pid
        products[index] = newProduct
    } else {
        console.log(`Product with id ${pid} not found`)
    }
    return fsP.writeFile(this.path, JSON.stringify(products, null, 2))
    } catch (error){
        return new Error(error)
    }
}

// Trae producto con ID desde JSON
async getProductById(pid) {
    try {
    const contenido = await fsP.readFile(this.path, "utf-8")

    let product = JSON.parse(contenido)
    let productId = product.find(prod => prod.id === pid)
    
    if(!product) return "Product not found" 
    
    return productId
    } catch(err) {
    return new Error(err)
    }
}

}

module.exports = ProductManager;

const productManager = new ProductManager

const product120 = {
    title: "Tan cerca, Tan cerca",
    description: "Cuentos",
    price: 300,
    thumbnail: "public/images/tanC.png",
    code: "TanC123",
    stock: 4,
    status: true
    }
    

productManager.addProduct(product120)
// productManager.deleteProduct(7)