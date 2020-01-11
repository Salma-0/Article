import React from 'react'

const ArticlePiece = ({content: {content_type, value}, images}) => {	
	switch(content_type){
		case 'heading':
		return <h4 className='section-heading mb-5 mt-5'>{value}</h4>;

		case 'paragraph': 
		return <p >{value}</p>

		case 'quote':
		return <blockquote>{value}</blockquote>

		case 'img':
		var currImg = images.shift();
		return <img className='cover-img' src={`data:image/jpeg;base64,${currImg}`}/>

		default: return null;
	}
}

export default ArticlePiece