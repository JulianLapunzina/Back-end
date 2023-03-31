// Desafío N° 1 y 2 - Julián Lapunzina
const {promises} = require("fs")
const fsP = promises
const fs = require("fs")


const products = []
const path = "./DB.json"

class ProductManager {
    constructor() {
        this.products = products
        this.path = path
    }

    //Método para agregar productos
    addProduct(product){
    //valida que todos los campos estén completos
    if(!product.title ||
    !product.description ||
    !product.price ||
    !product.thumbnail ||
    !product.code ||
    !product.stock) return console.log("Every fields are request")
    
    // valida el código del producto, si ya existe lo reporta por consola
    let productPushed = this.products.find(prod => prod.code === product.code)
    if(productPushed) return console.log(`This products was already pushed, here's the code:"${product.code}"`)

    //le asigna un id al producto agregado
    return this.products.push({id: this.products.length+1, ...product})
    }

    // Método que elimina un producto con el ID desde el JSON
    deleteProduct(path, id) {
        fsP.readFile(path,"utf-8",(err, data)=> {
            if(err){
                console.log(err)
                return
            }
        const product = JSON.parse(data)
        const index = product.findIndex(product => product.id === id)
        if(index !== -1) {
            product.splice(index, 1)
        } else {
            console.log(`Product with id ${id} not found`)
            return
        }
        fs.writeFile(path, JSON.stringify(product, null, 2),"utf-8" , err => {
            if (err){
                console.log(err)
            } else {
                console.log(`Product with id ${id} succesfully removed`)
            } 
        }) 
        }
        )};

    // Método para actualizar productos, sólo actulizo stock por tema de no hacerlo tan largo. En cualquier caso podría agregar más.
//     updateProduct = async (path, id, stock) => {
//     if(fs.existsSync("./DB.json")){
//         try {
//             let data = await fsP.readFile(path, "utf-8") 
//             let products = JSON.parse(data)
//             let productUpdate = products.findIndex(prod => prod.id === id)
//             if()productUpdate.stock = stock
//             await fsP.writeFile(path, JSON.stringify(productUpdate, null, 2))
//             console.log(`Product with id: ${id} succesfully updated`)
//         } catch (error) {
//             console.log(error, "El producto no existe")
//         }
//     }
// }
    // updateProduct = async (path, id, updatedProduct) => {
    //     try {
    //         await fsP.readFile(path, "utf-8", (data) => {
    //         const products = JSON.parse(data)
    //         const index = products.findIndex(product => product.id === id)
    //         if (index !== -1) {

    //             products[index] = {...products[index], ...updatedProduct}
    //         } else {
    //             console.log(`Product with id ${id} not found`)
    //             return
    //         }
    //         fsP.writeFile(path, JSON.stringify(products), "utf-8", err => {
    //             if (err) {
    //                 console.log(err)
    //             } else {
    //                 console.log(`Product with id ${id} successfully updated`)
    //             }
    //         })
    //     })
    // }catch(error) {
    //     console.log(error)
    // }}

    // Método que crea el archivo "DB.json"
    createJsonFile =  (path)=> {
    fsP.writeFile(path,JSON.stringify([...product.products],null,2),"utf-8", (err)=> {
        if(err) return console.log(err)})
        }

    // Traer productos desde el JSON pero con PROMISES.}
    getProducts = async(path)=> {
        try {
            let data = await fsP.readFile(path,"utf-8")
            const parseData = JSON.parse(data)
            console.log(parseData)
            return parseData
        } catch (err) {
            console.log(err)
        }
    }
    
    // Trae producto con ID desde JSON
    getProductById(path, id) {
        fs.readFile(path, "utf-8", (err, contenido)=>{
            if(err) console.log(err)
            let product = JSON.parse(contenido)
            let productId = product.find(prod => prod.id === id)
            if(!product) return "Product not found" 
            console.log("Product from JSON with id: ",productId)
            }
        )}
}
const product = new ProductManager()

// PRODUCTO CON ID 1
product.addProduct({
    title: "El oficio de enamorarse",
    description: "Poesia",
    price: 200,
    thumbnail: "public/images/ElOficio.jpg",
    code: "ElOf123",
    stock: 5
})
//PRODUCTO CON ID 2
product.addProduct({
    title: "Tan cerca, Tan cerca",
    description: "Cuentos",
    price: 300,
    thumbnail: "public/images/tanC.png",
    code: "TanC123",
    stock: 4
})

// Segundo producto igual para comprobar la validación del código

product.addProduct({
    title: "Tan cerca, Tan cerca",
    description: "Cuentos",
    price: 300,
    thumbnail: "public/images/tanC.png",
    code: "TanC123",
    stock: 4
})
//PRODUCTO CON ID 3
product.addProduct({
    title: "El señor de los anillos",
    description: "Novela",
    price: 1500,
    thumbnail: "public/images/LOR.jpg",
    code: "Lor123",
    stock: 8
})
// PRODUCTO CON ID 4
product.addProduct({
    title: "Games of Thrones",
    description: "Novela",
    price: 600,
    thumbnail: "public/images/path",
    code: "GOT123",
    stock: 12
}
)

// PRODUCTO CON ID 5
product.addProduct({
    title: "Harry Potter y el príncipe Mestizos",
    description: "Novela",
    price: 800,
    thumbnail: "public/images/path",
    code: "HP123",
    stock: 10
}
)
//Acá dejo un producto con un campo sin rellenar para checkear el return de los campos incompletos

product.addProduct({
    description: "Novela",
    price: 1500,
    thumbnail: "public/images/LOR.jpg",
    code: "Lor123",
    stock: 8
})


// Utilización de métodos
product.createJsonFile("./DB.json")
// product.getProductById("./DB.json", 1)
// product.deleteProduct("./DB.json", 2)
// product.updateProduct("./DB.json", 1, 6)
product.getProducts("./DB.json")

module.exports = ProductManager;


