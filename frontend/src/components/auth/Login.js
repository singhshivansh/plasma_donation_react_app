import React, {useState, useContext} from 'react';
import { FormControl, TextField, Button } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {UserContext} from '../../App';

const Login = () => {
    
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();

    const [credential, setCredential] = useState(
        {username : "", password : ""}
    )

    const [token, setToken] = useState('');


    const inputHandler = (e)=>{
        const target_name = e.target.name;
        const target_value = e.target.value;

        setCredential({...credential,[target_name] : target_value})
    }

    const SendLogin = ()=>{
        axios.post(
            'http://127.0.0.1:8000/auth/',
            credential
        )
        .then(res => {
            // console.log(res.data.token);
            setToken(res.data.token);
            localStorage.setItem('token', res.data.token);  //saving token
            dispatch({type:"USER", payload : true})         //setting state true 
            history.push({
                pathname : '/main',
            })
        })
        .catch(error => {
            console.log(error);
            alert(error);
        })
    }

    return (
        <div>
            <div className="container my-5" >
                <div>
                    <h2>Login Form</h2>
                </div>
                <div className="container col-4">
                    <form noValidate autoComplete="off">
                        <TextField className="col-12 my-3" value={credential.username} onChange={inputHandler} name="username" id="username" label="Username" />
                        <TextField className="col-12 my-3" value={credential.password} onChange={inputHandler} name="password" type="password" id="password" label="Password" />
                        <Button variant="contained" onClick={SendLogin} color="primary">
                        Submit
                        </Button>
                    </form>
                </div>
            </div>
           

        </div>
    )
}

export default Login;
