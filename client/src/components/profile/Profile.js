import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {getArticlesByAuthor} from '../../actions/article';

import defaultAvatar from './default-avatar.png';
import {connect} from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ArticleItem from '../articles/ArticleItem';
import UploadForm from './UploadForm';



const Profile = ({auth: {user, isAuthenticated, loading}, getArticlesByAuthor, article: {articles}}) => {
   
   useEffect(() => { getArticlesByAuthor()}, [getArticlesByAuthor]);
   const [displayForm, toggleDisplayForm ] = useState(false);

   

   if(!isAuthenticated && !loading){
   	return <Redirect to='/'/>
   }


	let source = 'http://static.asianetnews.com/img/default-user-avatar.png';
	if(!loading && user.avatar){
		source=  `data:image/jpeg;base64,${user.avatar}`
	}
	return ( !user  ?  <Spinner /> :  <Fragment>
		<div className='container d-flex flex-row justify-content-center'>
			<div className='col-md-4 m-5 text-center'>
			    <a href='#' onMouseDown={e=> toggleDisplayForm(!displayForm)}>
			        <img src={source} className='rounded-circle shadow mb-3' style={{height: 150, width: 150}}/>
			    </a>
			    <h2>{user.name}</h2> 
            </div>
		</div>
		
		 {
			     displayForm && <UploadForm />
		 }      

		<div className='container'>
		    <h3>MY ARTICLES</h3>
		    <hr/>
		{ (user && loading) ? (<Spinner/>) : articles.map(article =>(
			<Fragment key={article._id}><ArticleItem  article={article}/><hr/></Fragment>))}

		<Link className='btn btn-outline-primary' to='/editor'>
		<i className='fas fa-edit'/>{' New Article'}
		</Link>
		</div>
		
		</Fragment>
	)
	
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  getArticlesByAuthor: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	article: state.article
})

export default connect(mapStateToProps, {getArticlesByAuthor})(Profile)