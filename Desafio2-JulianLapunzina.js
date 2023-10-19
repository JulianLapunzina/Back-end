const fs = require("fs")

class ProductManager {
    constructor() {
        this.products = []
        this.path = "./DB.json"
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
    
    getProductsAsync = async ()=> {
    try{
    let data = await fs.readFile(this.path, "utf-8")
    let dataParse = JSON.parse(data)
    return dataParse
    } catch {
        throw new Error('Hubo un problema')
    }
    }


}

const productManger = new ProductManager

const product120 = {
title: "Tan cerca, Tan cerca",
description: "Cuentos",
price: 300,
thumbnail: "public/images/tanC.png",
code: "TanC123",
stock: 4
}

productManger.addProduct(product120)