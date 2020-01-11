 import React from 'react';
 import PropTypes from 'prop-types';
 import { connect } from 'react-redux';
 import { createArticle } from '../../actions/article'; 
 import { withRouter } from "react-router";


 var fileInputs = [];

 class Editor extends React.Component {

constructor(props){
    	super(props);
    	this.state = {text: '',  imgs: [], imgsCount: 1, title:''};
    	this.handleChange = this.handleChange.bind(this);
    	this.addHeading = this.addHeading.bind(this);
    	this.addParagraph = this.addParagraph.bind(this);
    	this.addQuote = this.addQuote.bind(this);
      this.addImg = this.addImg.bind(this);
      this.handleImageChange = this.handleImageChange.bind(this);
    }

    handleChange(e){
    	this.setState({[e.target.name]: e.target.value});
    }


    addHeading(){
       this.setState({text: this.state.text + '\n<heading>your heading line goes here<&heading>'});

    }

    addParagraph(){
    	this.setState({text: this.state.text + '\n<par>your paragraph goes here<&par>'})
    }

    addQuote(){
    	this.setState({text: this.state.text + '\n<quote>your quotation goes here<&quote>'})
    }

     handleImageChange(e){
      this.setState({imgs: this.state.imgs.concat(e.target.files[0])});
    }

    addImg(){
        let name = "images[" + this.state.imgsCount + "]";
        this.setState({text: this.state.text + '\n<img><&img>', imgsCount: this.state.imgsCount + 1});
        fileInputs.push(<input key={this.state.imgsCount} type='file' name={name} className='m-2' onChange={e=>this.handleImageChange(e)}/>)

    }


    onSubmit(e){
      e.preventDefault();
       this.props.createArticle({
         title: this.state.title,
         text: this.state.text,
         images: this.state.imgs,
         }, this.props.history)
    }

    
	render(){
		return (
			<div className='m-5'>
      <h2 className='text-info m-5'>Article Editor</h2>
			<ul className='nav justify-content-center'>
				<li className='nav-item m-2'><button className='nav-link btn btn-outline-primary' onClick={this.addHeading}>Heading Line</button></li>
				<li className='nav-item m-2' ><button className='nav-link btn btn-outline-info' onClick={this.addParagraph}>Paragraph</button></li>
				<li className='nav-item m-2'><button className='nav-link btn btn-outline-warning' onClick={this.addQuote}>Quote</button></li>
                <li className='nav-item m-2'><button className='nav-link btn btn-outline-danger' onClick={this.addImg}>Image</button></li>
			</ul>
			<form className='container' id='blogForm' onSubmit={(e)=>this.onSubmit(e)}>
            <div className='form-group'>
            <input type='text' name='title' value={this.state.title} onChange={(e)=> this.handleChange(e)} placeholder='Title' className='form-control'/>
             <label>Cover Image:</label>
             <input type='file' className='m-2' name='images[0]' onChange={e=> this.handleImageChange(e)} required/>
             <small className='form-text text-muted'>* The title and the cover image are required</small>
             </div>
             <div className='form-group'>{fileInputs}</div>
			<div className='form-group'>
				<textarea
				name='text' 
        value={this.state.text}
				ref='contentTextarea'
				 className='form-control mb-3'
				  placeholder='Select the type of your text' 
				  value={this.state.text} 
				  onChange={this.handleChange}
                  rows='19'>

				  </textarea>
				<input type='submit' value='Publish' className='btn btn-dark'/>
			</div>
			</form>

			</div>
		);
	}
}

Editor.propTypes = {
  createArticle: PropTypes.func.isRequired
}



export default connect(null, {createArticle})(withRouter(Editor));


