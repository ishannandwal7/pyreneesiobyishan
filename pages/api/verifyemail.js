import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import user from "../../components/models/schema"
import bcrypt from "bcrypt"
export default async function (req,res) {
    let token=req.body.token;
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
      token=sanitize(token);
    let chk=jwt.verify(token,process.env.KEY);
    let raw=jwt.decode(token);
    let {username,email,password}=raw;
    username=sanitize(username);
    email=sanitize(email);


    if(chk){
        //create user in DB
       await mongoose.connect(process.env.DBurl).then(t=>{console.log("DB connected")})
          let hashpassword=await bcrypt.hash(password,10);
          let createuser=await user.create({
            username,
            email,
            "password":hashpassword
          });
          if(createuser){console.log("user created")}
          else{console.log("falied to create user")}
          mongoose.connection.close();

          //send ok response 

        res.json({
            status:"verified",
            decodedJWT:raw
        })
    }
    else{
        res.json({
            status:"incorrect"
        })

    }

}