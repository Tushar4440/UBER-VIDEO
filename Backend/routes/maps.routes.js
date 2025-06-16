const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/maps.controller');
const {query} = require('express-validator');

// route for getting lattitude and longitude of address...
router.get('/get-coordinates',
    query('address').isString().isLength({min : 3}),
    authMiddleware.authUser, mapController.getCoordinates
);


// route for getting distance and time between going to 2 addresses...
router.get('/get-distance-time',
    query('origin').isString().isLength({min : 3}),
    query('destination').isString().isLength({min : 3}),
    authMiddleware.authUser, mapController.getDistanceTime
);

// route for getting suggestion...
router.get('/get-suggestions',
    query('input').isString().isLength({min:3}),
    authMiddleware.authUser, mapController.getAutoCompleteSuggestions
);
          
module.exports = router;