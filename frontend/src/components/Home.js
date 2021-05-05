import React, {useState} from 'react';
import Navbar from './Navbar';

const Home = ()=>{
    const [count, setcount] = useState(0);
    return(
        <>
            <Navbar />
            <h2>Count is {count}</h2>
            <button onClick={setCount = ()=>{count+1}}>Click Me</button>
        </>
    )
}

export default Home;