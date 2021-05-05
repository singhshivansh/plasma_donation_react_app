import React, {useEffect} from 'react';
import Navbar from './Navbar';
import axios from 'axios';

export const Main = () => {

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/')
        .then((response)=>{
            console.log(response);
        })
        .catch((response)=>{
            console.log(response);
        })
    })

    return (
        <div>
            <Navbar/>
            <h1>This is Main Page</h1>
        </div>
    )
};

export default Main;
