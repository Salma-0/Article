const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async function(req, res, next){
	const token = req.header('x-auth-token');

	if(!token){
		return res.status(401).json({errors: [{msg: 'Authorization Denied'}]});
	}

    try{
    	const decoded = await jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded.user;
	    next();
    }catch(err){
       res.status(500).send(err.message);
    }
	
}