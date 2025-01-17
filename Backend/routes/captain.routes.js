const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller');

router.post('/register', [ 
    body('fullname.firstName').isString().isLength({min: 3}).withMessage('First name must be at least 3 characters'),
    body('email').isEmail().withMessage('Please fill a valid email address'),
    body('password').isString().isLength({min: 6}).withMessage('Password must be at least 6 characters'),
    body('vehicle.color').isString().isLength({min: 3}).withMessage('Color must be at least 3 characters'),
    body('vehicle.plate').isString().isLength({min: 3}).withMessage('Plate must be at least 3 characters'),
    body('vehicle.capacity').isNumeric().isLength({min: 1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isString().isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
],
    captainController.registerCaptain
)

module.exports = router;