const {Router} = require("express")
const ProductManager = require("../ProductManager")



const router = Router()
const product = new ProductManager("DB.json")


router.get("/realTimeProducts", async(req, res) => {
    const products = await product.getProducts()

    res.render("realTimeProducts", {products})
})

router.post("/realTimeProducts", async (req, res) => {
    const {title, description, stock, status, thumbnail, code} = req.body

    socket.emit("product", {title, description, stock, status, thumbnail, code})
    res.redirect('/realTimeProducts');
    // const addProduct = await product.addProduct(products)

    // if(addProduct) return res.send("Producto creado")
})


module.exports = router