class ProductManager {

    constructor() {
        this.products = []
    }

    addProduct(title,description,price,thumbnail,code,stock) {
    const product ={
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    }
    if(this.products.length === 0){
        product.id = 1
    } else {
        product.id = this.products[this.products.length - 1].id + 1
    }
    if (Object.values(product).every(value=>value)){
        this.products.push(product);
    } else {
        console.log("Necesita rellenar todos los campos")
    }
}
    getProducts() {
        return this.products
        }

    getProductsById(id) {
        const obj = this.products.find(product=> product.id === id)
        return obj ? obj : console.log("No products find")
    }
    }

const app = new ProductManager()


app.addProduct("El oficio de enamorarse", "libro de poesía", 200, "../img/ElOficio.jpg","ElOf123", 5)
app.addProduct("Tan cerca, Tan cerca", "libro de cuentos", 300, "../img/TanCerca.jpg","TanC123", 4)
app.addProduct("El señor de los anillos", "Novela", 1500, "../img/LOR.jpg","Lor123", 8)



console.log("Productos en stock",app.getProducts())
console.log("Producto con id 3", app.getProductsById(3))


