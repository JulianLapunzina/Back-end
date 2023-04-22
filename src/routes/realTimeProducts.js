const {Router} = require("express")
const ProductManager = require("../ProductManager")


const router = Router()
const product = new ProductManager("DB.json")


router.get("/realTimeProducts", (req, res) => {
    const products = []
    res.render("realTimeProducts", products)
})



module.exports = router