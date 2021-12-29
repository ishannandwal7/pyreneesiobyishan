import { useEffect, useState,useRef } from "react";
import Navbar from "../components/navbar";
import jwt from "jsonwebtoken";
import Head from "next/head"
import Link from "next/link"
import {io} from "socket.io-client";
import {format} from "timeago.js"


export default function () {
  const [allconnections, setallconnections] = useState([]);
  const [currentchat, setcurrentchat] = useState(null);
  const [currentconversationID, setcurrentconversationID] = useState(null);
  const [loggedinuser, setloggedinuser] = useState({});
  const [messages, setmessages] = useState([]);
  const [text, settext] = useState("");
  const [online, setonline] = useState([]);
  const [temp, settemp] = useState("");
  const socket = useRef(null);
  let list=[];
  let onlineconnections=[];

  function  findonlineconnections() {
	 
	if(allconnections!=undefined && online!=undefined){
		
		const filteredArray = online.filter(value => list.includes(value.username));

		onlineconnections=filteredArray;
		for (let i = 0; i < onlineconnections.length; i++) {
			onlineconnections[i]=onlineconnections[i].username;
		}
		console.log(onlineconnections,"online connections");
	}
	
  }



  // const [socket, setsocket] = useState(null);

                                               //socket trails 
//   useEffect(() => {
//  setsocket(io("ws://localhost:8000"));
// //  console.log(socket);
// // socket?.on("welcome",msg=>{
// //   console.log(msg,"mesg ");
// // })
//   }, []);
//   useEffect(() => {
//    socket?.on("welcome",mesg=>{
//      console.log(mesg,"message");
//    })
//   //  setTimeout(()=>{
//   //    socket.emit("checking","this is a message from client")
//   //  },2000)
//   }, [socket])
//   console.log(socket);
               
						//socket connection 
//  useEffect(() => {
//  console.log(socket,"socket from client ")
//  }, [])
async function getmessage() {

	let allmessages=await fetch("/api/getmessages",{
		method:"POST",
		headers:{
			'Content-Type':"application/json"
		},
		body:JSON.stringify({
			"conversationId":currentconversationID,
			"sender":loggedinuser.username,

		})
	}).then(t=>t.json());
	// console.log(allmessages,"all messages");
	setmessages(allmessages);
		//scroll to bottom
		setTimeout(() => {
			
			let objDiv = document.getElementById("chat");
			objDiv.scrollTop = objDiv.scrollHeight;
		}, 1);

	
}

 useEffect( ()=>{
	getmessage();

 },[currentconversationID])

async function  sendmessage() {
	let iop=await fetch("/api/createmessage",{
		method:"POST",
		headers:{
			'Content-Type':"application/json"
		},
		body:JSON.stringify({
			"conversationId":currentconversationID,
			"sender":loggedinuser.username,
			"message":text

		})
	}).then(t=>t.json());
	if(iop.status==="send"){
		settext("");
		getmessage();
		socket.current.emit("chat",currentchat)
		// setmessages([...setmessages,])
	}
	else{
		alert("something went wrong while sending message")
	}
}

//scroll to bottom 


const corsolved=", {transports: ['websocket', 'polling', 'flashsocket']}";


  useEffect(() => {
	  socket.current=io("https://pyreneesappbyishan.herokuapp.com/", {transports: ['websocket', 'polling', 'flashsocket']});
    let local=localStorage.getItem("token");
    let raw=jwt.decode(local);
	setloggedinuser(raw);
	socket.current.emit("add",raw.username);
	console.log(raw.username+" is online");
	socket.current.on("getusers",user=>{setonline(user);console.log(user,"usr receiver from server")});
	console.log("online users received")
	
    async function getconnections() {
		let x= await fetch("/api/findconnections",{
			method:"POST",
			headers:{
				'Content-Type':"application/json"
			},
			body:JSON.stringify({
				"sender":raw.username
			})
		}).then(t=>t.json());
		setallconnections(x.response);
		// console.log(allconnections,"all connection list")
		
    }
    getconnections();
	
	
   
  }, [])
  useEffect(()=>{
	// console.log(list,"online");
	findonlineconnections();
  },[online])
  
//   function changechat(newchat) {
	
// 	setcurrentchat(newchat)
//   }
  // useEffect(() => {
  //   socket?.on("connection" )
  // }, [socket])

  return(
    <>
    <Head>
      <link rel="stylesheet" href="style.css" />
	  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
	  <title className="capitalize">Dashboard</title>

    </Head>
    <Navbar  />
    <div id="container">
	<aside>
		<header className="text-gray-50 "  >
			{/* <input type="text" placeholder="search"/> */}
			<div className="flex justify-around"> 

			<h1 >Connections</h1> 
			<Link href="/search">
				<i className="fa fa-plus text-2xl cursor-pointer">	</i>
				{/* <img src="/images/plus.png" alt="add" width="40px" height="40px" cla /> */}
			</Link>
			</div>
			<hr />
		</header>
		<ul id="connections-list ">
			{
				allconnections.map((curele,key)=>{
					// console.log(key,"key value")
					socket.current.on("message",msg=>{
						console.log(msg,"message received from socket server");
						getmessage();
					})
					return (

						<li className="cursor-pointer" key={key} onClick={()=>{
							curele.members[0]===loggedinuser.username?
					setcurrentchat(curele.members[1]):
					setcurrentchat(curele.members[0])
							setcurrentconversationID(curele._id)
							}}>
							
				<img src="/images/usericon.png" classname="icon_user" width="55px" height="55px" alt=""/>
				<div>
				{
				curele.members[0]===loggedinuser.username?
					<h2>{curele.members[1]} </h2>:
					<h2>{curele.members[0]}</h2>

				}
				<div id="listadd">

				{
					(curele.members[0]===loggedinuser.username)?
					list.push(curele.members[1]):
					list.push(curele.members[0])
					
				}
				</div>
				
					<h3>
					User Connected
					</h3>
				</div>
			</li>
						)
				})
			}
			
			
		</ul>
	</aside>
	<main>
		<header>
			<img src="/images/usericon.png" width="55px" height="55px"  alt=""/>
			<div>
				{
					currentchat?
					<h2>{currentchat}</h2>:
					<h2>select a conversation</h2>
				}
			</div>
		</header>
		<ul id="chat">
			{
				messages.map((curele,key)=>{
					return(

						<li key={key} className={loggedinuser.username===curele.sender?"me":"you"}>
				<div className="entete">
					<span className="status green"></span>
					<h2>{loggedinuser.username===curele.sender?loggedinuser.username:curele.sender} </h2>
					<br />
					<h3>{format(curele.createdAt)} </h3>
				</div>
				<div className="triangle"></div>
				<div className="message">
					{curele.message}
				</div>
			</li>
						);
				})
			}
		
		</ul>
		<footer>

			<textarea placeholder="Message ...."  className="bg-gray-800 text-gray-50"  value={text} onChange={(e)=>settext(e.target.value)}></textarea>
		
			<a onClick={sendmessage} className="cursor-pointer  ">Send</a>
		</footer>
	</main>
	
</div>



{/* 
    <h1 className="sm:bg-red-800 text-gray-50 text-center capitalize bg-green-800">connections</h1>
    
    <div className="connections capitalize bg-gray-800 text-gray-50 m-2 p-2 ">
      
    {
      allconnections.map((curele,key)=>{
        return(
          <>
          <div className="my-8">

          <h1>{curele.members[1]}</h1>
          </div>
          </>

        )
      })

    }
    </div>
    <div className="chats-page bg-gray-800 text-gray-50 m-2 p-2">
      <h1>this is chat showing page</h1>
      <h1>this is chat showing page</h1>
      <h1>this is chat showing page</h1>
      <h1>this is chat showing page</h1>
      <h1>this is chat showing page</h1>
      <h1>this is chat showing page</h1>
      <h1>this is chat showing page</h1>
      <h1>this is chat showing page</h1>

      
    </div> */}
    </>
  )

}