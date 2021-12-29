import React, { useRef } from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Navbar from './navbar';
import Head from "next/head";

import Typed  from "react-typed";

export default function Ishan() {
  const parallax = useRef();
  const textLines=["A Real Time Chat Application","Developed by","Ishan Nandwal","Student","Engineer"]
  
  return (

    <div style={{ width: '100%', height: '100%', background: '#253237' }}  >
      <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <link rel="stylesheet" href="testing.css" />
    <title>Home Page</title>
      </Head>
   
    <Navbar/>
      <Parallax ref={parallax} pages={3} className='indexpage'>
        
        <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#805E73' }} />
        <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />

        <ParallaxLayer
          offset={0}
          speed={0}
          factor={3}
          style={{
            backgroundImage: `url("images/stars.svg")`,
            backgroundSize: 'cover',
            backgroundColor:'black'

          }}
        />

        <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
          <img src="images/satellite.svg" style={{ width: '15%', marginLeft: '70%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
          <img src="images/cloud.svg"style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
          <img src="images/cloud.svg"style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img src="images/cloud.svg"style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
          <img src="images/cloud.svg"style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <img src="images/cloud.svg"style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
          <img src="images/cloud.svg"style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <img src="images/cloud.svg"style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
          <img src="images/cloud.svg"style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
          <img src="images/cloud.svg"style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
          <img src="images/cloud.svg"style={{ display: 'block', width: '20%', marginLeft: '5%' }} />
          <img src="images/cloud.svg"style={{ display: 'block', width: '15%', marginLeft: '75%' }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2.5}
          speed={-0.4}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}>
          <img src="images/earth.svg" style={{ width: '60%' }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0.3}
          style={{
            backgroundSize: '80%',
            backgroundPosition: 'center',
            backgroundImage: `url("images/clients.svg")`,
            backgroundColor:'grenn'

          }}
        />

        <ParallaxLayer
          offset={0}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            
          }}>
          {/* <img src="images/server.svg" style={{ width: '20%' }} /> */}
          <div className="text-gray-50  text-center text-xl ">
            <h1 className=''>Pyrenees.io</h1>
            <div >
            <Typed className='text-sm' loop strings={textLines} typeSpeed={50} />
          
            </div>
          
          {/* <p className='capitalize'>student,developer</p> */}
          <a href="https://www.instagram.com/ishan_nandwal/" title="Instagram"> <i className="fa fa-instagram"></i> </a>
          <a href="https://github.com/ishannandwal7" title="github"> <i className="fa fa-github"></i> </a>
          <a href="https://www.linkedin.com/in/ishan-nandwal-a314011ba/" title="linkedin"> <i className="fa fa-linkedin"></i> </a>
          <a href="#" title="twitter"> <i className="fa fa-twitter"></i> </a>
          <a href="#" title="telegram"> <i className="fa fa-paper-plane"></i> </a>
          <a href="mailto:ishannandwal7@gmail.com" title="Email"> <i className="fa fa-envelope"></i></a>
      </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(2)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <img src="images/bash.svg" style={{ width: '40%' }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            
          }}
          onClick={() => parallax.current.scrollTo(0)}>
          <img src="images/clients-main.svg" style={{ width: '40%' }} />
        </ParallaxLayer>
      </Parallax>
    </div>

  )
}
