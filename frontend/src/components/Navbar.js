import React, { useState, useContext, useEffect } from "react";
import { Transition } from "@headlessui/react";
import {Link, useHistory} from 'react-router-dom';
import MyModal from "./Modal";
import {UserContext} from '../App';
import axios from "axios";


function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const {state, dispatch} = useContext(UserContext);
  const history = useHistory();

  const get_curr_user = () =>{
    const token = localStorage.getItem('token');
    axios({
      type : 'GET',
      url : 'http://127.0.0.1:8000/get_current_user/',
      headers : {
        Authorization : `Token ${token}`
      }
    })
    .then(success => {
      sessionStorage.setItem('user', JSON.stringify(success.data))
    })
    .catch(error => console.log(error))
  }

    console.log(localStorage.getItem('token'));
    if(localStorage.getItem('token')){
      dispatch({type:"USER", payload:true});
    }
    else{
      dispatch({type:"USER", payload:false});
    }

  const logout = ()=>{
    if(localStorage.getItem('token')){
      localStorage.removeItem('token');
      sessionStorage.removeItem('user');
      dispatch({type:"USER", payload:false});
      alert("Successfully Logout!");
      history.push('/main');
    }
  }
  const RenderMenu = () => {
    
    if(state){
      get_curr_user();
      var user_name = '';
      if(sessionStorage.getItem('user')){
        user_name = JSON.parse(sessionStorage.getItem('user')).first_name;
      }

      return(
        <div className="ml-10 flex items-baseline space-x-4">
          <h5 className="text-white capitalize">{user_name}</h5>
          <button onClick={logout}
          className="hover:no-underline bg-gray-100 text-black hover:bg-gray-300 hover:text-black px-3 py-1 rounded-md text-sm font-medium"
          >Logout</button>
        </div>
      )
    }
    else{
      return(
            <div className="ml-10 flex items-baseline space-x-4">
              <Link  className="hover:no-underline bg-green-600 text-gray-100 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium"
                      to = "/plasma_form" >Donate Plasma</Link>
              <Link 
                className="hover:no-underline bg-gray-100 text-black hover:bg-gray-300 hover:text-black px-3 py-1 rounded-md text-sm font-medium"
                to = '/login'>Login</Link>

              <Link className="hover:no-underline bg-gray-100 text-black hover:bg-gray-300 hover:text-black px-3 py-1 rounded-md text-sm font-medium"
                to = '/register'>Register</Link>
            </div>        
      )
    }
  }

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                <div className="flex-shrink-0">
                    <h5 className="text-white text-2xl">Plasma Donation System</h5>
                </div>
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      <Link 
                        className="hover:no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium"
                        to = '/'>Home</Link>

                      <Link className="hover:no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium"
                        to = '/main'>Main</Link>

                      <Link className="hover:no-underline text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium"
                        to = '/about'>About</Link>
                      
                    </div>
                </div>
            </div>
            <div className="hidden md:block">
              <RenderMenu/>

            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a
                  href="#"
                  className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </a>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Team
                </a>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Projects
                </a>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Calendar
                </a>

                
              </div>
            </div>
          )}
        </Transition>
      </nav>

      
    </div>
  );
}

export default Nav;