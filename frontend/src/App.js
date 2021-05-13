import './App.css';
import Routes from './components/Routes';
import Navbar from './components/Navbar';
import { createContext, useReducer } from 'react';

import {initialState, reducer} from '../src/reducer/UseReducer';


export const UserContext = createContext(); //Context API

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <UserContext.Provider value={{state, dispatch}}>
        <Navbar/>
        <Routes />
      </UserContext.Provider>
      
    </div>

  );
}

export default App;
