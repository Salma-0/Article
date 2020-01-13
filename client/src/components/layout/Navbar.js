import React, {Fragment} from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout} from '../../actions/auth';


const Navbar = ({auth: {loading, isAuthenticated}, logout}) => {

	const guestLinks = (
        
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className='navbar-nav'>
                    <li className="nav-item">
                        <Link className="nav-link" to='/'>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/login'>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/register'>Signup</Link>
                    </li> 
                </ul> 
           </div>
        );

    const authLinks = (
        

        <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className='navbar-nav'>
                    <li className="nav-item">
                        <Link className="nav-link" to='/'>Home</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href='#' onClick={ ()=>logout()}>Logout</a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/profile/me'>Profile</Link>
                    </li> 
                </ul>
            </div>
            )

	return (

    <nav className="navbar navbar-expand-md bg-light navbar-light">
            <a className="navbar-brand" href="/">Article</a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
            </button>

        { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>) }
    </nav>
	)
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar)
