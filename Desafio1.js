// const product1 = {
//     title: "Coder",
//     description: "Primer desafío entregable Clases Javascript",
//     price: "La coderBeca",
//     thumbnail: "https://www.github.com/JulianLapunzina/Back-end",
//     code: "asd",
//     stock: "asd"
// }


// class ProductManager {
//     constructor() {
//         this.products = []
//     }

//     addProduct(product) {
//         if(!product.title ||
//         !product.description || 
//         !product.price || 
//         !product.thumbnail || 
//         !product.code || 
//         !product.stock) {
//             console.error("¡Every fields are request!")
//         }
//         else {
//             this.products.push({id: this.products.length+1, ...product})
//             return console.log(`Product was succesfully added`)
//         }

//         if(this.products.map(product => product.code === product.code)) {
//             console.log(`The product with code: ${product.code} allready exists`)
//         } else {
            
//         }
//     }

// }


// const productManager = new ProductManager

// productManager.addProduct(product1)
// console.log(productManager.products)

const productos = [
    {
        id: "1",
        code: "a"
    }
]

const producto1 = {
    id: "2",
    code: "asd"
}



const validateCodeField = (product)=> {
    if(productos.map(product => product.code === product.code)){
        console.log(`The product with code: ${product.code} allready exists`)
    }
    else {
        productos.push(product)
        return console.log(productos)
    }
}

validateCodeField(producto1)
