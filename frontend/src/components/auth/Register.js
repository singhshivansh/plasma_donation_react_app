import React, { useState } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';

function Register() {

    const [credential, setCredential] = useState(
        {username: "", email:"", password:"", first_name:"", last_name:""}
    )

    const submitForm = (e) =>{
        e.preventDefault();

        axios.post(`http://127.0.0.1:8000/users/`, credential
        )
        .then((res)=> {
            console.log(res.data);
            alert("You Got Registered Successfully!")
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
        <>
            <Navbar />
            <div className="container my-5" >
                <div>
                    <h4>Register Form</h4>
                </div>
               <div className="container col-4">
                <div>
                <input type="text" name="username" value={credential.username} onChange={inputHandler} className="form-control  my-2 " placeholder="Enter Username" />
                </div>
                <input type="text" name="email" value={credential.email} onChange={inputHandler} className="form-control my-2 " placeholder="Enter email" />
                <input type="text" name="first_name" value={credential.first_name} onChange={inputHandler} className="form-control my-2 " placeholder="Enter First Name" />
                <input type="text" name="last_name" value={credential.last_name} onChange={inputHandler} className="form-control my-2 " placeholder="Enter Last Name" />
                <input type="password" name="password" value={credential.password} onChange={inputHandler} className="form-control my-2 " placeholder="Enter Password" />
                <button type="submit" onClick={submitForm} className="btn btn-success my-2">Submit</button>
               </div>
            </div>
        </>
    )
}

export default Register
