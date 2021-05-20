import React from 'react';
import { TextField, Select, MenuItem, InputLabel } from '@material-ui/core';


const PlasmaDonationForm = () => {
    return (
        <div className="bg-gray-200 h-screen">
            <div>
                <h5 className="text-3xl py-2 text-blue-600 font-semibold">Convalescent Plasma COVID-19 Donor Request Form</h5>
            </div>

            <div className="container bg-white justify-around shadow-lg rounded-lg">
                <div className=" flex justify-around py-3">
                    <TextField className="col-3" name="username" id="first_name" label="First Name" />
                    <TextField className="col-3" name="username" id="last_name" label="Last Name" />
                </div>
                <div className=" flex justify-around py-3">
                    <TextField className="col-3" name="username" id="first_name" label="First Name" />
                    <Select className="col-4"
                        labelId="blood_group"
                        id="demo-simple-select">
                        <MenuItem selected>Select a Group</MenuItem>
                        <MenuItem >A+</MenuItem>
                        <MenuItem >A-</MenuItem>
                        <MenuItem >B+</MenuItem>
                        <MenuItem >B-</MenuItem>
                        <MenuItem >O+</MenuItem>
                        <MenuItem >O-</MenuItem>
                        <MenuItem >AB+</MenuItem>
                        <MenuItem >AB-</MenuItem>
                    </Select>
                </div>
                <div className=" flex justify-around py-3">
                    <TextField className="col-3" name="email" id="email" label="Email" />
                    <TextField className="col-3" name="age" id="age" label="Age" />
                    <Select className="col-4"
                        labelId="gender"
                        id="gender">
                        <MenuItem >Male</MenuItem>
                        <MenuItem >Female</MenuItem>
                        <MenuItem >Third Gender</MenuItem>
                    </Select>
                </div>
                <div className=" flex justify-around py-3">
                    <TextField className="col-3" name="weight" id="weight" label="Weight" />
                    <TextField className="col-3" name="height" id="height" label="Height" />
                </div>
                <div className=" flex justify-around py-3">
                    <TextField className="col-3" name="city" id="city" label="City" />
                    <TextField className="col-3" name="state" id="state" label="State" />
                </div>
                <div>
                    <TextField className="col-3" name="state" id="state" label="State" />
                </div>
            </div>
        </div>
    )
}

export default PlasmaDonationForm
