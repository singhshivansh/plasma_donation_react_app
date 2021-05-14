import React, {useEffect} from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';

export const Main = () => {
    const location = useLocation();

    // console.log(document.cookie);
    var token = localStorage.getItem('token');
    // console.log(token);

    const getDonors = () => {
        axios({
            method : "GET",
            url : 'http://127.0.0.1:8000/donors/',
            headers : {
                Authorization : `Token ${token}`
            }
        })
        .then((data)=>{
            console.log(data.data);
        })
        .catch(error => console.log(error.response.data))
    }

    useEffect(()=>{
        getDonors();
    })

    return (
        <div className="bg-green-600">
            <h1>This is Main Page</h1>
        </div>
    )
};

export default Main;
