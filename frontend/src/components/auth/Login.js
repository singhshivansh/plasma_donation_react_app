import React, {useState} from 'react';
import Navbar from '../Navbar';
import { FormControl, TextField, Button } from '@material-ui/core';

const Login = () => {
    
    const [credential, setCredential] = useState(
        {username : "", password : ""}
    )

    

    return (
        <div>
            <Navbar />
            <div className="container my-5" >
                <div>
                    <h2>Login Form</h2>
                </div>
               <div className="container col-4">
                <form noValidate autoComplete="off">
                        <TextField className="col-12 my-3" value={credential.username}  name="username" id="username" label="Username" />
                        <TextField className="col-12 my-3" value={credential.password}  name="password" type="password" id="password" label="Password" />
                        <Button variant="contained" color="primary">
                        Submit
                        </Button>
                    </form>
                </div>
            </div>
           

        </div>
    )
}

export default Login;
