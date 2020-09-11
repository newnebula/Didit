const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const Token = require('../models/TokenSchemma');

exports.isAuth = (req,res,next)=>{
    console.log('in is auth')
    const token = req.get('Authorization').split(' ')[1];
    const refrToken = req.get('Authorization').split(' ')[2];

    try{
        const decoded = jwt.verify(refrToken, secrets.refrTokenSecret);
        Token.findOne({token: refrToken})
        .then(blToken => {
            // console.log('I made it to then with found result:', blToken)
            if(blToken){
                const error = new Error('I decoded refrtoken, but it was blacklisted.');
                error.statusCode = 401;
                throw error;
            }
            return true
        })
        .then(alwaysTrue =>{
            req.body.userId = decoded.userId;
            next()
        })
    }catch(err){
        if(err.message === "jwt expired"){
            if(err.expiredAt.getTime()>(((new Date()).getTime())-(20*60*1000))){
                const payload = jwt.verify(refrToken, secrets.refrTokenSecret,{ignoreExpiration:true})
                const newToken = jwt.sign({
                    email: payload.email,
                    userId: payload.userId
                }, secrets.tokenSecret, {expiresIn: "1200s"});

                const newRefreshToken = jwt.sign({
                    email: payload.email,
                    userId: payload.userId
                }, secrets.refrTokenSecret, {expiresIn: "300s"});

                req.body.newToken = newToken;
                req.body.newRefrToken = newRefreshToken;
                req.body.userId = payload.userId;
                next()
            }else{
                const error = new Error('No activity, logged out.');
                error.statusCode = 401;
                throw error
            }
        }else{
            next(err);
        }
    }
}