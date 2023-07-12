const {Router} = require("express")
const {userModel}= require("../models/userModel")

const router = Router()

router.get("/users", async (req, res)=> {
    try{
        const users = await userModel.find()
        res.send(users)
    } catch (err) {
        console.log(`No se pudo conectar a la base de datos : ${err}`)
        process.exit()
    }
})


router.post("/users", async(req, res) => {
    try {
    let user = {name: "prueba1",
    lastname: "prueba1",
    email: "prueba1"}

    if(!user.name || !user.lastname) {
        return res.status(400).send({status: "error", mensaje: "error"})
    }

    let result = await userModel.create(user) 
    res.status(200).send({result})
    } catch (error) {
        console.log(error)
    }
})

router.put("/users/:uid", async (req, res)=> {
    const {uid} = req.params

    try {
        let userForUpdate = {
            name: "prueba2",
            lastname:"prueba2",
            email: "prueba2"
        }

        if(!userForUpdate.name || !userForUpdate.lastname || !userForUpdate.email) {
            return res.status(400).send({status: "error", mensaje: "error"})
        }
        
        let result = await userModel.updateOne({_id: uid}, userForUpdate)

        res.status(200).send({status: "success", payload: `${result}`})
    } catch (error) {
        console.log(error)
    }
})

router.delete("/users/:uid", async (req, res)=> {
    const {uid} = req.params
    try {
        let result = await userModel.deleteOne({_id: uid})
        res.status(200).send({status: "succes", message: `User: ${uid} has been deleted`, payload: {result}})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router