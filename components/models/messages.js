import mongoose from "mongoose";
const messageschema=new mongoose.Schema({
    conversationId:{
        type:String,
        required:true
    },
    sender:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true});
module.exports=mongoose.models.allmessages||mongoose.model("allmessages",messageschema);