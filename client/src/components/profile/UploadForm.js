import React,{useState} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadAvatar } from '../../actions/auth';


const UploadForm = ({uploadAvatar}) => {


	const [avatar, setAvatar] = useState([]);

	const onSubmit = e => {
		e.preventDefault();
		uploadAvatar(avatar);
	}

	const onChange = e => {
		setAvatar([...avatar, e.target.files[0]]);
	}

	return (
		<div className='shadow upload-form container p-2 mb-4'>
			<form onSubmit={e => onSubmit(e)}>
            	<input type='file' name='avatar' onChange={e => onChange(e)} className='form-control'/>
            	<button className='btn btn-outline-danger m-2'>cancle</button>
            	<button className='btn btn-outline-info m-2' type='submit'>upload</button>
            </form>
		</div>
	)
}


UploadForm.propTypes = {
	uploadAvatar: PropTypes.func.isRequired
}

export default connect(null, {uploadAvatar})(UploadForm)