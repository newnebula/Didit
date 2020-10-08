const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const TokenScr = require('../config/secrets.js');
const Token = require('../models/TokenSchemma');



exports.logout = (req, res, next) => {
    console.log('in logout')
    const token = req.get('Authorization').split(' ')[1];
    const refrToken = req.get('Authorization').split(' ')[2];
    let verRefrToken;
    try{
        verRefrToken = jwt.verify(refrToken, TokenScr.refrTokenSecret)
        new Token({token: refrToken, expired: verRefrToken.exp,_id: new mongoose.Types.ObjectId()}).save();
        res.status(201).json({message: 'User logged out!'});
    }catch(err){
        //console.log('Error in logout function, you were logged out beforehand.')
        const error = new Error('Error in logout function, you were logged out beforehand.');
        error.statusCode = 401;
        throw error;
    }
};

exports.isConnected = (req, res, next) => {
    console.log('In isConnected.')
    const newToken = req.body.newToken;
    const newRefrToken  = req.body.newRefrToken;
    if(newToken){
        res.status(201).json({
            message: 'Connected',
            token: newToken,
            refrToken: newRefrToken
        })
    }else{
        res.status(201).json({
            message: 'Connected'
        })
    }
};

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed.');
        error.statusCode =422;
        error.data = errors.array();
        //console.log('this is the error:',error)
        throw error;
    }

    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 12)
    .then(hashedPw =>{
        const user = new User({
            email: email,
            password: hashedPw
        });
        return user.save();
    })
    .then(result => {
        res.status(201).json({message: 'User created!', userId: result._id});
    })
    .catch(err=>{
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};


exports.login = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;

    User.findOne({email: email})
    .then( user => {
        if(!user){
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
    })
    .then(isEqual =>{
        if(!isEqual){
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser._id.toString()
        }, TokenScr.tokenSecret, {expiresIn: "12h"});

        const refreshToken = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser._id.toString()
        }, TokenScr.refrTokenSecret, {expiresIn: "12h"});
        return {_token: token, _refrToken: refreshToken };
    })
    .then( tokens =>{
        res.status(200).json({token: tokens._token, refrToken: tokens._refrToken , userId: loadedUser._id.toString()});
    })
    .catch(err => {
        console.log('In the catch of login.')
        console.log(err);
        if(!err.statusCode){
            err.status.statusCode = 500;
        }
        next(err);
    })
}