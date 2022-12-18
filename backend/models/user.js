import mongoose, { mongo } from "mongoose";
import { timestamp } from "rxjs";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
}, {timestamp:true})

const User = mongoose.model("User", userSchema)

module.exports = User;