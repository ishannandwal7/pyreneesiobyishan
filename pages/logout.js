import {useEffect} from "react";
export default function Logoutpage () {
    useEffect(() => {
       localStorage.removeItem("token");
       location.replace("/")
       
    }, [])
    return(<>
    <h1>logout Page</h1>
    </>)
    
}