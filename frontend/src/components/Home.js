import React, {useState, useEffect} from 'react';
import MyModal from './Modal';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import Autocomplete from './Autocomplete';
import MainCard from './MainCard';
import SubCard from './SubCard';


var states = [];
var cities = [];

const Home = () => {

    //Declaring useStates
    const [searchText, setsearchText] = useState('');
    const [searchResult, setsearchResult] = useState([]);
    const [showSuggestion, setshowSuggestion] = useState(false);
    const [inData, setinData] = useState({
        total_confirmed:'', total_recovered:'', total_deaths:'', last_updated:'', daily_confirmed : '', daily_recovered : '', daily_deaths : '',
    });
    const[incrementedData, setincrementedData] = useState({
        total_confirmed:'', total_recovered:'', total_deaths : '', daily_confirmed : '', daily_recovered : '' , daily_deaths : ''
    });
    const [searchedResult, setsearchedResult] = useState({
        total_confirmed: '', total_death : '', total_recovered:'', total_vaccinated:'',
        past_7_confirmed: '', past_7_death : '', past_7_recovered:'', past_7_vaccinated:'',
        past_1_confirmed: '', past_1_death : '', past_1_recovered:'', past_1_vaccinated:'',
        place:''
    });
    const [incData, setIncData] = useState({
        total_confirmed: '', total_death : '', total_recovered:'', total_vaccinated:'',
        past_7_confirmed: '', past_7_death : '', past_7_recovered:'', past_7_vaccinated:'',
        past_1_confirmed: '', past_1_death : '', past_1_recovered:''
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
            // console.log(data.data);

            //setting data for searched state
            const searched_data = state_list.filter(obj => obj.statecode == `${searchText.split(', ')[1]}`);
            console.log(data.data);
            setsearchedResult({
                active:searched_data[0]['active'], confirmed:searched_data[0]['confirmed'], deaths:searched_data[0]['deaths'],
                recovered:searched_data[0]['recovered'], place : searchText, last_updated : inData.last_updated
            })
        })
        .catch(error => console.log(error));
    }
    
    const get_state_case = ()=>{                //get current data for searched State
        axios({
            url : 'https://api.covid19india.org/v4/min/data.min.json',
            type: 'GET',
        })
        .then(data=>{   
            // var data_ =data.data[searchText.split(', ')[1]]['dates'];   
            // data_ = Object.values(data_);
            // console.log(data_[data_.length-1].delta, data_[data_.length-1].delta7, data_[data_.length-1].total);
            const state_ = searchText.split(', ')[1];
            console.log(data.data[state_]);
            const searched_data = data.data[state_];
            setsearchedResult({
                total_confirmed: searched_data['total']['confirmed'], total_death : searched_data['total']['deceased'], total_recovered:searched_data['total']['recovered'], total_vaccinated:searched_data['total']['vaccinated'],
                past_7_confirmed: searched_data['delta7']['confirmed'], past_7_death : searched_data['delta7']['deceased'], past_7_recovered:searched_data['delta7']['recovered'], past_7_vaccinated:searched_data['delta7']['vaccinated'],
                past_1_confirmed: searched_data['delta']['confirmed'], past_1_death : searched_data['delta']['deceased'], past_1_recovered:searched_data['delta']['recovered'], past_1_vaccinated:searched_data['delta']['vaccinated'],
                place:searchText
            });
        })
        .catch(error=>console.log(error));
    }
    
    const get_state_diff = () => {              //get the difference data for searched State
        axios({
            url : 'https://api.covid19india.org/v4/min/timeseries.min.json',
            type : 'GET'
        })
        .then(data => {
            console.log(data.data);
            const state_ = searchText.split(', ')[1];
            var data_ = data.data[state_]['dates'];
            data_ = Object.values(data_);

            const data_today = data_[data_.length-1];
            const data_yest = data_[data_.length-2];
            console.log(data_today, data_yest);
            setIncData({
                total_confirmed: data_today['total']['confirmed'] - data_yest['total']['confirmed'], total_death : data_today['total']['deceased'] - data_yest['total']['deceased'], 
                total_recovered:data_today['total']['recovered'] - data_yest['total']['recovered'], total_vaccinated:data_today['total']['vaccinated'] - data_yest['total']['vaccinated'],
                
                past_7_confirmed: data_today['delta7']['confirmed'] - data_yest['delta7']['confirmed'], past_7_death : data_today['delta7']['deceased'] - data_yest['delta7']['deceased'], 
                past_7_recovered:data_today['delta7']['recovered'] - data_yest['delta7']['recovered'], past_7_vaccinated:data_today['delta7']['vaccinated'] - data_yest['delta7']['vaccinated'],
                
                past_1_confirmed: data_today['delta']['confirmed'] - data_yest['delta']['confirmed'], past_1_death : data_today['delta']['deceased'] - data_yest['delta']['deceased'], 
                past_1_recovered:data_today['delta']['recovered'] - data_yest['delta']['recovered']
            });
        })
        .catch(error => console.log(error));
    }
   

    const get_covid_data_citywise = ()=>{       //API for covid case - Citywise
        axios({
            url : 'https://api.covid19india.org/v4/min/data.min.json',
            type : 'GET',
        })
        .then((data)=>{
            var city = data;
            for(var i in city.data){
                for(var j in data.data[i].districts){
                    if(!cities.includes(`"${j}, ${i}"`) && j != 'Foreign Evacuees'){
                        cities.push(`${j}, ${i}`);
                    }
                }    
            }
            // console.log(data.data['Uttar Pradesh'], searchText.split(', ')[1]);
            // const state_ = searchText.split(', ')[1];
            // const district_ = searchText.split(', ')[0];
            // // console.log(data.data[state_]['districts'][district_]);
            // // console.log(data.data[state_].districtData[district_]);
            // //setting the value of searched City/District
            // const searched_data = data.data[state_]['districts'][district_];
            // console.log(searched_data)
            // setsearchedResult({
            //     total_confirmed: searched_data['total']['confirmed'], total_death : searched_data['total']['deceased'], total_recovered:searched_data['total']['recovered'], total_vaccinated:searched_data['total']['vaccinated'],
            //     past_7_confirmed: searched_data['delta7']['confirmed'], past_7_death : searched_data['delta7']['deceased'], past_7_recovered:searched_data['delta7']['recovered'], past_7_vaccinated:searched_data['delta7']['vaccinated'],
            //     past_1_confirmed: searched_data['delta']['confirmed'], past_1_death : searched_data['delta']['deceased'], past_1_recovered:searched_data['delta']['recovered'], past_1_vaccinated:searched_data['delta']['vaccinated']
            // });
        })
        .catch(error=>console.log(error));
    }

    const get_city_case = () => {                //get the current data for searched City/District
        axios({
            url : 'https://api.covid19india.org/v4/min/data.min.json',
            type : 'GET'
        })
        .then(data=>{
            // console.log(data.data);
            const state_ = searchText.split(', ')[1];
            const district_ = searchText.split(', ')[0];
            // console.log(data.data[state_]['districts'][district_]);
            // console.log(data.data[state_].districtData[district_]);
            //setting the value of searched City/District
            const searched_data = data.data[state_]['districts'][district_];
            console.log(searched_data)
            setsearchedResult({
                total_confirmed: searched_data['total']['confirmed'], total_death : searched_data['total']['deceased'], total_recovered:searched_data['total']['recovered'], total_vaccinated:searched_data['total']['vaccinated'],
                past_7_confirmed: searched_data['delta7']['confirmed'], past_7_death : searched_data['delta7']['deceased'], past_7_recovered:searched_data['delta7']['recovered'], past_7_vaccinated:searched_data['delta7']['vaccinated'],
                past_1_confirmed: searched_data['delta']['confirmed'], past_1_death : searched_data['delta']['deceased'], past_1_recovered:searched_data['delta']['recovered'], past_1_vaccinated:searched_data['delta']['vaccinated'],
                place:searchText
            });
        })
        .catch(error => console.log(error));
    }
    

    useEffect(()=>{                                 //calling the funtions after page reloads
        get_covid_data_statewise();
        get_covid_data_citywise();
        // console.log(incrementedData);
    }, [])
    
    

    const select_change = (e) => {                  //Setting the value of Input Placeholder
        const select = document.getElementById("select");
        const sel_value = select.value;

        const search_target = document.getElementById("search");

        if(sel_value == 'state'){
            search_target.placeholder = "Search State";
            setsearchText('');
        }
        else if(sel_value == 'city'){
            search_target.placeholder = "Search City";
            setsearchText('');
        }
        else{
            search_target.placeholder = "Please Select first!";
            setsearchText('');
            setsearchResult([]);
        }
    }

    const changeHandler = (e) => {                  //Filtering the array according to the entered value
        const select = document.getElementById("select");
        const sel_value = select.value;

        setsearchText(e.target.value);
        // console.log(searchText);
        var arr =[];
        if(sel_value == 'state')
            arr =  states.filter(obj => obj.toLowerCase().includes(searchText.toLowerCase()));
        else if(sel_value == 'city')
            arr =  cities.filter(obj => obj.toLowerCase().includes(searchText.toLowerCase()));

        setsearchResult(arr);

        // console.log(searchResult);
    }

    const setValue = (e)=>{                         //Set the value on click in suggestions
        // console.log(e.target.innerText);
        // search.value = e.target.innerText;
        setsearchText(e.target.innerText);
        setshowSuggestion(false);
    }
    
    const SuggestionList = (suggestions) => {       //Suggestion List
        if(showSuggestion){
            if(suggestions.length > 0){
                return(
                    <ul className="suggestions">
                        {
                            suggestions.map((suggestion, index) =>{
                                return(
                                    <li onClick={setValue}>{suggestion}</li>
                                )
                            })
                        }
                    </ul>
                )
            }
        }
        else{
            <div class="no-suggestions  w-3/12">    
                <ul className="flex justify-center italic ">
                <li>cITY <span className="text-gray-700 font-medium ">Not Found!</span></li>
                </ul>
            </div>
        }
    }

    const suubmitHandler = () => {
        const select = document.getElementById("select");
        const sel_value = select.value;
        if(sel_value == 'state'){
            get_state_case();
            get_state_diff();
        }
            // get_covid_data_statewise();
        else if(sel_value == 'city')
            get_city_case();

        // get_covid_data_citywise();
        console.log(incData);
    }

    return(
        <>
            <div className="h-screen login_page bg-blend-darken	">
                <div>
                    <h5 className="  font-semibold h-1/5 mt-2 container text-3xl text_shadow"><span className="text-red-500 ">Live</span> COVID19 Tracker</h5>
                </div>
                <div className="container justify-around flex py-2 my-2 bg-gray-200 rounded-xl opacity-90">
                    <div className="flex bg-white px-2 lg:w-96 md:w-4/5 rounded">
                        <select className="rounded-l-full text-lg font-normal w-full px-6 text-gray-700  focus:outline-none"  onChange={select_change} id="select">
                            <option value="nil" selected>Check Stats by..</option>
                            <option value="state">State</option>
                            <option value="city">City</option>
                        </select>
                    </div>
                    <div className="flex bg-white py-1 px-2  lg:w-96 md:w-4/5  rounded-3xl">
                        <input type="text" onChange={changeHandler} onClick={()=>setshowSuggestion(true)} value={searchText}
                        className="rounded-l-full w-full px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Search" />
                        <div>
                            <button className="bg-indigo-600 text-white rounded-full p-2"  onClick={suubmitHandler}><i><SearchIcon/></i></button>
                        </div>
                        {SuggestionList(searchResult)}
                    </div>
                </div>

                <div className="container bg-gray-200 mt-3 lg:flex-wrap md:flex-wrap-reverse rounded-xl mb-3">
                    <div className="w-full lg:flex lg:flex-wrap lg:justify-around md:flex-wrap-reverse">

                        <div className="w-full flex justify-center">
                            <div className="lg:w-3/12 md:w-3/5 grid place-content-center mt-4 mx-2 transition delay-75 bg-indigo-500 h-24 transform hover:scale-105 rounded-md shadow-2xl flex-3">
                                <h5 className="font-semibold text-3xl text-white">India</h5>
                                <h5 className="text-gray-200"><span className="text-gray-800 font-semibold text-lg">Last Updated :</span> {inData.last_updated}</h5>
                            </div>
                        </div>

                        <div className="w-full flex flex-wrap mt-3 my-2">                        
                            <MainCard heading={'Total Cases'} positive={false} total_value={inData.total_confirmed} difference_value={incrementedData.total_confirmed}/>
                            <MainCard heading={'Total Recovered'} positive={true} total_value={inData.total_recovered} difference_value={incrementedData.total_recovered}/>
                            <MainCard heading={'Total Deaths'} positive={false} total_value={inData.total_deaths} difference_value={incrementedData.total_deaths}/>
                            <MainCard heading={'Daily Cases'} positive={false} total_value={inData.daily_confirmed} difference_value={incrementedData.daily_confirmed}/>
                            <MainCard heading={'Daily Recovered'} positive={true} total_value={inData.daily_recovered} difference_value={incrementedData.daily_recovered}/>
                            <MainCard heading={'Daily Death'} positive={false} total_value={inData.daily_deaths} difference_value={incrementedData.daily_deaths}/>
                        </div>

                        
                    </div>
                    
                   
                    <div className="w-full lg:flex lg:flex-wrap  md:flex-wrap-reverse divide-y divide-red-500 ">
                        <div className="w-full lg:flex lg:flex-wrap lg:justify-around md:flex-wrap-reverse">
                            <div className="w-full flex justify-center">
                                <div className="lg:w-3/12 md:w-3/5 grid place-content-center mt-4 transition delay-75 mx-2 bg-green-400 h-24 transform hover:scale-105 rounded-md shadow-2xl flex-3">
                                    <h5 className="font-semibold text-3xl text-white">{searchedResult.place}</h5>
                                    <h5 className="text-gray-100"><span className="text-gray-800 font-semibold text-lg">Last Updated :</span> {inData.last_updated}</h5>
                                </div>
                            </div>
                            <div className="w-full flex flex-wrap mt-3 my-2">                        
                                <SubCard heading={'Total'} confirmed={searchedResult.total_confirmed} recovered ={searchedResult.total_recovered}
                                    deaths={searchedResult.total_death} vaccinated={searchedResult.total_vaccinated}
                                    delta_conf={incData.total_confirmed} delta_rec={incData.total_recovered} delta_death={incData.total_death} delta_vacc={incData.total_vaccinated}
                                    />

                                <SubCard heading={'Past 7 Days'} confirmed={searchedResult.past_7_confirmed} recovered ={searchedResult.past_7_recovered}
                                    deaths={searchedResult.past_7_death} vaccinated={searchedResult.past_7_vaccinated}
                                    delta_conf={incData.past_7_confirmed} delta_rec={incData.past_7_recovered} delta_death={incData.past_7_death} delta_vacc={incData.past_7_vaccinated}      
                                />

                                <SubCard heading={'Past Day'} confirmed={searchedResult.past_1_confirmed} recovered ={searchedResult.past_1_recovered} 
                                    deaths={searchedResult.past_1_death} vaccinated={searchedResult.past_1_vaccinated}
                                    delta_conf={incData.past_1_confirmed} delta_rec={incData.past_1_recovered} delta_death={incData.past_1_death }
                                
                                />
                            </div>
                        </div>                 
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