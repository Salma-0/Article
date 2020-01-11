const express = require('express');
const router = express.Router();

const User = require('../../models/User'); 
const {check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = require('../../middleware/auth');
const fs = require('fs');


const multiparty = require('connect-multiparty');
const multipartMiddleware = multiparty({uploadDir: __dirname +'/images'});

//@ TODOs

/*
  1. Register User
*/

//@route POST 
//@desc Register User
//@access Public

router.post('/', [
	check('name', 'Name is Required').not().isEmpty(),
	check('email', 'Enter a valid email address').isEmail(),
	check('password', 'Please enter a password of 6 or more charaters..').isLength({min: 6})
	], async (req, res)=>{

		const errors = validationResult(req);
		
		if(!errors.isEmpty()){
           return res.status(400).json({ errors: errors.array()});
		}

		const { name, email, password } = req.body;
		try{
			var user = await User.findOne({email});

			if(user){
				return res.status(400).json({errors: [{msg: 'User already exists'}]});
			}

			user = new User({ name, email, password});

			let salt = await bcrypt.genSalt(10);
		    user.password = await bcrypt.hash(password, salt);

		    await user.save();

		    const payload = {
		    	user: {id: user.id}
		    };

           //generate web token and return it with response

		    jwt.sign(payload, 
		    	process.env.JWT_KEY, 
		    	{expiresIn: 360000}, 
		    	(err, token)=>{
		    		if(err) throw err;
		    		res.json({token});
		      });

		} catch(err){
			res.status(500).send(err.message);
		}
	});

//@route  POST api/users/upload-avatar
router.post('/upload-avatar', [auth, multipartMiddleware], async (req, res)=>{

	const avatar = req.files.avatar;

    console.log('From Server: ', avatar);
    try{
    	const user = await User.findById(req.user.id).select('-password');

    	if(avatar){
    		const buffer = await fs.readFileSync(avatar.path);
            const encodedImage = buffer.toString('base64');

            user.avatar = encodedImage;
            await user.save();
    	}

    	res.json(user);
    	

    }catch(err){
        res.status(500).send(err.message);
    }
})




 


module.exports = router