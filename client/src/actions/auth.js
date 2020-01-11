import { REGISTER_SUCCESS,
 REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  UPLOAD_AVATAR,
  UPLOAD_FAIL 
} from './types';

import axios from 'axios';
import { setAlert } from './alert';

import setAuthToken from '../utils/setAuthToken';

 const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

//Load User
export const loadUser = () => async dispatch =>{
   if(localStorage.token){
       setAuthToken(localStorage.token);
   }

   try{

   	const res = await axios.get('/api/auth');
   	dispatch({
   		type: USER_LOADED,
   		payload: res.data
   	});

   }catch(err){

   	dispatch({
   		type: AUTH_ERROR
   	});
   }
}




//login action
export const login = (email, password) => async dispatch =>{
 
  try{

  	const body = JSON.stringify({email, password});

  	const res = await axios.post('/api/auth', body, config);

  	dispatch({
  		type: LOGIN_SUCCESS,
  		payload: res.data
  	});

   dispatch(loadUser());

  } 
  catch(err){

    const errors = err.response.data.errors;

    if(errors){
      errors.forEach(e => dispatch(setAlert(e.msg, 'danger')))
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
}


//register user
export const register = formData => async dispatch => {

  try{
    const res = await axios.post('/api/users', formData, config);


    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } 
  catch(err){

    const errors = err.response.data.errors;

    if(errors){
      errors.forEach(error=> dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
}

//logout

export const logout = () =>  dispatch =>{
  
    dispatch({
      type: LOGOUT
    });
}


//Upload Avatar

export const uploadAvatar = avatar => async dispatch => {
  
  console.log(avatar[0]);
  const formData = new FormData();
  formData.append('avatar', avatar[0]);
  

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=RECORD_BOUNDARY'
    }
  };


  try{

    const res = await axios.post('/api/users/upload-avatar', formData, config);

    dispatch({
      type: UPLOAD_AVATAR,
      payload: res.data
    });

   } catch(err){

    const errors = err.response.data.errors;

    if(errors){
      errors.forEach( error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: UPLOAD_FAIL,
      payload: err.message
    })
  }
}

