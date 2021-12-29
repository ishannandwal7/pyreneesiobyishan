import mongoose from "mongoose";
const connetionschema=new mongoose.Schema({
    members:{
        type:Array
    },
},
{timestamps:true}
);
module.exports=mongoose.models.connections||mongoose.model("connections",connetionschema);