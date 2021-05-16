import React from 'react'

const MainCard = (props) => { 
    const Check_value = (value)=>{
        if(props.positive){
            if(value.value < 0){
                return(
                    <p class="flex items-center justify-end text-red-500 text-md">
                                <span class="font-semibold">{value.value}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path class="heroicon-ui" d="M20 9a1 1 0 012 0v8a1 1 0 01-1 1h-8a1 1 0 010-2h5.59L13 10.41l-3.3 3.3a1 1 0 01-1.4 0l-6-6a1 1 0 011.4-1.42L9 11.6l3.3-3.3a1 1 0 011.4 0l6.3 6.3V9z"/></svg>
                            </p>
                )
            }else if(value.value >= 0){
                return(
                    <p class="flex items-center justify-end text-green-500 text-md">
                                <span class="font-semibold">{value.value}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path class="heroicon-ui" d="M20 15a1 1 0 002 0V7a1 1 0 00-1-1h-8a1 1 0 000 2h5.59L13 13.59l-3.3-3.3a1 1 0 00-1.4 0l-6 6a1 1 0 001.4 1.42L9 12.4l3.3 3.3a1 1 0 001.4 0L20 9.4V15z"/></svg>
                            </p>
                )
            }
        }
        else{
            if(value.value >= 0){
                return(
                    <p class="flex items-center justify-end text-red-500 text-md">
                                <span class="font-semibold">{value.value}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path class="heroicon-ui" d="M20 15a1 1 0 002 0V7a1 1 0 00-1-1h-8a1 1 0 000 2h5.59L13 13.59l-3.3-3.3a1 1 0 00-1.4 0l-6 6a1 1 0 001.4 1.42L9 12.4l3.3 3.3a1 1 0 001.4 0L20 9.4V15z"/></svg>
                            </p>
                )
            }else if(value.value < 0){
                return(
                    <p class="flex items-center justify-end text-green-500 text-md">
                                <span class="font-semibold">{value.value}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path class="heroicon-ui" d="M20 9a1 1 0 012 0v8a1 1 0 01-1 1h-8a1 1 0 010-2h5.59L13 10.41l-3.3 3.3a1 1 0 01-1.4 0l-6-6a1 1 0 011.4-1.42L9 11.6l3.3-3.3a1 1 0 011.4 0l6.3 6.3V9z"/></svg>
                            </p>
                )
            }
        }
        return null;
    }
    return (
        <div class="w-full sm:w-3/4 px-2 flex-1 my-2 transform transition delay-75 hover:scale-105">
            <div class="w-full ">
                <div id="jh-stats-positive" className="flex flex-col justify-center px-4 py-3 bg-white shadow-xl rounded-lg border-l-4 border-blue-500">
                    <div className="">
                        <div>
                            <Check_value value={props.difference_value}/>
                        </div>
                        <p class="text-3xl font-semibold text-center text-gray-800">{props.total_value}</p>
                        <p class="text-lg text-center text-gray-500">{props.heading}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainCard;
