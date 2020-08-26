const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const User = require('../models/user');
const authController = require('../controllers/auth');
const isAuthFile = require('../middleware/is-auth');
isAuth=isAuthFile.isAuth;

router.get('/is-connected', isAuth, authController.isConnected)

router.get('/logout', authController.logout)

router.post('/login', authController.login);

router.post('/signup',[
        body('email').isEmail().withMessage('Please enter a valid email.')
        .custom((value,{req})=>{
            return User.findOne({email: value}).then(userDoc => {
                if (userDoc){
                    return Promise.reject('Email address already exists!');
                }
            })
        })
        .normalizeEmail(),
        body('password').trim().isLength({min: 3})
    ],
authController.signup);

module.exports = router;
