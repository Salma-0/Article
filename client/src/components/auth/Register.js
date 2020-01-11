import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import { setAlert } from '../../actions/alert';
import {connect} from 'react-redux';
import { register } from '../../actions/auth';
import {Redirect} from 'react-router-dom';

const Register = ({setAlert, register, isAuthenticated}) => {

	const [ formData, setFormData ] = useState({
		name:'',
		email: '',
		password: '',
		password2: ''
	});

	const { email, name, password, password2} = formData;

	const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

	const onSubmit = e => {
		e.preventDefault();
		if(password !== password2)
			 return setAlert('Passwords do not match', 'danger');
		if (name === '' || email === ''){
			 return setAlert('Name an Email are required','danger');
		}

		return register(formData);

	}

     if(isAuthenticated)  return <Redirect to='/profile/me'/>

	return (
		<div className='container d-flex flex-column justify-content-center align-items-center mt-4'>
		<h3 className='text-primary text-center'>Register</h3>
  		<form  className='shadow card p-3 form' onSubmit={e => onSubmit(e)}>
  		    <div className='form-group'>
			    <label>Name:</label>
				<input className='form-control' name='name' type='text' placeholder='Name' value={name} onChange={e=>onChange(e)}/>
			</div>
			<div className='form-group'>
			    <label>Email:</label>
				<input className='form-control' name='email' type='email' placeholder='Email'  value={email} onChange={e=>onChange(e)}/>
			   </div>
			    <div className='form-group'>
			    <label>Password:</label>
				<input className='form-control' name='password' type='password' placeholder='Password'  value={password} onChange={e=>onChange(e)}/>
			   </div>
			   <div className='form-group'>
			    <label>Password Confirm:</label>
				<input className='form-control' name='password2' type='password' placeholder='Password Confirmation'  value={password2} onChange={e=>onChange(e)}/>
			   </div>
			   <div className='form-group'>
			   <input className='btn btn-default btn-primary' type='submit' value='Sign up'/>
			   </div>
			</form>
  		</div>
	)
}


Register.propTypes = {
   setAlert: PropTypes.func.isRequired,
   register: PropTypes.func.isRequired,
   isAuthenticated:  PropTypes.bool
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, register})(Register);


