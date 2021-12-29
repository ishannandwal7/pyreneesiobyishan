import mongoose from "mongoose";
import connection from "../../components/models/connections"
export default async function (req,res) {
    await mongoose.connect(process.env.DBurl);
// console.log(mongoose.connection.on())
    // if(mongoose.connection.on){
    //     console.log("DB connected")
    // }
    // else{
    //     await mongoose.connect(process.env.DBurl);

    // }
    function sanitize(string) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            "/": '&#x2F;',
        };
        const reg = /[&<>"'/]/ig;
        return string.replace(reg, (match)=>(map[match]));
      }
    let user=sanitize(req.body.sender);
    let x=await connection.find({members:{$in:[user]}});
    res.json({"response":x})

    
}