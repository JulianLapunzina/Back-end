const {Router} = require("express")
const router = Router()

router.get("/cambioVotos", async (req, res)=>{
    const votaciones = [{
        nombre: "Ruben",
        apellido: "Sarasa",
        voto: 1,
        id: "Rubeo",
        title: "Votaciones"
    }, {
        nombre: "Jorge",
        apellido: "Cervantes",
        voto: 0,
        id: "Jorge"
    }, {nombre: "Miguel",
        apellido: "Abuelo",
        voto: 3,
        id: "Miguel"
    },
    {nombre: "Turco",
    apellido: "Amid",
    voto: 0,
    id: "Turco"
    },
    {nombre: "Julian",
        apellido: "Lapunzina",
        voto: 4,
        id: "Julian"
    }]
    const expediente = 41252
    const title = "Votaciones"
    res.render("cambioVotos", {votaciones, expediente, title})
})

module.exports = router