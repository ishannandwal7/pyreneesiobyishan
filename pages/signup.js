import { useRouter } from "next/dist/client/router";
import {useState} from "react"
import Navbar from "../components/navbar";
import Link from "next/link"
import Head from "next/head"
export default function Signuppage () {
    const router=useRouter();
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    async function sendform(e) {
        e.preventDefault();

        let ans=await fetch("/api/signup",{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                username,
                email,
                password
            })
        });
        // ans=await ans.json();
        // console.log(ans,"ans value");
       // location.replace("/emailvalidation")

//         if(ans.status==="emailsend"){

//             location.replace("/emailvalidation")
//             // router.push('/emailvalidation')
//      }
//      else{
//          location.replace("/oops");
//         //  router.push('/oops')

//      }
        // async function senddata() {
             
            
        // }
        // senddata();
        // if(mailsend){
        //     router.push("/emailvalidation");
        // }
        // else{
        //     router.push("/oop");
        // }

    }
    return(
        <>
        <Navbar/>
        <Head>
            <link rel="stylesheet" href="signuppage.css" />
            <title >SignUp/Register</title>

        </Head>
        <div id="login-box">
  <div className="left">
    <h1>Sign up</h1>

    <form onSubmit={sendform}>
            <input required autoComplete="true" type="text" placeholder="Username" value={username} onChange={(e)=>setusername(e.target.value)} name="username" />
            <input required autoComplete="true" type="email" placeholder="email" value={email} onChange={(e)=>setemail(e.target.value)} name="email" />
            <input required autoComplete="true" type="password" placeholder="password" value={password} onChange={(e)=>setpassword(e.target.value)} name="password" />
           <button>

            <input  type="submit" value="register" />
           </button>

        </form>
        
        <Link href="/login">
            
               <h4 className="loginredi text-center p-1">
                   login
               </h4>
        </Link>
        

  
  </div>
  
  <div className="right">
      <img src="images/satellite.svg" style={{ width: '60%' ,height:'80%'}} />
      

<span className="text-sm capitalize" >click to verify email </span>
      <button className="capitalize">
<Link href="/emailvalidation">

<input  type="submit" value="validation" />
</Link>
</button>
      

  </div>
</div>
        </>
    )
}
