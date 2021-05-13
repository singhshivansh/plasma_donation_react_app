import React from 'react'
import {Route, Switch} from 'react-router-dom';

import  Home from './Home';
import Main from './Main';
import About from './About';
import Login from './auth/Login';
import Register from './auth/Register'

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route path="/" exact><Home/></Route>
                <Route path="/main"><Main/></Route>
                <Route path="/about"><About/></Route>
                <Route path="/login"><Login/></Route>
                <Route path='/register'><Register /></Route>
            </Switch>
            
        </div>
    )
}

export default Routes;
