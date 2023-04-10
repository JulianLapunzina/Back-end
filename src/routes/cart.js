const {Router} = require("express")
const CartManager = require ("../CartManager")


const cart = new CartManager("cartDB.json")
const router = Router()

router.post("/api/carts", async (req, res)=> {
    cart.createCart()
    return res.status(200).send({status: "success", message: "Carrito creado"})
})

module.exports = router 
