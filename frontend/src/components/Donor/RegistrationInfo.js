import React, { useState } from 'react'
import axios from 'axios';

export const RegistrationInfo = () => {

    const [plasmaBank, setPlasmaBank] = useState('');

    let donor_id = window.location.href.split('/');
    donor_id = donor_id[donor_id.length-1];
    const base_url = "http://127.0.0.1:8000/"
    axios.get(base_url + `get_plasma_bank/${donor_id}`)
    .then(function(data){
        console.log(data.data.status);
        setPlasmaBank(data.data.status);
    }).catch((error)=>{
        console.log(error);
    })


    //calling api for getting the cities

    return (
        <div>
            <h5>Your ID number : {donor_id}  </h5>        
            <h4>These are the Hospitals where you can Visit : </h4>
            <p>{plasmaBank}</p>
        </div>
    )
}
