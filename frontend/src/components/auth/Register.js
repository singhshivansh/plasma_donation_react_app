import React, { useState } from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import {motion} from 'framer-motion';


const motion_right = {
    hidden : {
        x : -200,
        opacity : 0, scale : 0
    },
    visible : {
        x : 0, opacity : 1, scale : 1
    }
}
const motion_left = {
    hidden : {
        y : 600,
        opacity : 0, scale : 0
    },
    visible : {
        y : 0, opacity : 1, scale : 1
    }
}
const motion_vis = {
    hidden : {
        opacity : 0, scale : 0
    },
    visible : {
        opacity : 1, scale : 1
    }
}
function Register() {

    const [credential, setCredential] = useState(
        {reg_no: "", email:"", name : "", password_1:"", password_2 : "", state : "", city:"", registering_to:""}
    )

    const history = useHistory();

    const submitForm = (e) =>{
        e.preventDefault();

        axios.post(`http://127.0.0.1:8000/register/`, credential
        )
        .then((res)=> {
            console.log(res.data);
            alert("You Got Registered Successfully!")
            // setCredential({use})
            history.push('/login');
        })
        .catch((error) => {
            console.log(error.response.data);
            alert(error.response.data['username']);
        })
    }

    const inputHandler = e =>{

        var target_name = e.target.name;
        var target_value = e.target.value;

        setCredential({...credential,[target_name] : target_value});
        console.log(credential);
    }

    return (
        <div>
            <div className="login_page overflow-y-hidden pt-5 bg-fixed h-screen bg-gray-100 flex justify-between py-2">
                <div className="container bg-white rounded-xl shadow-lg h-full lg:w-3/6 mb-3">
                    <motion.div initial="hidden" animate="visible" variants={motion_right}>
                        <h3 className="text-3xl font-semibold my-3">Create your Account</h3>
                    </motion.div>
                    <motion.div className="flex justify-center" initial="hidden" animate="visible" variants={motion_vis}>
                        <form noValidate autoComplete="off" className="w-5/6">
                            <div className=" py-2">
                                <label className="w-full text-gray-500 text-md font-semibold flex justify-start" htmlFor="">Registration Number</label>
                                <input  className="bg-gray-200 rounded-md focus:outline-none focus:ring-2 border-1 w-full focus:bg-white focus:ring-indigo-500"
                                    type="text" placeholder="Registration Number" onChange={inputHandler} value={credential.reg_no} name="reg_no"/>
                            </div>

                            <div className="flex justify-between py-2">
                                <div className="w-1/2">
                                    <label className="w-full text-gray-500 text-md font-semibold flex justify-start">Email</label>
                                    <input  className="bg-gray-200 rounded-md focus:outline-none focus:ring-2 border-1 w-full focus:bg-white focus:ring-indigo-500"
                                        type="text" placeholder="Enter Email" name="email" onChange={inputHandler} value={credential.email} />
                                </div>
                                <div className="w-1/2 ml-2">
                                    <label className="w-full text-gray-500 text-md font-semibold flex justify-start">Name</label>
                                    <input  className="bg-gray-200 rounded-md focus:outline-none focus:ring-2 border-1 w-full focus:bg-white focus:ring-indigo-500"
                                        type="text" placeholder="Enter Name" name="name" onChange={inputHandler} value={credential.name} />                                
                                </div>
                            </div>
                            <div className="flex justify-between py-2 ">
                                    <div className="w-6/12">
                                        <label className="flex justify-start text-md font-semibold text-gray-500">States</label>
                                        <select className="bg-gray-200 rounded-md focus:outline-none focus:ring-2 border-1 w-full focus:bg-white focus:ring-indigo-500 py-2 text-gray-400"
                                            name="state" id="state" onChange={inputHandler} value={credential.state}>
                                            <option value="" selected>Select State</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                        </select>
                                    </div>

                                    <div className="w-6/12 ml-1">
                                        <label className="flex justify-start text-md font-semibold text-gray-500">City</label>
                                        <input  className="bg-gray-200 rounded-md focus:outline-none focus:ring-2 border-1 w-full px-2 focus:bg-white focus:ring-indigo-500"
                                        type="text" placeholder="Enter City" name="city" onChange={inputHandler} value={credential.city} />
                                    </div>
                            </div>
                            <div className="flex justify-center py-2">
                                <div className="w-full">
                                    <label className="flex justify-start text-md font-semibold text-gray-500">Registering For</label>
                                    <select className="bg-gray-200 rounded-md focus:outline-none focus:ring-2 border-1 w-full focus:bg-white focus:ring-indigo-500 py-2 text-gray-400"
                                        name="registering_to" onChange={inputHandler} value={credential.registering_to} >
                                        <option value="" selected>Select</option>
                                        <option value="plasma_bank">Plasma Bank</option>
                                        <option value="hospital">Hospital</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-between py-2 ">
                                    <div className="w-6/12">
                                        <label className="flex justify-start font-semibold text-gray-500">Password</label>
                                        <input  className="bg-gray-200 w-full rounded-md focus:outline-none focus:ring-2 border-1 px-2 focus:bg-white focus:ring-indigo-500"
                                            type="text" placeholder="Enter Password" type="password" name="password_1"
                                            onChange={inputHandler} value={credential.password}    />
                                    </div>

                                    <div className="w-6/12 ml-1">
                                        <label  className="flex justify-start font-semibold text-gray-500">Confirm Password</label>
                                        <input  className="bg-gray-200 rounded-md focus:outline-none focus:ring-2 border-1 w-full px-2 focus:bg-white focus:ring-indigo-500"
                                            type="text" placeholder="Re-Enter Password" type="password" name="password_2"
                                            onChange={inputHandler} value={credential.password1}    />
                                    </div>
                            </div>
                            {/* <TextField name="email" value={credential.email} onChange={inputHandler} label="Email" className="col-lg-10 my-2 " placeholder="Enter email" />
                            <TextField name="first_name" value={credential.first_name} onChange={inputHandler} label="First Name" className="col-lg-10 my-2 " placeholder="Enter First Name" />
                            <TextField name="last_name" value={credential.last_name} onChange={inputHandler} label="Last Name" className="col-lg-10 my-2 " placeholder="Enter Last Name" />
                            <TextField type="password" name="password" value={credential.password} onChange={inputHandler} label="Password" className="col-lg-10 my-2 " placeholder="Enter Password" /> */}
                            <button className="bg-indigo-600 text-white px-3 py-2 rounded-md mt-2" onClick={submitForm}>Sign Up</button>
                        </form>
                    </motion.div>
                    <div className="mt-2">
                        <Link to='/login' className="hover:no-underline">Already Have an account?</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
