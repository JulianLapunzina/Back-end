const { request, response } = require("express")
const ProductManager = require("./ProductManager")
const express = require ("express")
const port = 8080
const app = express()
const fs = require ("fs")
const product = new ProductManager()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
// if(fs.existsSync) {
//     fs.readFile("./DB.json", (err, contenido)=> {
//         if(err) console.log(err)
//         path.push(JSON.parse(contenido))
//     })
// } 

// app.get("/usuarios", (req, res)=>{
//     res.sendFile(__dirname + "/title.html")
// })


// // POST
// app.post("/usuarios"), (req, res)=> {
//     let user = req.body

//     if(!user.nombre || !user.apellido) return res.status(404).send({status:"Error", mensaje: "Todos los campos son necesarios"})
//     usuarios.push(user)
//     res.status(200).send({user})
// }

// // PUT
// app.put("/usuarios/:uid"), (req, res)=>{
//     const {uid} = req.params
//     const user = req.body

//     const index = usuarios.findIndex(user => user.id === uid)
//     if(index === -1) res.send({status: "error", message: "No existe el usuario"})
    
//     usuarios[index] = user

//     res.send({usuarios})
// }

// app.delete('/usuarios/uid', ()=>{
//     let {uid} = req.params

//     const index = usuarios.findIndex(usuario => usuario.id === uid)

//     if(index === -1) res.send({status: "error", message: "No existe el usuario"})
    
//     usuarios = usuarios.filter(user = user.id !== uid)
    
//     res.send("delete")
// })

app.get("/", async (req, res)=>{
    try {
        const usuarios = await product.getProducts("./DB.json")
        res.send({usuarios})
    }catch (error){
        console.log(error)
    }
})

// app.get("/:idUsuario", (req, res)=>{
//     const usuario = usuarios.find(user => user.id === request.params.idUsuario)
//     if(!usuario) return response.send("No es un usuario")
//     res.send({usuario})
// })


app.listen(port, ()=>{
    console.log(`Listen on port ... ${port}`)
})