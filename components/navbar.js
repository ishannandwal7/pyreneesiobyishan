import Link from "next/link"
import { useState,useEffect } from "react";
import Head from "next/head"
import Typed from "react-typed";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useRouter } from "next/dist/client/router";



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Navbar() {
  const [user, setuser] = useState(false);
  const [chk, setchk] = useState({ name: 'SignUp/Login', href: '/signup', current: false });
  // const router=useRouter();
  useEffect(() => {
  if(localStorage.getItem("token")){
    setuser(true);
    setchk({ name: 'Logout', href: '/logout', current: false })
  }
  }, []);
  function profile() {
    location.replace("/profile")
  }
  let navigation = [
    { name: 'Dashboard', href: '/', current: true },
    chk,
    // { name: 'Projects', href: '#', current: false },
    { name: 'About', href: 'https://ishannandwal7.github.io/novelcoronalive.github.io/about.html', current: false },
  ]
  function  logout() {
    let x=localStorage.removeItem("token");
    x?console.log("logged out successful"):console.log("failed to logout")
    
  }
return(
  <Disclosure as="nav" className="bg-gray-800">
  {({ open }) => (
    <>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              {open ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </Disclosure.Button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
              <h2 className="text-gray-50">Pyrenees.io</h2>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'px-3 py-2 rounded-md text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="ml-3 relative">
              <div>
                <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full" onClick={profile}
                    src="/images/usericon.png"
                    
                    alt=""
                  />
                </Menu.Button>
              </div>
              
            </Menu>
          </div>
        </div>
      </div>

      <Disclosure.Panel className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block px-3 py-2 rounded-md text-base font-medium'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </Disclosure.Panel>
    </>
  )}
</Disclosure>

//     <>
//     <Head>
//       <link rel="stylesheet" href="navbar.css" />
//       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
//       {/* <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script> */}

//     </Head>
//     <div className="capatilize navbar bg-gray-800 text-gray-300 px-5 ">
      
//     <Typed className='text-md mx-3 italic '
//                     strings={['  Pyrenees']}
//                     typeSpeed={50}
//                 />

//     <ul  className=" nav capitalize " >
//       <li >

//       <Link  className="nav-item" href="/">home</Link>
//       </li>
//      {
//        user?  <li onClick={logout}>

//        <Link  className="nav-item" href="/" >logout</Link>
//        </li>:  <li>

// <Link  className="nav-item" href="/signup">sign-up/login</Link>
// </li>


//      }
       
    
//       <li>

//       <Link  className="nav-item" href="/about">Developer</Link>
//       </li>

//     </ul>
//     </div>
//     </>
  )
}