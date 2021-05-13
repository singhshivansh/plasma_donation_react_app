import {react, useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';

import { UserContext } from '../App';
import Button from '@material-ui/core/Button';


const Navbar = ()=>{
    
    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();

    console.log(state, dispatch);

    if(localStorage.getItem('token')){
        dispatch({type:"USER", payload:true});
    }
    else{
        dispatch({type:"USER", payload:false});
    }

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({type:"USER", payload: false});
        history.push('/main');
    }

    const RenderMenu = () => {
        if(state){
            return(
                <div>
                   <Button onClick={logout} variant="contained">Logout</Button>
                </div>
            )
        }
        else{
            return(
                <div>
                    <Link className="btn btn-light mx-2" to="/login">Login</Link>
                    <Link className="btn btn-light mx-2" to="/register" >Register</Link>
                </div>
            )
        }
    }

    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Navbar</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/main">Main <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>                
                </ul>
            </div>
                <RenderMenu/>
            </nav>
        </>
    )
}

export default Navbar;

