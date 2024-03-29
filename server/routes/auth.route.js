const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middleware/auth');


// /api/auth/...
router.post('/register',authController.register);
router.post('/signin',authController.signin);
router.get('/isauth',auth(),authController.isauth)
// router.get('/dog',auth('readAny','dog'),authController.dog) // to check for this turotial go for video number 73



module.exports = router;