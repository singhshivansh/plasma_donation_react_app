import React, {useState, useEffect} from 'react';
import MyModal from './Modal';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import Autocomplete from './Autocomplete';


var states = [];
var cities = [];

var in_data;

const get_covid_data_statewise = ()=> {     //API for covid case - Statewise
    axios({
        url : 'https://api.covid19india.org/data.json',
        type : 'GET'
    })
    .then((data)=>{
        // console.log(data.data.statewise);
        var state_list = data.data.statewise;
        for(var i=1; i<data.data.statewise.length; i++){
            // console.log(state_list[i]);

            states.push(`${state_list[i].state}, ${state_list[i].statecode}`);
        }
        // console.log(data.data.statewise[0]);
        in_data = data.data.statewise[0];
        console.log(in_data.active);
    })
    .catch(error => console.log(error));
}


const get_covid_data_citywise = ()=>{       //API for covid case - Citywise
    axios({
        url : 'https://api.covid19india.org/state_district_wise.json',
        type : 'GET',
    })
    .then((data)=>{
        var city = data;
        for(var i in city.data){
            for(var j in data.data[i].districtData){
                if(!cities.includes(`"${j}"`) && j != 'Foreign Evacuees'){
                    cities.push(j);
                }
            }
                
        }
        console.log(cities);
    })
    .catch(error=>console.log(error));
}


const Home = () => {

    //Declaring useStates for searching
    const [searchText, setsearchText] = useState('');
    const [searchResult, setsearchResult] = useState([]);

    useEffect(()=>{
        get_covid_data_statewise();
        get_covid_data_citywise();
        
    }, [])
    
   

    const select_change = (e) => {
        const select = document.getElementById("select");
        const sel_value = select.value;
        const search_target = document.getElementById("search");

        if(sel_value == 'state'){
            search_target.placeholder = "Search State";
            setsearchResult(states);
            setsearchText('State');
        }
        else if(sel_value == 'city'){
            search_target.placeholder = "Search City";
            setsearchResult(cities);
            setsearchText('City');
        }
        else{
            search_target.placeholder = "Please Select first!";
            setsearchResult([]);
        }
    }


    

    return(
        <>
            <div className="h-screen login_page bg-blend-darken	">
                <div>
                    <h5 className="  font-semibold h-1/5 mt-2 container text-3xl text_shadow"><span className="text-red-500 ">Live</span> COVID19 Tracker</h5>
                </div>
                <div className="container justify-around flex py-2 my-2 bg-gray-200 rounded-lg">
                    <div className="flex bg-white  px-2  lg:w-96 md:w-4/5  rounded-xl
                    ">
                        <select className="rounded-l-full text-lg font-normal w-full px-6 text-gray-700  focus:outline-none"  onChange={select_change} id="select">
                            <option value="nil" selected>Check Stats by..</option>
                            <option value="state">State</option>
                            <option value="city">City</option>
                        </select>
                    </div>
                    <div className="flex bg-white py-1 px-2  lg:w-96 md:w-4/5  rounded-3xl">
                        <Autocomplete suggestions={searchResult} error={searchText} / >
                    </div>
                </div>

                <div className="container bg-gray-100 h-screen mt-3  lg:flex lg:flex-wrap lg:justify-around md:flex-wrap-reverse rounded-xl opacity-90">
                    <div className="lg:w-3/12 md:w-3/5 my-3 mx-2 h-1/5 bg-blue-500 transform hover:scale-105 rounded-md shadow-2xl flex-2 ">
                        <h5 className="font-semibold text-3xl text_shadow">India</h5>
                        <h4></h4>

                    </div>
                    <div className="lg:w-3/12 md:w-3/5 my-3 mx-2 h-2/5 bg-white rounded-xl shadow-2xl grid flex-1 place-content-center">
                        <h5 className="fonf-semibold text-5xl tracking-wide ">INDIA</h5>
                    </div>
                    <div className="lg:w-3/12 md:w-3/5 my-3 mx-2 h-2/5 bg-white rounded-xl shadow-2xl grid flex-1 place-content-center">
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