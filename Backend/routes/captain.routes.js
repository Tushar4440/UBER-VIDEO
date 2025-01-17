const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// register route
router.post('/register', [
    body('fullname.firstName').isString().isLength({ min: 3 }).withMessage('First name must be at least 3 characters'),
    body('email').isEmail().withMessage('Please fill a valid email address'),
    body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('vehicle.color').isString().isLength({ min: 3 }).withMessage('Color must be at least 3 characters'),
    body('vehicle.plate').isString().isLength({ min: 3 }).withMessage('Plate must be at least 3 characters'),
    body('vehicle.capacity').isNumeric().isLength({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isString().isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
],
    captainController.registerCaptain
)

// login route
router.post('/login', [
    body('email').isEmail().withMessage('Please fill a valid email address'),
    body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
]
    , captainController.loginCaptain
)

// profile route
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)

// logout route
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)

module.exports = router;