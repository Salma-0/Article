import axios from 'axios';

import {
	CREATE_ARTICLE,
	UPDATE_ARTICLE,
	GET_ARTICLE,
	GET_ARTICLES,
	GET_ARTICLES_BY_AUTHOR,
	DELETE_ARTICLES,
	ARTICLE_ERROR,
	ADD_COMMENT,
	DELETE_COMMENT,
	LIKE,
	CLEAR_ARTICLE
} from './types';

import store from '../store';

import { setAlert } from './alert';
import { browserHistory } from 'react-router';


//Create Article 
export const createArticle = ({title, text, images}, history) => async dispatch =>{
	const config = {
		headers: {
			'content-type': 'multipart/form-data'
		}
	};

    const formData = new FormData();
    formData.set('title', title);
    formData.set('text', text);
    
    if(images){
      for(let i =0; i< images.length; i++){
      	formData.append(`images[${i}]`, images[i]);
      }
    }
    

	try{
		const res = await axios.post('/api/articles', formData, config);

		dispatch({
			type: CREATE_ARTICLE,
			payload: res.data
		});

		history.push(`/articles/${res.data._id}`)

	}catch(err){
		const errors = err.response.data.errors;

		if(errors){
			errors.forEach( e => dispatch(setAlert(e.msg, 'danger')));
		}
		 dispatch({
		 	type: ARTICLE_ERROR,
		 	payload: err.response.data.errors
		 });
	}
}


//get article by author id
export const getArticlesByAuthor = (id = '') => async dispatch =>{
	try{
        dispatch({
        	type: CLEAR_ARTICLE
        })
		const state = store.getState();

		if(id === ''){
		   id = state.auth.user._id;
		   console.log(id);
		}

		const res = await axios.get(`/api/articles/author/${id}`);

		dispatch({
			type: GET_ARTICLES_BY_AUTHOR,
			payload: res.data
		});

	} catch(err){
		dispatch({ type: ARTICLE_ERROR});
	}
}

//get all of articles

export const getArticles = () => async dispatch =>{
	try{
		const res = await axios.get('/api/articles');

		dispatch({
			type: GET_ARTICLES,
			payload: res.data
		});
		
	} catch(err){
		
		dispatch({
			type: ARTICLE_ERROR,
			payload: err.response.data.errors
		});
	}
}


//get Article by ID 
export const getArticle = id => async dispatch => {
	try{
		const res = await axios.get(`/api/articles/${id}`);

		dispatch({
			type: GET_ARTICLE,
			payload: res.data
		});
	} catch(err){
		dispatch({
			type: ARTICLE_ERROR
		});
	}
}


//Add Comment
export const addComment = (id, text) => async dispatch => {

	const config = {
		headers:{
			'Content-Type': 'application/json'
		}
	};
	
	try{
		const res  = await axios.put(`/api/articles/comment/${id}`, {text}, config);

		dispatch({
			type: ADD_COMMENT,
			payload: res.data
		});
	}catch(err){
		const errors = err.response.data.errors;

		if(errors){
			errors.forEach( e => dispatch(setAlert(e.msg, 'danger')));
		}
		 dispatch({
		 	type: ARTICLE_ERROR,
		 	payload: err.response.data.errors
		 });
	}
}

//Delete comment
export const deleteComment = (id, commentID) => async dispatch =>{

	try{
		const res = await axios.delete(`/api/articles/comment/${id}/${commentID}`);

		dispatch({
			type: DELETE_COMMENT,
			payload: commentID
		});

		dispatch(setAlert('Deleted Successfully..', 'success'));
	} catch(err){
		const errors = err.response.data.errors;

		if(errors){
			errors.forEach( e => dispatch(setAlert(e.msg, 'danger')));
		}
		 dispatch({
		 	type: ARTICLE_ERROR,
		 	payload: err.response.data.errors
		 });
	}
}



//Like an article
export const like = id => async dispatch => {
   try{
   	  const res  = await axios.put(`/api/articles/like/${id}`);
      
      dispatch({
      	type: LIKE,
      	payload: res.data
      });
   }catch(err){
   	const errors = err.response.data.errors;

		if(errors){
			errors.forEach( e => dispatch(setAlert(e.msg, 'danger')));
		}
		 dispatch({
		 	type: ARTICLE_ERROR,
		 	payload: err.response.data.errors
		 });
   }
}









