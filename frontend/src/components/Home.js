import React, {useState, useEffect} from 'react';
import MyModal from './Modal';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import Autocomplete from './Autocomplete';
import MainCard from './MainCard';


var states = [];
var cities = [];

const Home = () => {

    //Declaring useStates for searching
    const [searchText, setsearchText] = useState('');
    const [searchResult, setsearchResult] = useState([]);
    const [inData, setinData] = useState({
        total_confirmed:'', total_recovered:'', total_deaths:'', last_updated:'', daily_confirmed : '', daily_recovered : '', daily_deaths : '',
    });
    const[incrementedData, setincrementedData] = useState({
        total_confirmed:'', total_recovered:'', total_deaths : '', daily_confirmed : '', daily_recovered : '' , daily_deaths : ''
    })

    
    
    const get_covid_data_statewise = ()=> {     //API for covid case - Statewise
        axios({
            url : 'https://api.covid19india.org/data.json',
            type : 'GET'
        })
        .then((data)=>{
            var state_list = data.data.statewise;
            for(var i=1; i<data.data.statewise.length; i++){
    
                states.push(`${state_list[i].state}, ${state_list[i].statecode}`);
            }
            const in_data = data.data.statewise[0];
            const today_stat = data.data.cases_time_series[data.data.cases_time_series.length-1];
            const yest_stat = data.data.cases_time_series[data.data.cases_time_series.length-2];

            // console.log(today_stat, yest_stat);
            setinData({
                    total_confirmed : today_stat.totalconfirmed,    //setting the daily COVID Cases
                    total_recovered : today_stat.totalrecovered, total_deaths: today_stat.totaldeceased,
                    last_updated    : `${today_stat.date}, ${in_data.lastupdatedtime.split(' ')[1]}`,
                    daily_confirmed : today_stat.dailyconfirmed,
                    daily_recovered : today_stat.dailyrecovered,
                    daily_deaths    : today_stat.dailydeceased,
                });
            
            setincrementedData({
                total_confirmed : today_stat.totalconfirmed - yest_stat.totalconfirmed,
                total_recovered : today_stat.totalrecovered - yest_stat.totalrecovered,
                total_deaths    : today_stat.totaldeceased - yest_stat.totaldeceased,

                daily_confirmed : today_stat.dailyconfirmed - yest_stat.dailyconfirmed,
                daily_recovered : today_stat.dailyrecovered - yest_stat.dailyrecovered,
                daily_deaths    : today_stat.dailydeceased - yest_stat.dailydeceased,
            })
            console.log(data.data);
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
        })
        .catch(error=>console.log(error));
    }
    
  

    useEffect(()=>{
        get_covid_data_statewise();
        get_covid_data_citywise();
        console.log(incrementedData);
    }, [])
    
   

    const select_change = (e) => {
        const select = document.getElementById("select");
        const sel_value = select.value;
        const search_target = document.getElementById("search");

        if(sel_value == 'state'){
            search_target.placeholder = "Search State";
            setsearchResult(states);
        }
        else if(sel_value == 'city'){
            search_target.placeholder = "Search City";
            setsearchResult(cities);
        }
        else{
            search_target.placeholder = "Please Select first!";
            setsearchResult([]);
        }
    }

    const changeHandler = (e) => {

        setsearchText(e.target.value);
        console.log(searchText);

        setsearchResult(states.filter(obj => obj.includes(searchText)));


        console.log(searchResult);
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
                    <input type="text" onChange={changeHandler} value={searchText}
                        className="rounded-l-full w-full px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Search" />
                        <div>
                            <button className="bg-indigo-600 text-white rounded-full p-2" ><i><SearchIcon/></i></button>
                        </div>
                    </div>
                </div>

                <div className="container bg-gray-100 h-screen mt-3 lg:flex-wrap md:flex-wrap-reverse rounded-xl opacity-90">
                    <div className="w-full lg:flex lg:flex-wrap lg:justify-around md:flex-wrap-reverse">
                        <div className="lg:w-3/12 md:w-3/5 grid place-content-center mt-4 mx-2 bg-indigo-500 h-24 transform hover:scale-105 rounded-md shadow-2xl flex-3">
                            <h5 className="font-semibold text-3xl text-white">India</h5>
                            <h5 className="text-gray-200"><span className="text-gray-800 font-semibold text-lg">Last Updated :</span> {inData.last_updated}</h5>
                        </div>
                        
                        <MainCard heading={'Total Cases'} positive={false} total_value={inData.total_confirmed} difference_value={incrementedData.total_confirmed}/>

                        <MainCard heading={'Total Recovered'} positive={true} total_value={inData.total_recovered} difference_value={incrementedData.total_recovered}/>
                        
                        <MainCard heading={'Total Deaths'} positive={false} total_value={inData.total_deaths} difference_value={incrementedData.total_deaths}/>
                        
                        <MainCard heading={'Daily Cases'} positive={false} total_value={inData.daily_confirmed} difference_value={incrementedData.daily_confirmed}/>
                        
                        <MainCard heading={'Daily Recovered'} positive={true} total_value={inData.daily_recovered} difference_value={incrementedData.daily_recovered}/>
                        
                    </div>
                    
                    <div className="w-full lg:flex lg:flex-wrap lg:justify-around md:flex-wrap-reverse">
                        <div className="lg:w-3/12 md:w-3/5 grid place-content-center mt-4 mx-2 bg-green-500 h-24 transform hover:scale-105 rounded-md shadow-2xl flex-3">
                            <h5 className="font-semibold text-3xl text-white">Vaccination Stats</h5>
                            <h5 className="text-gray-200"><span className="text-gray-800 font-semibold text-lg">Last Updated :</span> {inData.last_updated}</h5>
                        </div>
                        
                        <MainCard heading={'Total Cases'} positive={false} total_value={inData.total_confirmed} difference_value={incrementedData.total_confirmed}/>

                        <MainCard heading={'Total Recovered'} positive={true} total_value={inData.total_recovered} difference_value={incrementedData.total_recovered}/>
                        
                        <MainCard heading={'Total Deaths'} positive={false} total_value={inData.total_deaths} difference_value={incrementedData.total_deaths}/>
                        
                        <MainCard heading={'Daily Cases'} positive={false} total_value={inData.daily_confirmed} difference_value={incrementedData.daily_confirmed}/>
                        
                        <MainCard heading={'Daily Recovered'} positive={true} total_value={inData.daily_recovered} difference_value={incrementedData.daily_recovered}/>
                        
                    </div>
                    <div className="w-full lg:flex lg:flex-wrap lg:justify-around md:flex-wrap-reverse">
                        <div className="lg:w-3/12 md:w-3/5 grid place-content-center mt-4 mx-2 bg-green-500 h-24 transform hover:scale-105 rounded-md shadow-2xl flex-3">
                            <h5 className="font-semibold text-3xl text-white">Vaccination Stats</h5>
                            <h5 className="text-gray-200"><span className="text-gray-800 font-semibold text-lg">Last Updated :</span> {inData.last_updated}</h5>
                        </div>
                        
                        <MainCard heading={'Total Cases'} positive={false} total_value={inData.total_confirmed} difference_value={incrementedData.total_confirmed}/>

                        <MainCard heading={'Total Recovered'} positive={true} total_value={inData.total_recovered} difference_value={incrementedData.total_recovered}/>
                        
                        <MainCard heading={'Total Deaths'} positive={false} total_value={inData.total_deaths} difference_value={incrementedData.total_deaths}/>
                        
                        <MainCard heading={'Daily Cases'} positive={false} total_value={inData.daily_confirmed} difference_value={incrementedData.daily_confirmed}/>
                        
                        <MainCard heading={'Daily Recovered'} positive={true} total_value={inData.daily_recovered} difference_value={incrementedData.daily_recovered}/>
                        
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

{/* <div class="w-full md:w-1/4 px-2 flex-1 my-2">
    <div class="rounded-lg shadow-sm mb-4">
        <div class="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
            <div class="px-3 pt-8 pb-10 text-center relative z-10">
                <h4 class="text-sm uppercase text-gray-500 leading-tight">Daily Recovered</h4>
                <h3 class="text-3xl text-gray-700 font-semibold leading-tight my-3">{inData.daily_recovered}</h3>
                <Check_value_rev value={incrementedData.daily_recovered} />

            </div>
            <div class="absolute bottom-0 inset-x-0">
                <canvas id="chart2" height="70"></canvas>
            </div>
        </div>
    </div>
</div> */}