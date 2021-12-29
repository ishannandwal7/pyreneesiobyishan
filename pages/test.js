import {io } from "socket.io-client";
import {useState ,useEffect,useRef} from "react";
export default function (params) {
    const socket = useRef(null);
    useEffect(() => {
      socket.current=io("localhost:8000", {transports: ['websocket', 'polling', 'flashsocket']});
    }, [])
    return<>
    <h1>testing</h1>
    </>
}