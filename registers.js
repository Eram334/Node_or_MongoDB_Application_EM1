const mongoose = require("mongoose");

const  employeeSchema = new mongoose.Schema({
    firstname: {
        type:String,
        required:true
    },
    lastname: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    gender: {
        type:String,
        required:true
    },
    Phone: {
        type:Number,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },
    ConfirmPassword:{
        type:String,
        required:true
    }
    
})
//create collections

const Register = new mongoose.model("Register", employeeSchema);

module.exports= Register;