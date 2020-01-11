import { SET_ALERT, REMOVE_ALERT } from '../actions/types';


//the state of alerts is an array of alerts
const initialState = [];

//reducer check the action's type and returns the proper state;

export default function alert(state = initialState, action){
	switch(action.type){
		case SET_ALERT:
		return [...state, action.payload];

		case REMOVE_ALERT: 
		return state.filter(alert => alert.id !== action.payload);

		default: return state;
	}
}