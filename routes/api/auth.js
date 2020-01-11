const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator'); 
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//@ TODOs

/*
 1. Login Function
 2. Get Authenticated User by token
*/

//@route POST 
//@desc Login function
//@access Public
router.post('/', [
	check('email', 'Enter a valid email address').isEmail(),
	check('password', 'Password is required').not().isEmpty()],
	async (req, res)=>{
		const errors = validationResult(req);

		if(!errors.isEmpty()){
			return res.status(400).json({ errors: errors.array()});
		}
        
        try{

		 const { email, password } = req.body;

		 const user = await User.findOne({email});
		 
		 if(!user){
		 	return res.status(404).json({ errors: [{msg: 'Invalid Credentials'}]});
		 }

		 const isMatch = await bcrypt.compare(password, user.password);
		 
		 if(!isMatch){
		 	return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }]});
		 }

         const payload = {
         	user: {id: user.id}
         };

         jwt.sign(payload,
         	process.env.JWT_KEY,
         	{expiresIn: 360000},
         	(err, token)=> {
         	  if(err) throw err;
         	  res.json({token});	
         	});

		} catch(err){
			res.status(500).send(err.message);
		}
	});

//@route  GET 
//@desc   Get authenticated user
//@access Private
router.get('/', auth, async(req, res)=>{
	try{
		const user = await User.findById(req.user.id).select('-password'); 
		if(!user){
			return res.status(404).json({errors: [{ msg: 'Not Found'}]});
		}

        res.json(user);

	}catch(err){
		res.status(500).send(err.message);
	}
})

module.exports = router;