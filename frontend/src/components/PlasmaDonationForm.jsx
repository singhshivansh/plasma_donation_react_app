import React, { useState } from 'react';
import {motion} from 'framer-motion';
import { states } from '../data/states';
import axios from 'axios';
import { useHistory } from 'react-router';

const top_motion = {
    hidden : {y : -200, opacity : 0, scale : 0},
    visible : {y : 0, opacity : 1, scale : 1}
}

const size_motion = {
    hidden : {scale : 0},
    visible : {scale : 1}
}

const PlasmaDonationForm = () => {
    const[credential, setCredential] = useState({
        first_name : "", last_name : "", mobile : "", blood_group : "", email : "", age: "", gender : "",
        weight: "", height : "", city : "", state : ""
    })

    const history = useHistory();

    const inputHandler = (e) => {
        setCredential({...credential,[e.target.name] : e.target.value});    //setting the state value using spread operator
    }

    const submitHandler = e =>{
        e.preventDefault();
        console.log(credential);

        axios.post('http://127.0.0.1:8000/add_donor/', credential)
        .then((data)=>{
            console.log(data.data);
            if(data.data.status == "success"){
                history.push({pathname: `/donor_info/${data.data.donor_id}`})
                // window.location.href = '/donor_info/{}'
            }
        })
        .catch(data=>console.log(data))
    }

    return (
        <div className="bg-gray-200 h-full pb-5 login_page">
            <motion.div initial="hidden" animate="visible" variants={top_motion}>
                <h5 className="text-3xl py-4 text-blue-600 font-semibold">Convalescent Plasma COVID-19 Donor Request Form</h5>
            </motion.div>

            <form action="">
                <motion.div initial="hidden" animate="visible" variants={size_motion} 
                className="container bg-white justify-around shadow-2xl rounded-xl w-3/4 py-3">
                    <div className="flex justify-around py-2">
                        <div className="w-1/3">
                            <label className="w-full text-gray-500 text-md font-semibold flex justify-start">First Name</label>
                            <input  className="bg-gray-200 rounded-md focus:outline-none focus:ring-2 border-1 w-full focus:bg-white focus:ring-indigo-500"
                                type="text" placeholder="Enter First Name" name="first_name" onChange={inputHandler} value={credential.first_name} />
                        </div>
                        <div className="w-1/3 ml-2">
                            <label className="w-full text-gray-500 text-md font-semibold flex justify-start">Last Name</label>
                            <input  className="bg-gray-200 rounded-md focus:outline-none focus:ring-2 border-1 w-full focus:bg-white focus:ring-indigo-500"
                                type="text" placeholder="Enter Last Name" name="last_name" onChange={inputHandler} value={credential.last_name} />                                
                        </div>
                    </div>
                    <div className="flex justify-around py-2">
                        <div className="w-1/3">
                            <label className="w-full text-gray-500 text-md font-semibold flex justify-start">Mobile</label>
                            <input  className="bg-gray-200 rounded-md focus:outline-none focus:ring-2 border-1 w-full focus:bg-white focus:ring-indigo-500"
                                type="number" placeholder="Enter Mobile" name="mobile" onChange={inputHandler} value={credential.mobile} />
                        </div>
                        <div className="w-1/3 ml-2">
                            <label className="flex justify-start text-md font-semibold text-gray-500">Blood Group</label>
                            <select className="bg-gray-200 rounded-md focus:outline-none focus:ring-2 border-1 w-full focus:bg-white focus:ring-indigo-500 py-2 text-gray-400"
                                name="blood_group" onChange={inputHandler} value={credential.blood_group}  >
                                <option value="" selected>Select</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>                      
                        </div>
                    </div>
                    <div className=" py-2  flex justify-center">
                        <div className="w-5/6">
                            <label className="w-full text-gray-500 text-md font-semibold flex justify-start" htmlFor="">Email</label>
                            <input  className="bg-gray-200 rounded-md focus:outline-none focus:ring-2 border-1 w-full focus:bg-white focus:ring-indigo-500"
                                type="text" placeholder="Enter Email" name="email" onChange={inputHandler} value={credential.email} />
                        </div>
                    </div>

                    <div className="flex justify-around py-2">
                        <div className="w-1/3">
                            <label className="w-full text-gray-500 text-md font-semibold flex justify-start">Age</label>
                            <input  className="bg-gray-200 rounded-md focus:outline-none focus:ring-2 border-1 w-full focus:bg-white focus:ring-indigo-500"
                                type="text" placeholder="Enter Age" name="age" onChange={inputHandler} value={credential.age} />
                        </div>
                        <div className="w-1/3 ml-2">
                            <label className="flex justify-start text-md font-semibold text-gray-500">Gender</label>
                            <select className="bg-gray-200 rounded-md focus:outline-none focus:ring-2 border-1 w-full focus:bg-white focus:ring-indigo-500 py-2 text-gray-400"
                                name="gender" onChange={inputHandler} value={credential.gender} >
                                <option value="" selected>Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="third">Third Gender</option>
                            </select>                      
                        </div>
                    </div>
                    <div className="flex justify-around py-2">
                        <div className="w-1/3">
                            <label className="w-full text-gray-500 text-md font-semibold flex justify-start">Weight</label>
                            <input  className="bg-gray-200 rounded-md focus:outline-none focus:ring-2 border-1 w-full focus:bg-white focus:ring-indigo-500"
                                type="text" placeholder="Enter Weight" name="weight" onChange={inputHandler} value={credential.weight}  />
                        </div>
                        <div className="w-1/3">
                            <label className="w-full text-gray-500 text-md font-semibold flex justify-start">Height</label>
                            <input  className="bg-gray-200 rounded-md focus:outline-none focus:ring-2 border-1 w-full focus:bg-white focus:ring-indigo-500"
                                type="text" placeholder="Enter Height" name="height" onChange={inputHandler} value={credential.height} />
                        </div>
                    </div>
                    <div className="flex justify-around py-2">
                        <div className="w-1/3">
                            <label className="w-full text-gray-500 text-md font-semibold flex justify-start">City</label>
                            <input  className="bg-gray-200 rounded-md focus:outline-none focus:ring-2 border-1 w-full focus:bg-white focus:ring-indigo-500"
                                type="text" placeholder="Enter City" name="city" onChange={inputHandler} value={credential.city}  />
                        </div>
                        <div className="w-1/3 ml-2">
                            <label className="flex justify-start text-md font-semibold text-gray-500">State</label>
                            <select className="bg-gray-200 rounded-md focus:outline-none focus:ring-2 border-1 w-full focus:bg-white focus:ring-indigo-500 py-2 text-gray-400"
                                name="state" onChange={inputHandler} value={credential.state} >
                                <option value="" disabled selected>Select</option>
                            {
                                states.map(function(state) {
                                    return(
                                        <option value={state}>{state}</option>
                                    )
                                })
                            }
                            </select>                      
                        </div>
                    </div>
                    <button onClick={submitHandler} className="px-3 py-2 bg-indigo-600 mb-3 text-white rounded-lg hover:bg-indigo-800">Submit</button>
                </motion.div>
            </form>
        </div>
    )
}

export default PlasmaDonationForm
