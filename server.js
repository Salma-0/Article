const express = require('express');
const connectDB = require('./config/db');

const app  = express();


//connect MONGODB
connectDB();

//Encode requests

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/view'))


//SETUP ROUTES
app.use('/api/articles', require('./routes/api/articles'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));




const PORT = process.env.PORT || 5000;


//SET THE SERVER 
app.listen(PORT, ()=>{
	console.log(`App runs on port ${PORT}`);
});