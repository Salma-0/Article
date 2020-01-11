const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	author: { type: Schema.Types.ObjectId, ref: 'User' ,required: true },

	title: {type: String, required: true},

	content: [
	{ 
		value: String,
		content_type: String
	}
	 ],

	images: [String],

	comments: [
	 {
	 	text: {type: String, required: true},
	 	date: {type: Date, default: Date.now},
	 	avatar: {type: String},
	 	user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
	 	name: { type: String, required: true}
	 }
	],

	likes: [{
	 user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
	}],

	date: {type: Date, default: Date.now}
});

module.exports = Article = mongoose.model('Article', ArticleSchema);