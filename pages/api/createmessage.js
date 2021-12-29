import messages from  "../../components/models/messages";
import mongoose from "mongoose";
export default function (req,res) {
    let {conversationId,sender,message}=req.body;
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
      conversationId=sanitize(conversationId);
      sender=sanitize(sender);
      message=sanitize(message);
      console.log(sender,conversationId,message);
      async function  main() {
            await mongoose.connect(process.env.DBurl).then(t=>console.log("DB connected"));
            try {
                let newmessage = new messages({
                    "conversationId":conversationId,
                    "sender":sender
                    ,
                    "message":message
                });
                let x=await newmessage.save();
                if(x){
                    console.log("message created")
                    res.status(200).json({status:"send"});
    
                }
                   
            else{console.log("Failed to create message");
            res.status(500).json("error");}
            } catch (error) {
                console.log(error.message)
            res.status(500).json("error");}
                
            
      
       
        }

        
      
      main();

    
}