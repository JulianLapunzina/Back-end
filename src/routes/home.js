const {Router} = require("express")
const ProductManager = require("../ProductManager")

const product = new ProductManager("/DB.json")
const router = Router()

router.get("/home", async (req, res)=> {
const products = await product.getProducts()
    res.render("home", {products}
    )
})

module.exports = router