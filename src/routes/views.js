const {Router} = require("express")

const router = Router()

router.get("/vista", (req, res)=> {
    let testUser = {
        name: "Julian",
        title: "Backend-Coder",
        lastname: "Lapunzina",
        style: "index.css"
    }
    res.render("index", testUser)
})


module.exports = router