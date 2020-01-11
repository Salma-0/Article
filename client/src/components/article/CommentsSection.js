import React,{Fragment, useState} from 'react'
import Comment from './Comment';
import { addComment, like } from '../../actions/article';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CommentsSection = ({comments, likes_count, addComment, articleID, like}) => {

	const [text, setText] = useState('');
    
	const onChange = e => setText(e.target.value);
    
    const submit = e =>{
    	addComment(articleID, text);
    	setText('');
    }

	return (
		<div className="row bootstrap snippets">
    <div className="col-md-6 col-md-offset-2 col-sm-12">
        <div className="comment-wrapper">
            <div className="panel panel-info">
                <div className="panel-heading">
                    Comments {comments.length > 0 ? <span className='mr-1'>{comments.length}</span> : <span></span>}
                    <button className='btn' onClick={e => like(articleID)}>
                    <span className='fas fa-thumbs-up' style={{fontSize: 15}}></span>
                    </button>
                    {likes_count > 0 ? <span className='mr-1'>{likes_count}</span> : <span></span>}
                </div>
                <div className="panel-body mt-2">
                <textarea className="form-control" placeholder="write a comment..." rows="3" name='text' value={text} onChange={e=> onChange(e)}></textarea>
                    <br/>
                    <button type="button" className="btn btn-info pull-right" onClick={e=> submit()}>Post</button>
                    <div className="clearfix"></div>
                    <hr/>
                    <ul className="media-list">
                    {comments.map(c=> (
                    	<Comment key={c._id} comment={c} articleID={articleID}/>
                    	))}

                    </ul>
                </div>
            </div>
        </div>

    </div>
</div>
	)
}


CommentsSection.propTypes = {
  addComment: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired
}

export default connect(null, {addComment, like})(CommentsSection)
