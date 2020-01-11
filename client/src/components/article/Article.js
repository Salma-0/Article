import React, {useEffect, Fragment} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getArticle } from '../../actions/article'; 
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';
import ArticlePiece from './ArticlePiece';
import CommentsSection from './CommentsSection';


const Article = ({ getArticle, match, article:{ loading, article} }) => {

    useEffect(()=>{
    	getArticle(match.params.id);
    }, [getArticle])

    var coverImg = '';

    if(!loading && article){
      coverImg = article.images.shift();
    }

	 return (
		<Fragment>
			{ loading || !article ? <Spinner/> : <div className='container mt-5 mb-3 blog'>
				<h2 className='text-info'>{article.title}</h2>
				<small className='text-muted'><Moment format='LL'>{article.date}</Moment></small>
				<article className='mb-5'>
			    <img className='mb-5 mt-5 cover-img' src={`data:image/jpeg;base64,${coverImg}`}/>
			    { 
			     article.content.map(e => (
					<ArticlePiece key={e._id} content={e} images={article.images}/>))
			    }
		        </article>
				<CommentsSection comments={article.comments} likes_count={article.likes.length} articleID={match.params.id}/>
			</div>
		}
		</Fragment>
	
  )
}

Article.propTypes = {
  article: PropTypes.object.isRequired,
  getArticle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	article: state.article,
})

export default connect(mapStateToProps, {getArticle})(Article)