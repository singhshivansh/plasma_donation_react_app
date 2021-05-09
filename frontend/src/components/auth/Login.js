import React from 'react';
import Navbar from '../Navbar';

const Login = () => {
    function formSubmit(){
        
    }

    return (
        <div>
            <Navbar/>
            <form action="" onSubmit="return formSubmit()">
                <input type="text" placeholder="Enter Username"/>
                <input type="password" placeholder="Enter Password"/>
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}

export default Login;
