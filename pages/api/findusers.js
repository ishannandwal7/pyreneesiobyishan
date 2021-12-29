import mongoose from "mongoose";
import users from "../../components/models/schema";
export default async function (req,res) {
    await mongoose.connect(process.env.DBurl);

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
    let user=sanitize(req.body.username);
    let x=await users.find({"username":user});
    if(x){

        res.status(200).json({"response":x})
    }
    else{
        res.status(500).json({status:"something went wrong.."})

    }

    
}