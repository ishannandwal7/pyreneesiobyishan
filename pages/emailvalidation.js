import { useState } from "react";
import Navbar from "../components/navbar";
import Head from "next/head"

export default function Emailvalidationpage () {
    const [string, setstring] = useState("");
    async function emailver(e) {
        e.preventDefault();
        let ans=await fetch("/api/verifyemail",{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                "token":string
                
            })
        }).then(t=>t.json());
        console.log(ans)
        if(ans.status=="verified"){
            location.replace("/profile");
            localStorage.setItem("token",string);
        }
        else{
            location.replace("/iop")
        }
    }
    return(
        <>
        <Head>
            <link rel="stylesheet" href="signuppage.css" />
            <title className="capitalize">Email Validation</title>
        </Head>
        <Navbar/>   
        <div id="login-box">
  <div className="left">
    <h1 >Email Validation</h1>

    <form onSubmit={emailver}>
            <input required autoComplete="false" type="text" placeholder="Paste the String here.." value={string} onChange={(e)=>setstring(e.target.value)} />
           <button>

            <input  type="submit" value="Verify" />
           </button>

        </form>
        
       
        

  
  </div>
  
  <div className="right">
      <img src="images/satellite.svg" style={{ width: '60%' ,height:'100%'}} />
      

  </div>
</div>
       
     </>
    )
    
}