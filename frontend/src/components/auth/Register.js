import React from 'react';
import Navbar from '../Navbar';

function Register() {
    return (
        <div>
            <Navbar />
            <div className="container my-5">
                <input type="text" className="form-control col-5" placeholder="Enter First Name" />
                <input type="text" className="form-control col-5" placeholder="Enter email" />
                <input type="text" className="form-control col-5" placeholder="Enter First Name" />
                <input type="text" className="form-control col-5" placeholder="Enter Last Name" />
                <input type="password" className="form-control col-5" placeholder="Enter Password" />
                <button type="submit" className="btn btn-success my-2">Submit</button>
            </div>
        </div>
    )
}

export default Register
