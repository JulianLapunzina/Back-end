// schema 
const {Schema, model} = require("mongoose")

const collection = "users"

const userSchema = new Schema({
    name: String,
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

const userModel = model(collection, userSchema)

module.exports =  {
    userModel
}