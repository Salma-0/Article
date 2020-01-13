import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import ArticleItem from './ArticleItem';
import { getArticles } from '../../actions/article';
import Spinner from '../layout/Spinner';
import Landing from '../layout/Landing';
import Pager from '../layout/Pager';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as qs from 'query-string';


const Articles = ({ getArticles, article: {articles, loading, pager}, location}) => {
    
	useEffect(()=> {
	    var parsed = qs.parse(location.search)		
		getArticles(parsed.page)
	}, [getArticles]);

	

	return (
		<Fragment>
		<Landing/>
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
				<Fragment key={article._id}>
				    <ArticleItem article={article}/>
				    <hr/>
				</Fragment>
			)
		)}
  
		{pager.pages && <Pager pages={pager.pages} location={location}/>}
		</div>
		</Fragment>
	)
}

Articles.propTypes = {
  article: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  article: state.article
});

export default connect(mapStateToProps, {getArticles})(withRouter(Articles));

