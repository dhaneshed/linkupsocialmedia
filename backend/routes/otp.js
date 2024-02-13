// routes/otpRoutes.js
const express = require('express');
const otpController = require('../controllers/otp');
const router = express.Router();
router.route('/send-otp').post(otpController.sendOTP);
module.exports = router;