import jwt from "jsonwebtoken";
export default function (req,res) {
    const token=req.body.token;
    try {
        const chk=jwt.verify(token,process.env.KEY);
        console.log("correct token",chk);
        res.json({
            status:"correct"
        })
        
    } catch (error) {
        console.log("incorrect"+error.message);
        res.json({
            status:"incorrect"
        })
        
    }
    
}