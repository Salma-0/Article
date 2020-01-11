import React from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/article';

const Comment = ({comment, deleteComment, articleID, auth: {isAuthenticated, loading}}) => {
	
	let source = 'http://static.asianetnews.com/img/default-user-avatar.png';
	if(comment.avatar){
       source = `data:image/jpeg;base64,${comment.avatar}`;
	}


	return (
		<li className="media">
                <a href="#" className="pull-left mr-3">
                    <img src={source} alt="" className="img-circle"/>
                </a>
                <div className="media-body">
                       
                        <strong className="text-success">{comment.name}</strong>
                        <p>
                            {comment.text}
                        </p>
                         <span className="text-muted pull-right">
                            <small className="text-muted"><Moment fromNow>{comment.date}</Moment></small>
                        </span>
                </div>
                {!loading && isAuthenticated && (
                    <button className='btn' onClick={e=> deleteComment(articleID, comment._id)}>
                    <i className='fas fa-trash'/>
                    </button>
                )}
                
        </li>
	)
}

Comment.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deleteComment})(Comment)