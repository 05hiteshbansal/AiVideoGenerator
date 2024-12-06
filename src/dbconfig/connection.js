import mongoose from "mongoose";

const connection= async()=>{
try {
    mongoose.connect(process.env.MONGOURL)
    const connection = mongoose.connection
    connection.on('connected',()=>{
        console.log("DB connected")
    })
} catch (error) {
    console.log("error :"+ error)
}
}
 export default connection