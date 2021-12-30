import { useEffect,useState } from "react";
import Ishan from "../components/testing";
import { useRouter } from "next/dist/client/router";
// import "../components/navscr";

export default function Indexpage () {
  const router=useRouter();
  const [loading, setloading] = useState(true);
  useEffect(() => {
  const chk=localStorage.getItem("token");
  if(chk){          
     // if client has token
    router.replace("/chat")
    }
    else{
    setloading(false)

  }
  async function peak() {
    let x=await fetch("https://community-purgomalum.p.rapidapi.com/json?text=ishan%20nandwal", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "community-purgomalum.p.rapidapi.com",
        "x-rapidapi-key": "cbc09da551mshabef0758e18b536p12f19cjsned97db08a990"
      }
    })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.error(err);
    });

  }
  peak();

  }, [])

  
  if(loading){
    return(
      <h1>loading ...</h1>
    )
  }else{

    return(
      <>
    <Ishan/>
    
    </>
  )
}
}