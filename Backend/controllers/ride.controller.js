const rideservice = require('../services/ride.service')
const { validationResult } = require('express-validator')
const mapsService = require('../services/maps.service')
const { sendMessageToSocketId } = require('../socket')
const rideModel = require('../models/ride.model.js')

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;
    try {
        const fare = await rideservice.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideservice.createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);
        // console.log(ride);

        const pickUpCoordinates = await mapsService.getAddressCoordinates(pickup);
        // console.log(pickUpCoordinates)
        const captainsInRadius = await mapsService.getCaptainsInRadius(pickUpCoordinates.ltd, pickUpCoordinates.lng, 2);
        // console.log(captainsInRadius);
        ride.otp = "";

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
        // console.log(rideWithUser)
        captainsInRadius.map(captain => {
            // console.log(captain, ride);
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })

        })
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }


};

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;
    try {
        const ride = await rideservice.confirmRide({ rideId, captain: req.captain });
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId, otp } = req.query;

    try {
        const ride = await rideservice.startRide({ rideId, otp, captain: req.captain });
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

};

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;
    try {
        const ride = await rideservice.endRide({ rideId, captain: req.captain });
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })
        return res.status(200).json(ride);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message });
    }
};