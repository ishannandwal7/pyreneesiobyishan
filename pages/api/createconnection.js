import mongoose from "mongoose"
import Connection from "../../components/models/connections"
export default async function (req,res) {
    try {
        await mongoose.connect(process.env.DBurl).then(t=>{
            console.log("DB connected")
        });
        // mongoose.connection.on("DB connceted");
        let {sender,receiver}=req.body;
        let conn=new Connection({
            members:[sender,receiver],
            
            
        });
        let sav=await conn.save();
        if(sav){
            console.log("connection created")
            res.status(200).json({"status":"okay"});
            res.end();
        }
        mongoose.connection.close()

    } catch (error) {
        console.log(error.message,"error")
    res.status(500).json("not saved")

    }
   
    // res.end()
}