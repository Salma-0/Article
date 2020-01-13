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

} from '../actions/types';



const initialState = {
	article: null,
	articles: [],
	loading: true,
	errors: {},
	pager: {}
}

export default function(state = initialState, action){

	const { type, payload } = action;

	switch(type){
		case GET_ARTICLES_BY_AUTHOR:
		case GET_ARTICLES:
		return {
			...state,
			articles: payload.pageOfItems,
			loading: false,
			pager: payload.pager
		};

		case GET_ARTICLE:
		case CREATE_ARTICLE:
		return {
			...state,
			article: payload,
			loading: false
		}

		case ADD_COMMENT:
		return {
			...state,
			article: {...state.article, comments: payload},
			loading: false
		};

		case LIKE: 
		return {
			...state,
			article: {...state.article, likes: payload},
			loading: false
		}

		case DELETE_COMMENT: 
		return {
			...state,
			article: {...state.article, comments: state.article.comments.filter(c => c._id !== payload)},
			loading: false
		}

		case ARTICLE_ERROR: 
		return {
			...state,
			loading: false,
			errors: payload
		};

		case CLEAR_ARTICLE: 
		return {
			...state,
			article: null,
			articles: []
		}


		default: return state;
	}

}