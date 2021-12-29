import {useEffect} from "react";
export default function () {
    useEffect(() => {
       localStorage.removeItem("token");
       location.replace("/")
       
    }, [])
    return(<>
    <h1>logout Page</h1>
    </>)
    
}