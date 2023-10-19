const socket = io()

socket.emit("message", "Hola soy el cliente que se conectó")

socket.on("evento", data =>{
    console.log(data)
})
socket.on("evento-global", data =>{
    console.log(data)
})


// const input = document.getElementById("text")
// const log = document.getElementById("mensajes")
// const productsContainer = document.getElementById("products-container")


// input.addEventListener("click", event => {
//     if(event.key === "Enter"){
//         socket.emit("message2", input.value)
//         input.value = ""
//     }
// })

// socket.on("log", data =>{ 
//     let logs =""
//     data.logs.forEach(log => {
//         logs +=`<li>${log.socketid} dice: ${log.message}</li>`
//     })
//     log.innerHTML=logs
// })