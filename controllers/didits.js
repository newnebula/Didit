const Didit = require("../models/didit");
mongoose = require('mongoose');

exports.postNewDidit = (req, res, next)=>{
    // console.log('In postNewDidit')
    const _text = req.body.text;
    const _userId = req.body.userId;
    const newToken = req.body.newToken;
    const newRefrToken  = req.body.newRefrToken;

    Didit.findOne({text: _text, user:_userId})
    .then(aDidit =>{
        if(!aDidit){
            const newDidit = new Didit({
                _id: new mongoose.Types.ObjectId(),
                text: _text,
                user: _userId,
                days:[]
            })
            newDidit.save()
            .then(result => {
                if(newToken){
                    res.status(201).json({
                        message: 'Post created',
                        post: {result},
                        token: newToken,
                        refrToken: newRefrToken
                    })
                }else{
                    res.status(201).json({
                        message: 'Post created',
                        post: {result}
                    })
                }
            })
            .catch(err=>{next(err)})
        }else{
            if(aDidit.deleted){
                aDidit.deleted = false;
                aDidit.save()
                .then(result=>{

                    if(newToken){
                        res.status(201).json({
                            message: 'Post created',
                            post: {result},
                            token: newToken,
                            refrToken: newRefrToken
                        })
                    }else{
                        res.status(201).json({
                            message: 'Post created',
                            post: {result}
                        })
                    }
                })
            }else{
                try{
                const error = new Error('This allready exists.');
                error.statusCode = 401;
                throw error;}
                catch(err){
                    // console.log('going further with this error:', err)
                    next(err, req, res, next)
                }

            }
        }
    })
}

exports.showAllDidits = (req, res, next)=>{
    // console.log('In showAllDidits')
    // console.log('Here is the user ID I got: ', req.body.userId)
    const newToken = req.body.newToken;
    const newRefrToken  = req.body.newRefrToken;
    const _userId = req.body.userId;
    Didit.find({user:_userId})
    .then(allDidits => {
        // console.log((new Date()).getMinutes())
        if((new Date()).getMinutes() % 7 === 0){
            let n=0;
            let m=0;
            for(d in allDidits){
                if(allDidits[d].deleted === true){
                    n++;
                    let today = new Date();
                    let thirtyfiveDaysAgo = today.setDate(today.getDate()-35);
                    let lastInDays = allDidits[d].days[allDidits[d].days.length-1]
                    if(lastInDays<thirtyfiveDaysAgo || allDidits[d].days.length===0){
                        m++
                        // console.log('about to delete:', allDidits[d].text, lastInDays)
                        allDidits[d].remove()
                    }
                }
            }
            // console.log('so many hidden didits were there:',n)
            // console.log('so many were deleted perm', m)
        }

        if(newToken){
            res.status(200).json({
                allDidits: allDidits,
                token: newToken,
                refrToken: newRefrToken
            })
        }else{
            res.status(200).json({
                allDidits: allDidits
            })
        }
    })
    .catch(err => console.log(err))
}

exports.updateDidit = (req, res, next)=>{
    // console.log('In updateDidit')
    const _id = req.body._id;
    // const _text = req.body.text;
    // const _userId = req.body.userId;
    const newToken = req.body.newToken;
    const newRefrToken  = req.body.newRefrToken;

    Didit.findById(_id)
    .then(result =>{
        let lastInDays = result.days[result.days.length-1]
        if(lastInDays){
            lastInDaysString = lastInDays.toISOString().substr(0,10);
        }else{
            lastInDaysString = 1;
        }

        let nowInString = (new Date).toISOString().substr(0,10);
        if(lastInDaysString !== nowInString){
            result.days.push(new Date());
            result.save();
        }
    })
    .then(result => {
        if(newToken){
            res.status(201).json({
                message: 'Post updated',
                token: newToken,
                refrToken: newRefrToken
            })
        }else{
            res.status(201).json({
                message: 'Post updated',
            })
        }
    })
    .catch(err => console.log(err))
}

exports.deleteDidit = (req, res, next)=>{
    // console.log('In deleteDidit')
    const newToken = req.body.newToken;
    const newRefrToken  = req.body.newRefrToken;
    const _id = req.body._id;
    Didit.findById(_id)
    .then(res =>{
        res.deleted = true;
        res.save();
    })
    .then(result => {
        if(newToken){
            res.status(201).json({
                message: 'Post deleted',
                token: newToken,
                refrToken: newRefrToken
            })

        }else{
            res.status(201).json({
                message: 'Post deleted',
            })
        }
    })
    .catch(err => console.log(err))
}

