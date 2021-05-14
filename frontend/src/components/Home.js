import React, {useState, useEffect} from 'react';
import MyModal from './Modal';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';

const get_covid_data_statewise = ()=> {     //API for covid case - Statewise
    axios({
        url : 'https://api.covid19india.org/data.json',
        type : 'GET'
    })
    .then((data)=>{
        console.log(data.data);
    })
    .catch(error => console.log(error));
}

const get_covid_data_citywise = ()=>{       //API for covid case - Citywise
    axios({
        url : 'https://api.covid19india.org/v4/min/data.min.json',
        type : 'GET',
    })
    .then((data)=>{
        console.log(data.data);
    })
    .catch(error=>console.log(error));
}


const Home = () => {

    useEffect(()=>{
        get_covid_data_statewise();
        get_covid_data_citywise();
    }, [])
    

    return(
        <>
            <div className="h-screen login_page bg-blend-darken	">
                <div>
                    <h5 className="  font-semibold h-1/5 mt-2 container text-3xl"><span className="text-red-500">Live</span> COVID19 Tracker</h5>
                </div>
                <div className="container bg-gray-100 h-screen mt-3 lg:flex lg:flex-wrap lg:justify-around md:flex-wrap-reverse rounded-xl backdrop-filter backdrop-opacity-50">
                    <div className="lg:w-3/12 md:w-3/5 my-3 mx-2 h-2/5 bg-white rounded-xl shadow-2xl grid place-content-center">
                        <h5 className="fonf-semibold text-5xl tracking-wide ">INDIA</h5>
                    </div>
                    <div className="lg:w-3/12 md:w-3/5 my-3 mx-2 h-2/5 bg-white rounded-xl shadow-2xl grid place-content-center">
                        <h5 className="fonf-semibold text-5xl tracking-wide ">INDIA</h5>
                    </div>
                    <div className="lg:w-3/12 md:w-3/5 my-3 mx-2 h-2/5 bg-white rounded-xl shadow-2xl grid place-content-center">
                        <h5 className="fonf-semibold text-5xl tracking-wide ">INDIA</h5>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Home;


{/* <div className="flex bg-white py-2 px-2 lg:w-96 md:w-4/5  rounded-3xl">
    <input type="text" className="rounded-l-full w-full px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Search" />
    <div>
        <button className="bg-indigo-600 text-white rounded-full p-2"><i><SearchIcon/></i></button>
    </div>
</div> */}