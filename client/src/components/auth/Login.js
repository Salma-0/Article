import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Redirect } from 'react-router-dom';


const Login = ({ login, isAuthenticated, loading }) => {

    const [formData, setFormData ] = useState({
    	email: '',
    	password: ''
    });

    const { email, password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});
    
    const onSubmit = e => {
    	e.preventDefault();
    	return login(email, password);
    }

    if(isAuthenticated && !loading){
		return (<Redirect to='/profile/me'/>)
	}

	return (
		<Fragment>
			<div className='container d-flex flex-column justify-content-center align-items-center mt-3'>
			<h3 className='text-primary text-center m-2'>Login</h3>
			<form className='p-3 card shadow form' onSubmit={e => onSubmit(e)}>
			   <div className='form-group'>
			    <label>Email:</label>
				<input className='form-control' name='email' type='email' placeholder='Email' onChange={e => onChange(e)} value={email}/>
			   </div>
			    <div className='form-group'>
			    <label>Password:</label>
				<input className='form-control' name='password' type='password' placeholder='Password' onChange={e=> onChange(e)} value={password}/>
				<small className='form-text text-muted'>Have no account yet? <a href='/signup'>Sign up</a></small>
			   </div>
			   <div className='form-group'>
			   <button className='btn btn-default btn-primary' type='submit'>Login</button>
			   </div>
			</form>
			</div>
		</Fragment>
	)
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
})

export default connect(mapStateToProps, {login})(Login);
