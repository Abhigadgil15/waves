const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const usersController = require('../controllers/user.controller');

router.route('/profile')
.get(auth('readOwn','profile'),usersController.profile)
.patch(auth('updateOwn','profile'), usersController.updateProfile)


router.patch('/email',auth('updateOwn','profile'), usersController.updateUserEmail)
router.get('/verify', usersController.verifyAccount); // remember that it's not necessary that user will be authenticated so we dont adda auth to check if the user is authorized. We just need to verify the token
module.exports = router;