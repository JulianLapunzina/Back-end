const {connect} = require("mongoose")

let url = 'mongodb+srv://julianlapunzina:SncMFSnmzt9P6ZgB@backend-coder.1uafuhw.mongodb.net/E-Commerce?retryWrites=true&w=majority'

module.exports = {
    connectDB: ()=> {
        connect(url)
        console.log("Database connected succesfully")
    }
}