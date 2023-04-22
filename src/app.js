//GLOBAL 
const express = require ("express")
const handlebars = require("express-handlebars")
const {Server} = require("socket.io")
const path = require("path")

// ROUTERS
const productRouter = require("./routes/products")
const cartRouter = require("./routes/cart")
const viewsRouter = require("./routes/views")
const homeRouter = require("./routes/home")
// ___________________________________


// APP
const PORT = 8080
const app = express()

// HTTP SERVER
const httpServer = app.listen(PORT, ()=>{
    console.log(`Listen on port ... ${PORT}`)
})

// SOCKET SERVER
const io = new Server(httpServer)

//json app
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));

// hbs ------
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.use("/", viewsRouter)
app.use("/", homeRouter)

//PRODUCTOS
app.use("/", productRouter)
app.use('/api/productos', productRouter)

//Carritos
app.use("/", cartRouter)

//socket server
io.on("connection", socket => {
    console.log("Nuevo cliente conectado")

    socket.on("message", data => {
        console.log(data)
    })

    socket.broadcast.emit("evento", "esto lo van a recibir solo los clientes")
    
    io.emit("evento-global", "este es un msj global")

    let logs = []
    socket.on("message1", data =>{
        io.emit("log", data)
    })

    socket.on("message2", data =>{
        logs.push({socketid:socket.id,message:data})
        io.emit("log", {logs})
    })
})


