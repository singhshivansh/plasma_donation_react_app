import React from 'react'

const MainCard = (props) => { 
    const Check_value = (value)=>{
        if(props.positive){
            if(value.value < 0){
                return(
                    <p class="text-red-500 text-lg   leading-tight">▼ {value.value}</p>
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
                    <p class="text-red-500 text-lg   leading-tight">▲ {value.value}</p>
                )
            }else if(value.value < 0){
                return(
                    <p class="text-green-500 text-lg     leading-tight">▼ {value.value}</p>
                )
            }
        }
        return null;
    }
    return (
        <div class="w-full md:w-1/4 px-2 flex-1 my-2">
            <div class="rounded-lg shadow-sm mb-4">
                <div class="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                    <div class="px-3 pt-8 pb-10 text-center relative z-10">
                        <h4 class="text-sm uppercase text-gray-500 leading-tight">{props.heading}</h4>
                        <h3 class="text-2xl text-gray-700 font-semibold leading-tight my-1">{props.total_value}</h3>
                        
                        <Check_value value={props.difference_value} />
                    </div>
                    <div class="absolute bottom-0 inset-x-0">
                        <canvas id="chart2" height="70"></canvas>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainCard;
