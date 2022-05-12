const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    admin:{type:Boolean, default:false},
    username:String,
    password:String
})

const User = new mongoose.model("user", userSchema);

module.exports = User;

