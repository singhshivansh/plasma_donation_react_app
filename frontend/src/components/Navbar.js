import react from 'react';
import {Route, Link} from 'react-router-dom';

const Navbar = ()=>{
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/" ex >Navbar</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/home">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/main">Main</Link>
                    </li>                
                </ul>
            </div>

            <div>
                <button className="btn btn-light mx-2">Login</button>
                <button className="btn btn-light mx-2">Register</button>
            </div>
            </nav>
        </>
    )
}

export default Navbar;

