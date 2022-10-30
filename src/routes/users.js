const express = require('express');
const router = express.Router();
const {register, login, profile, refreshToken, updateUser} = require('../controller/users')
const {protect} = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.get('/profile', protect, profile);
router.put('/update-profile', protect, updateUser);

module.exports = router