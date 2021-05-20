import React from 'react';
import MainCard from './MainCard';
import {motion} from 'framer-motion';

const SubCard = (props) => {
    const Check_value = (value)=>{
        if(props.positive){
            if(value.value < 0){
                return(
                    <p class="flex items-center justify-end text-red-500 text-md">
                                <span class="text-sm ml-2">50</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path class="heroicon-ui" d="M20 9a1 1 0 012 0v8a1 1 0 01-1 1h-8a1 1 0 010-2h5.59L13 10.41l-3.3 3.3a1 1 0 01-1.4 0l-6-6a1 1 0 011.4-1.42L9 11.6l3.3-3.3a1 1 0 011.4 0l6.3 6.3V9z"/></svg>
                            </p> 
                )
            }else if(value.value > 0){
                return(
                    <p class="text-green-500 text-lg     leading-tight">▲ {value.value}</p>
                )
            }
        }
        else{
            if(value.value > 0){
                return(
                    <p class="flex items-center justify-end text-red-500 text-md">
                                <span class="text-sm ml-2">50</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path class="heroicon-ui" d="M20 9a1 1 0 012 0v8a1 1 0 01-1 1h-8a1 1 0 010-2h5.59L13 10.41l-3.3 3.3a1 1 0 01-1.4 0l-6-6a1 1 0 011.4-1.42L9 11.6l3.3-3.3a1 1 0 011.4 0l6.3 6.3V9z"/></svg>
                            </p> 
                )
            }else if(value.value < 0){
                return(
                    <p class="text-green-500 text-lg     leading-tight">▼ {value.value}</p>
                )
            }
        }
        return null;
    }


    const VaccinatedSec = (value) =>{
        // console.log(value); 
        if(value.value.vaccinated != undefined || value.value.vaccinated == '')
        return (
            <MainCard heading={'Vaccinated'} positive={true}  total_value = {value.value.vaccinated} difference_value={value.value.delta_vacc}/>
        )
        return null;
    }
    // console.log(props);

    const motion_variant = {
        hidden : {
            x : '30vh',
            opacity : 0
        },
        visible : {
            x : 0,
            opacity : 1
        }
    }

    return (
        
        <motion.div initial="hidden" animate="visible" variants={motion_variant} className="w-full lg:flex lg:flex-wrap lg:justify-around md:flex-wrap-reverse">
            <div className="lg:w-2/12 md:w-3/5 grid place-content-center bg-purple-500 mx-2 my-2  transform hover:scale-105 rounded-md shadow-2xl flex-3">
                <h5 className="font-semibold text-2xl text-white">{props.heading}</h5>
            </div>
            
            <MainCard heading={'Confirmed'} positive={false} total_value={props.confirmed} difference_value={props.delta_conf} />
            <MainCard heading={'Recovered'} positive={true} total_value={props.recovered} difference_value={props.delta_rec} />
            <VaccinatedSec value={props} />
            <MainCard heading={'Deaths'} positive={false} total_value={props.deaths} difference_value={props.delta_death} />
            
        </motion.div>

    )
}

export default SubCard;


{/* <div class="w-full md:w-3/4 h-full px-2 flex-1 my-2">
    <div class="w-full ">
        <div id="jh-stats-positive" className="flex flex-col justify-center px-4 py-4 bg-white shadow-xl rounded-lg border-l-4 border-blue-500">
            <div className="flex">
                <div className="lg:flex-col lg:justify-center lg:flex w-1/4">
                    <h4 class="text-xl font-semibold uppercase text-gray-900 leading-tight">{props.heading}</h4>
                </div>
                <div class="px-3 py-2 text-center z-10 w-2/3 justify-center flex">
                    <h3 class="text-lg text-gray-600 flex    leading-tight my-1">
                        <span className="text-black font-semibold flex">Confirmed  :  {props.confirmed} <Check_value value={50}/> </span>
                    </h3>
                    <h3 class="text-lg text-gray-600  leading-tight my-1">
                        <span className="text-black font-semibold flex">Recovered  :{props.recovered} <Check_value value={50}/></span>
                    </h3>
                    <VaccinatedSec value={props.vaccinated} />
                    <h3 class="text-lg text-gray-600  leading-tight my-1"><span className="text-black font-semibold">Deaths : </span>{props.deaths}</h3>

                </div>
            </div>
        </div>
    </div>
</div> */}