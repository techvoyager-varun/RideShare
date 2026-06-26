const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/chat-details/:id', authMiddleware.authAny, rideController.chatDetails)

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'bike' ]).withMessage('Invalid vehicle type'),
    rideController.createRide
)

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    rideController.getFare
)

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide
)


router.post('/cancel',
    authMiddleware.authUser,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.cancelRide
)


const rateLimit = require("express-rate-limit");
const startRideLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { message: "Too many attempts to verify OTP. Please try again after 15 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post('/start-ride',
    startRideLimiter,
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    body('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    rideController.startRide
)

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)


module.exports = router;