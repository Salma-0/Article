import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import ArticleItem from './ArticleItem';
import { getArticles } from '../../actions/article';
import Spinner from '../layout/Spinner';

const Articles = ({ getArticles, article: {articles, loading}}) => {

	useEffect(()=> {getArticles()}, [getArticles]);

	return (
		<div className='container mt-4'>
		<form className="form-inline md-form form-sm m-3">
            <i className="fas fa-search" aria-hidden="true"></i>
            <input className="form-control form-control-sm ml-3 w-75" 
            type="text" 
            placeholder="Search"
            aria-label="Search"/>
        </form>
		<h3>Recent Articles</h3>
		<br/><br/>
		{ loading ? <Spinner/> : articles.map(article => (
				<Fragment key={article._id}><ArticleItem article={article}/><hr/></Fragment>))
		}
		</div>
	)
}

Articles.propTypes = {
  article: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
  article: state.article
});

export default connect(mapStateToProps, {getArticles})(Articles)