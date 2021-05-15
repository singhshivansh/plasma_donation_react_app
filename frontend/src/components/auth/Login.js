import React, {useState, useContext} from 'react';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
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

        setCredential({...credential,[target_name] : target_value});

    }

    const SendLogin = (e)=>{
        e.preventDefault();
        axios.post(
            'http://127.0.0.1:8000/auth/',
            credential
        )
        .then(res => {
            // console.log(res.data.token);
            setToken(res.data.token);
            localStorage.setItem('token', res.data.token);  //saving token
            console.log(res.data.token);
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
            <div className="login_page overflow-y-hidden bg-fixed h-screen bg-gray-100 flex justify-between">
                <div className="container lg:w-1/3">
                    <div className="rounded-xl shadow-lg bg-white py-5 mt-5">
                        <div>
                            <h2 className="text-3xl font-semibold">Login</h2>
                        </div>
                        <div className="container w-80 ">
                            <form noValidate autoComplete="off">
                                <TextField className="col-lg-12 col-sm-9 my-3" value={credential.username} onChange={inputHandler} name="username" id="username" label="Username" />
                                <TextField className="col-lg-12 col-sm-9 my-3" value={credential.password} onChange={inputHandler} name="password" type="password" id="password" label="Password" />
                                <button className="bg-indigo-600 hover:bg-indigo-800 px-4 mt-2 py-2  text-white font-medium text-sm rounded-md" onClick={SendLogin}>Sign In</button>
                            </form>
                        </div>
                        <div className="pt-3">
                            <Link className="text-md hover:no-underline font-medium" to='/register'>Dont Have an Account? Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
