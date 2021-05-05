import React, {useState} from 'react';
import Navbar from './Navbar';

const Home = () => {

    const [count, setCount] = useState(0);
    return(
        <>
            <Navbar/>
            <h1>This is Home</h1>
            <h3>This is {count}</h3>
            <button onClick={()=>{setCount(count+3)}}>Click</button>

        </>
    )
};

export default Home;