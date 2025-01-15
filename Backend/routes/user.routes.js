const express = require('express');
const router = express.Router();
const {body} = require('express-validator'); //!getting body from express-validator
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// The router.post method in Express is used to handle HTTP POST requests to a specific route. This method is typically used for creating new resources or handling form submissions.
//! register route
router.post('/register', [
    //! using body from express validator to check/handle various fields... 
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min : 3}).withMessage('First name must be atleast 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters in length'),
],
    //! then control it through userController..
    userController.registerUser
)

//! login route
router.post('/login',[
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({min : 6}).withMessage('Password should be atleast 6 characters in lengths'),
],
    userController.loginUser
)

//! profile route
router.get('/profile', authMiddleware.authUser , userController.getUserPofile)

//! logout route
router.get('/logout', authMiddleware.authUser, userController.logoutUser)

module.exports = router;