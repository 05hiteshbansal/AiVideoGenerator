import { user } from "@nextui-org/react";
import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    // userId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "users"
    // },
    id:{
        type:String,
    },
    scripts:{
        type:Array,
        default:[]
    },
    audioUrl:{
        type:String,
    },
    images:{
        type:Array,
        default:[]
    }
})


const Video= mongoose.models.videos ||  mongoose.model("videos",VideoSchema)



export default Video;