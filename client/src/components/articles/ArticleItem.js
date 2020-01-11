import React from 'react'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
 

const ArticleItem = ({ article}) => {
	return (
		<div key={article.id} className='blog-item'>
		  <Link to={`/articles/${article._id}`}>
		    <h4>{article.title}</h4>
		    <em>by {article.author.name}</em>{', '}
		  </Link>
		  	<small className='text-muted'> <Moment fromNow>{article.date}</Moment></small>
		</div>
	)
}


export default ArticleItem