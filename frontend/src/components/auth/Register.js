import React, { useState } from 'react';
import axios from 'axios';
import { FormControl, TextField, Button } from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom';


function Register() {

    const [credential, setCredential] = useState(
        {username: "", email:"", password:"", first_name:"", last_name:""}
    )

    const history = useHistory();

    const submitForm = (e) =>{
        e.preventDefault();

        axios.post(`http://127.0.0.1:8000/users/`, credential
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
    }

    return (
        <div>
            <div className="login_page overflow-y-hidden pt-5 bg-fixed h-screen bg-gray-100 flex justify-between">
                <div className="container h-5/6 bg-white rounded-xl shadow-lg lg:w-2/5 my-2">
                    <div>
                        <h3 className="text-3xl font-semibold my-3">Create your Account</h3>
                    </div>
                    <div className="flex justify-center">
                        <form noValidate autoComplete="off" className="w-3/4">
                        
                            <TextField name="username" value={credential.username} onChange={inputHandler}  label="Username" className=" col-lg-10 my-2 " id="username" placeholder="Enter Username" />
                            <TextField name="email" value={credential.email} onChange={inputHandler} label="Email" className="col-lg-10 my-2 " placeholder="Enter email" />
                            <TextField name="first_name" value={credential.first_name} onChange={inputHandler} label="First Name" className="col-lg-10 my-2 " placeholder="Enter First Name" />
                            <TextField name="last_name" value={credential.last_name} onChange={inputHandler} label="Last Name" className="col-lg-10 my-2 " placeholder="Enter Last Name" />
                            <TextField type="password" name="password" value={credential.password} onChange={inputHandler} label="Password" className="col-lg-10 my-2 " placeholder="Enter Password" />
                            <button className="bg-indigo-600 text-white px-3 py-2 rounded-md mt-2" onClick={submitForm}>Sign Up</button>
                        </form>
                    </div>
                    <div className="mt-2">
                        <Link to='/login' className="hover:no-underline">Already Have an account?</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
