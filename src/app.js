//GLOBAL 
const express = require ("express")
const handlebars = require("express-handlebars")
const {Server} = require("socket.io")
const path = require("path")


// ROUTERS
const productRouter = require("./routes/products")
const cartRouter = require("./routes/cart")
const usersRouter = require("./routes/users")
const homeRouter = require("./routes/home")
const realTimeProductsRouter = require("./routes/realTimeProducts")
const votosRouter = require("./routes/votos")
// CONFIG 
// const configDB = require("./config/config")





// // connect db
// configDB.connectDB()

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
// ___________________________________
const hbs = handlebars.create({})

hbs.handlebars.registerHelper({eq: function (a) {
switch(a) {
    case 1: return "Positivo"
    break
    case 0: return "Negativo"
    break
    case 3: return "Abstención"
    break
    default: return "No voto"
}
}
})
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.use("/", usersRouter)
app.use("/", homeRouter)
app.use("/", realTimeProductsRouter)
app.use("/", votosRouter)

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

    socket.on("product", data =>{
        console.log(data)
    })
})

