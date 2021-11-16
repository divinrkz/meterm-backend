const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
const { ERROR_RESPONSE } = require('../utils/methods.util');

const SECRET_KEY = process.env.SECRET_KEY;
const AUTH_MIDDLEWARE = async(req, res, next) => {
  
        const header = req.header('Authorization');

        
        if (!header) 
            return res.status(404).send(ERROR_RESPONSE(null, 'NO BEARER TOKEN FOUND')); 
        
         if (!(header.startsWith('Bearer ')))  
            return res.status(404).send(ERROR_RESPONSE(null, 'INVALID BEARER TOKEN')); 
            
        const token = header.split(' ')[1];  
        console.log(token);  

        try {
         const decoded = jwt.verify(token, SECRET_KEY);
         5
         const user = await User.findById(decoded._id);

         req.AUTH_DATA = {_id: user._id, userType: user.userType, user};

         next();

        }
        catch (err) {
            console.error(err);
            return res.status(500).send(ERROR_RESPONSE(err.toString()));
        }
} 

module.exports = {AUTH_MIDDLEWARE}