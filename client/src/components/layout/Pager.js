import React from 'react'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { getArticles } from '../../actions/article';
import PropTypes from 'prop-types';
import * as qs from 'query-string';


const Pager = ({pages, location, getArticles}) => {

	const onClick = e => {
      const parsed = qs.parse(location.search);
      const page = parsed.page;
      getArticles(page);
	}

	return (
		<div>
			<ul className='pagination'>
			    <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </a>
                </li>
				{
			    	pages.map(p => (
					<li key={p} className='page-item'>
						<Link className='page-link' to={`/?page=${p}`} onClick={e=> onClick(e)} >
						{p}</Link>
					</li>
				))}
				<li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </a>
                </li>
			</ul>
		</div>
	)
}

Pager.propType = {
	getArticles: PropTypes.func.isRequired
}



export default connect(null, {getArticles})(Pager);