import messages from  "../../components/models/messages";
import mongoose from "mongoose";
export default async function (req,res) {
    let {conversationId,sender}=req.body;
    // if(conversationId==null||sender==null){
    //     res.status(500).json({
    //       status:  "should not contain null"
    //     })
    //     return;
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
        if(string==null){return "something went wrong.."}
        return string.replace(reg, (match)=>(map[match]));
      }
      conversationId=sanitize(conversationId);
      sender=sanitize(sender);

      await mongoose.connect(process.env.DBurl).then(t=>console.log("DB connected"));
      try {
         
          let x=await messages.find({"conversationId":conversationId});
          if(x){
              console.log("message found")
              res.status(200).json(x);

          }
             
      else{console.log("Failed to find message");
    //   res.status(500).json("error"); 
      throw error;
    }
      } catch (error) {
          console.log(error.message)
      res.status(500).json("error");}
          
      
    

    
}