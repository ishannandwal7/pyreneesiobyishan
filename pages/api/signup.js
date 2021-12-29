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
  let {username,email,password}=req.body;
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
  email=sanitize(email);


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
    let emailexist=await user.findOne({email});
    // let chk=await user.findOne({email});
    if(usernameexist||emailexist){
      //user email already exists
      res.json({
        status:"emailEXIST or username exists"
      })  
    }
    else{
       //create a user
     let token=jwt.sign({
      username,
      email,
      password
    },process.env.KEY);
    
    async function sendmail(){
      try {
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'projectsbyishan@gmail.com',
            pass: process.env.emailpass
          }
        });
        
        let mailOptions = {
          from: 'projectsbyishan@gmail.com',
          to: email,
          subject: 'Email verification code',
         
          text: ' WELCOME TO PYRENEES io \n your token key: \n'+  token
        };
        
      //  let mailsendchk=false;
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
            res.status(500).json({
              status:"something went wrong.."
            })
          } else {
            console.log('Email sent: ' + info.response);
            // mailsendchk=true;
            res.status(200).json({
              status:"emailsend"
            })
          }
        });
        // if(mailsendchk){

         
        // }

        
      } catch (error) {
        console.log(error.message,"mail error")
        res.status(500).json({
          status:"something went wrong.."
        })

      }
     
    }
    sendmail();
    //  let hashpassword=await bcrypt.hash(password,10);
    //   let createuser=await user.create({
    //     username,
    //     email,
    //     "password":hashpassword
    //   });
    //   if(createuser){console.log("user created")}
    //   else{console.log("falied to create user")}
  
    
     

    }

  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      status:"something went wrong.."
    })
    
  }
  
 let x=mongoose.connection.close();
 if(x){console.log("connection closed to DB")}
 else{console.log("connection failed to close")}
}