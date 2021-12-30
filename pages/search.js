import { useState } from "react";
import Navbar from "../components/navbar";
import jwt from "jsonwebtoken";

import Head from "next/head"
export default function Searchpage () {
    const [username, setusername] = useState("");
    const [ans, setans] = useState(null);

   async function sendform(e) {
        e.preventDefault();
        let x=await fetch("/api/findusers",{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                username
            })
        }).then(t=>t.json());
        // console.log(x.response[0].email,typeof(x.response[0]))
        let iop=x.response[0];
        if(iop){

            setans(x.response[0].username);
        }
        else{
            setans(null);

        }
        

    }
    async function add() {
        let x=localStorage.getItem("token");
        x=jwt.decode(x);
        let iop=await fetch("/api/createconnection",{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
               "sender":x.username,
               "receiver":ans
            })
        }).then(t=>t.json());
        console.log(iop,"iop");
        if(iop.status==="okay"){
            alert("connection created");
            location.replace("/");
        }
        else{
            alert("something went wrong..");

        }
        
    }
    return<>
    <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <title className="capitalize">Search User</title>


    </Head>
    <Navbar/>

       <h1 className="text-center capitalize">search user</h1>
   <div className="flex justify-center">
       <form onSubmit={sendform}>
            <input required autoComplete="false" type="text" placeholder="Username" value={username} onChange={(e)=>setusername(e.target.value)} name="username" />
           <button>

            <input  type="submit" value="Search" />
           </button>

        </form>
   </div>
   <div className="   text-sm capitalize my-10 cursor-pointer flex justify-center  p-2">
        {/* <h1>{ans} </h1> */}
        {ans?
        <div className=" flex justify-start m-2 search-res bg-gray-800 text-gray-50 p-2"  onClick={add}>
            <img src="/images/usericon.png" width="40px" height="40px" alt="icon" /> 
            <h2>
                
            {ans}
            </h2    >

            {/* <h1 onClick={add}>{ans}</h1> */}
        </div>
        
        :<h1>NOT FOUND</h1>} 

   </div>

    </>
}