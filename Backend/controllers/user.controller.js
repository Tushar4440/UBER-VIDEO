const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

//! registerUser handling for register route through validationResult got from express-validator
//^ below registerUser function in userController.js serves as the endpoint handler for user registration.
module.exports.registerUser = async (req, res, next) => {
    // The function checks for validation errors using validationResult(req). If there are any validation //errors, it sends a 400 status with the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // It extracts fullname, email, and password from the request body.
    const { fullname, email, password } = req.body; 
    // It checks if the user already exists in the database using userModel.findOne
    const isUserAlreadyExist = await userModel.findOne({email});
    if(isUserAlreadyExist){
        return res.status(400).json({message: 'User already exists'});
    }

    // The password provided by the user is hashed using userModel.hashPassword(password)
    const hashPassword = await userModel.hashPassword(password);
    // A new user is created with userService.createUser, which includes the user's firstname and lastname extracted from fullname, and the hashed password.
    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password: hashPassword
    });
    // After creating the user, an authentication token is generated with user.generateAuthToken()
    const token = user.generateAuthToken();
    // Finally, it sends a 201 status code with the generated token and the newly created user object.
    res.status(201).json({ token, user });
}

//^ below loginUser function serves as the endpoint handler for user login.
module.exports.loginUser = async (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    // extracting email and password from req.body
    const {email, password} = req.body;
    //* This line of code queries the mongodb database for a user document that matches the provided email  with findOne() function and includes the password field in the result by select() function...
    const user = await userModel.findOne({email}).select('+password');
    // console.log('User:', user); console.log('Password:', password);
    if(!user){
        return res.status(401).json({message : "Invalid email or password"});
    }
    //* user is an instance of the User model, retrieved from the database.
    //* user.comparePassword() will compare password from database with the user password extracted in above line...
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message : "Invalid email or password"});
    }
    //at last we generate a token and send status 200 with token and user details...
    const token = user.generateAuthToken()
    //set token in cookie when user is loggin in...
    res.cookie('token', token);
    res.status(200).json({token, user});
}

//^ below is getUserPofile function for user profile endpoint handling
module.exports.getUserPofile = async (req, res, next)=>{
    res.status(200).json(req.user);
}

//^ below is logoutUser function for user logout handling
module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({token});
    res.status(200).json({message : 'Logged Out'});
}   