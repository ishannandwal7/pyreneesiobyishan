import user from "../../components/models/schema";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import {  useRouter } from "next/dist/client/router";
export default async function (req,res) {
  await mongoose.connect(process.env.DBurl);
  if(mongoose.connection.on){console.log("connected to DB")}
  else{console.log("falied to connect DB ")}
  let {username,password}=req.body;
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
  username=sanitize(username);
//   password=sanitize(email);


  // if(!username || !email ||!password ||usernameexist ||emailexist ) {
  //   //fill the details
  //   res.json({
  //     status:"invalid data either email or username exists"
  //   })
  // }
  // else{
  //   //action 
  //   try {
      
      
  //   } catch (error) {
      
  //     console.log(error.message,"ishan")
  //   }
    
    



  // }
  
  try {

    let usernameexist=await user.findOne({username});
    // let emailexist=await user.findOne({email});
    // let chk=await user.findOne({email});
    if(usernameexist){
      //user email already exists
      
      console.log(jwt.sign({
          "username":usernameexist.username,
          "email":usernameexist.email},process.env.KEY),"user");
    
      if(await bcrypt.compare(password,usernameexist.password)){
        res.status(200)
        .json({
        
            status:"valid",
            "user":jwt.sign({
                "username":usernameexist.username,
                "email":usernameexist.email},process.env.KEY)
            // "token":jwt.sign(usernameexist,process.env.KEY),
        }
        )

      }
      else{  res.status(500)
        .json({
        
            status:"invalid",
        }
        )

      }
   
          }
    else{
       //create a user
    //  let token=jwt.sign({
    //   username,
    //   email,
    //   password
    // },process.env.KEY);
    
    // async function sendmail(){
    //   try {
    //     let transporter = nodemailer.createTransport({
    //       service: 'gmail',
    //       auth: {
    //         user: 'projectsbyishan@gmail.com',
    //         pass: process.env.emailpass
    //       }
    //     });
        
    //     let mailOptions = {
    //       from: 'projectsbyishan@gmail.com',
    //       to: email,
    //       subject: 'Email verification code',
    //       text: 'token key:'+token
    //     };
        
    //     transporter.sendMail(mailOptions, function(error, info){
    //       if (error) {
    //         console.log(error);
    //       } else {
    //         console.log('Email sent: ' + info.response);
    //       }
    //     });
        
    //   } catch (error) {
    //     console.log(error.message,"mail error")
    //   }
     
    // }
    // sendmail();
    // //  let hashpassword=await bcrypt.hash(password,10);
    // //   let createuser=await user.create({
    // //     username,
    // //     email,
    // //     "password":hashpassword
    // //   });
    // //   if(createuser){console.log("user created")}
    // //   else{console.log("falied to create user")}
    // res.json({
    //   status:"emailsend"
    // }) 
     res.status(500)
        .json({
        
            status:"invalid",
        }
        )
     

    }

  } catch (error) {
    console.log(error.message)
    
  }
  
 let x=mongoose.connection.close();
 if(x){console.log("connection closed to DB")}
 else{console.log("connection failed to close")}
}