import React, { useState } from 'react';
import axios from 'axios';
import { FormControl, TextField, Button } from '@material-ui/core';


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
            <div className="container my-5" >
                <div>
                    <h3>Register Form</h3>
                </div>
               <div className="container col-5">
               <form noValidate autoComplete="off">
                   
                    <TextField name="username" value={credential.username} onChange={inputHandler}  label="Username" className="form-control  my-3 " id="username" placeholder="Enter Username" />
                    <TextField name="email" value={credential.email} onChange={inputHandler} label="Email" className="form-control my-3 " placeholder="Enter email" />
                    <TextField name="first_name" value={credential.first_name} onChange={inputHandler} label="First Name" className="form-control my-3 " placeholder="Enter First Name" />
                    <TextField name="last_name" value={credential.last_name} onChange={inputHandler} label="Last Name" className="form-control my-3 " placeholder="Enter Last Name" />
                    <TextField type="password" name="password" value={credential.password} onChange={inputHandler} label="Password" className="form-control my-3 " placeholder="Enter Password" />
                    <Button variant="contained" className="my-3" onClick={submitForm} color="primary">
                        Submit
                    </Button>
                </form>
               </div>
            </div>
        </>
    )
}

export default Register
