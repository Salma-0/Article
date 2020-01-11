const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const options = {
	useCreateIndex: true,
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useFindAndModify: false
};


 const connectDB = async ()=> {
	try{
		await mongoose.connect(mongoURI, options);
		console.log('Connected to MongoDB server');

	} catch(err){
		console.log(err.message);
		process.exit(1);
	}
}

module.exports = connectDB;