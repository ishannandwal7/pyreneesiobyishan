import { useRouter } from "next/dist/client/router";
import {useState} from "react"
import Navbar from "../components/navbar";
import Link from "next/link";
import Head from "next/head"
export default function () {
    const router=useRouter();
    const [username, setusername] = useState("");
    // const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    // const [mailsend, setmailsend] = useState(false);
    function sendform(e) {
        e.preventDefault();
        async function senddata() {
             let ans=await fetch("/api/login",{
                 method:"POST",
                 headers:{
                     'Content-Type':"application/json"
                 },
                 body:JSON.stringify({
                     username,
                     password
                 })
             }).then(t=>t.json());
            //  console.log(ans)
             if(ans.status==="valid"){
                 location.replace("/profile");
                    localStorage.setItem("token",ans.user);
                    // setmailsend(true)
             }
             else{
                 location.replace("/oops")
             }
        }
        senddata();
        // if(mailsend){
        //     router.push("/emailvalidation");
        // }
        // else{
        //     router.push("/oop");
        // }

    }
    return(
        <>
        <Head>
            <link rel="stylesheet" href="signuppage.css" />
            <title className="capitalize">Login</title>

        </Head>
        <Navbar/>   
        <div id="login-box">
  <div className="left">
    <h1 >Login</h1>

    <form onSubmit={sendform}>
            <input required autoComplete="true" type="text" placeholder="Username" value={username} onChange={(e)=>setusername(e.target.value)} name="username" />
            <input required autoComplete="true" type="password" placeholder="password" value={password} onChange={(e)=>setpassword(e.target.value)} name="password" />
           <button>

            <input  type="submit" value="login" />
           </button>

        </form>
        
        <Link href="/signup">
            
               <h4 className="loginredi text-center p-1">
                sign-up
               </h4>
        </Link>
        

  
  </div>
  
  <div className="right">
      <img src="images/satellite.svg" style={{ width: '60%' ,height:'100%'}} />
      

  </div>
</div>
       
        </>
    )
}