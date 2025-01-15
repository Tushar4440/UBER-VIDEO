//! this file is used for authenticating different users for user profiles access...
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//^ this function is used for authenticating i.e. the user is authenticated or not...
module.exports.authUser = async (req, res, next) => {
    // getting token from cookies or headers section 
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // checking if token is getting or not (unauthorised user)...
    if (!token) {
        return res.status(401).json({ message: "Unauthorised access" })
    }

    const isBlacklisted = await userModel.findOne({token : token});
    if(isBlacklisted){
        return res.status(401).json({message : "Unauthorised access"})
    }

    // if token is authorised use try-catch block and proceed...
    try {
        // This method verifies the token using the secret key (process.env.JWT_SECRET). It decodes the token, extracting the embedded user information (e.g., _id).
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // userModel.findById(decoded._id): Finds the user by their ID (decoded from the token) in the database.
        const user = await userModel.findById(decoded._id)
        // req.user = user: Attaches the retrieved user object to the request object (req), making it accessible to subsequent middleware or route handlers.
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized access" })
    }
}