const express = require ("express")
const ProductManager = require("../ProductManager")

const port = 8080
const app = express()
const product = new ProductManager("DB.json")


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.status(200).send('<h1>Bienvenido</h1>')
})

app.get("/api/productos", async (req, res)=>{
    try {
        const { limit } = req.query
        const products = await product.getProducts()        
        if(!limit) {
            return res.send({
                status: 'success',
                products
            })            
        }
        return res.send({
            status: 'success',
            products: products.slice(0, limit)
        })   
    }catch (error){
        console.log(error)
    }
})

app.get("/api/productos/:pid", async (req, res)=>{
    try {
        const {pid}= req.params
        // validar si es número
        const productDb = await product.getProductById(parseInt(pid))
        // validar que exista el producto
        if (!productDb) {
            return res.send({status: 'error', error: 'product not found'})
        }
        res.send({productDb})
    }catch (error){
        console.log(error)
    }
})

// NO LOGRO ENTENDER POR QUE NO FUNCIONA LA VALIDACIÓN DE ESTA FN. SIEMPRE RETORNA "EVERY FIELDS ARE REQUEST" POR MÁS QUE LOS DATOS ESTEN CORRECTOS Y TODO SALGA OK
app.post("/api/productos", async (req, res)=>{
    try {
        const user = req.body
        console.log(user)
        const pushDB = await product.addProduct(user)
        if(!pushDB) {
            return res.status(400).send({status: "error", message: "Every fields are request"})
        }
        res.status(200).send({status: "OK", message: "Product added succesfully"})
    }
    catch (error) {
        console.log(error)
    }
})

// Actualizar/modificar un producto | Me pasa lo mismo con la validación acá. Por consola retorna bien pero la respuesta del sv no 
app.put("/api/productos/:pid", async (req, res)=>{
    try {
        const {pid} = req.params
        const newProduct = req.body
        const productUpdate = await product.updateProduct(parseInt(pid), newProduct)
        
        if(productUpdate) return res.status(400).send("Product not found")
        res.status(200).send("Producto actualizado")
    } catch (error) {
        console.log(error)
    }
})

//Eliminar un producto || Lo mismo que en las otras. No logro enviar la respuesta correcta al sv pero las funciones se ejecutan correctamente
app.delete("/api/productos/:pid", async (req, res)=>{
    try {
        const {pid} = req.params
        const productDelete = await product.deleteProduct(parseInt(pid))

        if(productDelete !== undefined) {
            res.status(200).send("Product succesfully deleted")
        }else {
            res.status(400).send("Product not found") 
        }
    }
    catch (err) {
        console.log(err)
    }
}) 

app.listen(port, ()=>{
    console.log(`Listen on port ... ${port}`)
})