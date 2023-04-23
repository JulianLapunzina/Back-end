const socket = io()

socket.on("evento-global", data =>{
    console.log(data)
})





// const input = document.getElementById("submit")
// input.addEventListener("submit", event => {
//     event.preventDefault()
//     let title = document.getElementById("title").value
//     let price = document.getElementById("price").value
//     let description = document.getElementById("description").value
//     let status = document.getElementById("status").value
//     let product = {title, price, description, status}
//     addProduct(product)
// })



// let form = document.getElementById("formProducts").values
// console.log(form)
// form.addEventListener("submit", evt => {
//     evt.preventDefault()
//     let product = form
//     console.log(product)
//     form.reset()
//     socket.emit("addProduct", product => {
//         console.log(product)
//     })
// })


// socket.on("addproduct", data =>{ 
//     const products = document.getElementById("productos")
//     data.forEach(prod => {
//         products +=`<p>${prod.title}
//         ${prod.description}
//         ${prod.price}
//         ${prod.status}
//         ${prod.thumbnail}
//         ${prod.code}
//         </p>`
//     })
//     products.innerHTML= products
// })