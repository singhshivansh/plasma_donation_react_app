import './App.css';
import {Route, Switch} from 'react-router-dom';

import  Home from './components/Home';
import Main from './components/Main';
import About from './components/About';
import Login from './components/auth/Login';
import Register from './components/auth/Register'


function App() {
  return (
    <div className="App">
      
      <Switch>
        <Route path="/" exact><Home/></Route>
        <Route path="/main"><Main/></Route>
        <Route path="/about"><About/></Route>
        <Route path="/login"><Login/></Route>
        <Route path='/register'><Register /></Route>
      </Switch>
    </div>

  );
}

export default App;
