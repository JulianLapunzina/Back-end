const {Router} = require("express")
const ProductManager = require("../ProductManager")

const product = new ProductManager("DB.json")
const router = Router()

router.get("/", async (req, res)=>{
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
})

router.get("/:pid", async (req, res)=>{
    const {pid}= req.params
    // validar si es número
    const productDb = await product.getProductById(pid)
    // validar que exista el producto
    if (!productDb) {
        return res.send({status: 'error', error: 'product not found'})
    }
    res.send({productDb})
})

// NO LOGRO ENTENDER POR QUE NO FUNCIONA LA VALIDACIÓN DE ESTA FN. SIEMPRE RETORNA "EVERY FIELDS ARE REQUEST" POR MÁS QUE LOS DATOS ESTEN CORRECTOS Y TODO SALGA OK
router.post("/", async (req, res)=>{
    const user = req.body
    console.log(user)
    const pushDB = await product.addProduct(user)
    if(!pushDB) {
        return res.status(400).send({status: "error", message: "Every fields are request"})
    }
    res.status(200).send({status: "OK", message: "Product added succesfully"})
})

// Actualizar/modificar un producto | Me pasa lo mismo con la validación acá. Por consola retorna bien pero la respuesta del sv no 
router.put("/:pid", async (req, res)=>{
    const {pid} = parseInt(req.params)
    const newProduct = req.body
    const productUpdate = await product.updateProduct(pid, newProduct)
    
    if(productUpdate) return res.status(400).send("Product not found")
    res.status(200).send("Producto actualizado")
})

//Eliminar un producto || Lo mismo que en las otras. No logro enviar la respuesta correcta al sv pero las funciones se ejecutan correctamente
router.delete("/:pid", async (req, res)=>{
    const {pid} = parseInt(req.params)
    const productDelete = await product.deleteProduct(pid)

    if(productDelete !== undefined) {
    res.status(200).send("Product succesfully deleted")
    }else {
    res.status(400).send("Product not found") 
    }
}) 

module.exports = router