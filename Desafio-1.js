        // Desafío N° 1 - Julián Lapunzina

const products = []

class ProductManager {
    constructor() {
        this.products = products
        // this.path = path
    }

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

    getProducts(){
        return this.products
    }

    getProductById(id){
        let product = this.products.find(prod => prod.id === id)
        if(!product) return 'Product not Found'
        return product
        }

    removeProductById (id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
        }
        console.log("El producto fue eliminado correctamente")
    }
        
}


const product = new ProductManager()

product.addProduct({
    title: "El oficio de enamorarse",
    description: "Poesia",
    price: 200,
    thumbnail: "public/images/ElOficio.jpg",
    code: "ElOf123",
    stock: 5
})

product.addProduct({
    title: "Tan cerca, Tan cerca",
    description: "Cuentos",
    price: 300,
    thumbnail: "public/images/tanC.png",
    code: "TanC123",
    stock: 4
}
)

// Segundo producto igual para comprobar la validación del código

product.addProduct({
    title: "Tan cerca, Tan cerca",
    description: "Cuentos",
    price: 300,
    thumbnail: "public/images/tanC.png",
    code: "TanC123",
    stock: 4
}

)
product.addProduct({
    title: "El señor de los anillos",
    description: "Novela",
    price: 1500,
    thumbnail: "public/images/LOR.jpg",
    code: "Lor123",
    stock: 8
})

//Acá dejo un producto con un campo sin rellenar para checkear el return de los campos incompletos

product.addProduct({
    description: "Novela",
    price: 1500,
    thumbnail: "public/images/LOR.jpg",
    code: "Lor123",
    stock: 8
})


console.log("Products stock: \n",product.getProducts())
console.log("Products with id: \n", product.getProductById(3))
product.removeProductById(2)
console.log("Products stock: \n",product.getProducts())
