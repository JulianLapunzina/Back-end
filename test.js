const products = []

const product1 = {
    title: "asd",
    description: "asd",
    price: "asd",
    thumbnail: "",
    code: "asdasd",
    stock: "asd"
}

const validateEmptyFields = (product)=> {
    if(!product.title ||
    !product.description || 
    !product.price || 
    !product.thumbnail || 
    !product.code || 
    !product.stock) {
        console.error("¡Every fields are request!")
    }
    else {
    products.push({id: products.length+1, ...product})
    }
}

validateEmptyFields(product1)
console.log(products)