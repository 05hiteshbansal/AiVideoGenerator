import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"please Provide a Email"],
        unique:true
    },
    password:{
        type:String,        
    },
    authority:{
        type:String,
        default:"user"
    }
})


const User= mongoose.models.users ||  mongoose.model("users",userSchema)



export default User