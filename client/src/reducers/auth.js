import { REGISTER_SUCCESS,
 REGISTER_FAIL,
 LOGIN_SUCCESS,
 LOGIN_FAIL, 
 LOGOUT, 
 USER_LOADED, 
 AUTH_ERROR,
 UPLOAD_AVATAR,
 UPLOAD_FAIL } from '../actions/types';

const initialState = {
	isAuthenticated: null,
    loading: true,
    user: null,
    token: localStorage.getItem('token')
};

 function auth(state = initialState, action) {
	const {type, payload} = action;

	switch(type){
		
		case LOGIN_SUCCESS: 
		case REGISTER_SUCCESS:
        localStorage.setItem('token', payload.token);
		return {
			...state,
			...payload,
			isAuthenticated: true,
			loading: true,
		};

		case USER_LOADED: 
         return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload
         }

         case UPLOAD_AVATAR:
         return {
         	...state,
         	loading: false,
         	user: payload
         }

         case UPLOAD_FAIL:
         return {
         	...state
         }

		case LOGIN_FAIL:
		case AUTH_ERROR:
		case REGISTER_FAIL:
		case LOGOUT:
		localStorage.removeItem('token');
		return {
			...state,
			user: null,
			isAuthenticated: false,
			loading: false
		}
		
		default: return state;
	}
}



export default auth;