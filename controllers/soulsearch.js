const Didit = require("../models/didit");
mongoose = require('mongoose');

exports.weekData = (req, res, next)=>{
    console.log('In weekData');
    console.log('Here is the user ID I got: ', req.body.userId);
    const _userId = req.body.userId;
    const newToken = req.body.newToken;
    const newRefrToken  = req.body.newRefrToken;

    Didit.find({user:_userId})
    .then(allDidits => {
        let dataLastWeek=[];
        for(d in allDidits){

            let today = new Date();
            let sevenDaysAgo = today.setDate(today.getDate()-7);
            let daysArray = allDidits[d].days;
            var countDays = 0;
            for(i in daysArray){
                if(daysArray[i] > sevenDaysAgo){
                    countDays++
                }
            }

            let dataItem = {id: allDidits[d]._id, text: allDidits[d].text, numberTimes: countDays}
            // console.log('this will be sorted:', dataItem)
            if(dataLastWeek.length==0 & dataItem.numberTimes!=0){
                // console.log('adding first item to the list')q
                dataLastWeek.push(dataItem);
            }else{
                if(dataItem.numberTimes==0){

                    // console.log('in 0 , will continue')
                    continue
                }else{
                    if(dataItem.numberTimes <= dataLastWeek[0].numberTimes){
                        // console.log('in 1');
                        // console.log('the first in existing list', dataLastWeek[0]);
                        dataLastWeek.unshift(dataItem)
                    }else{
                        if(dataItem.numberTimes >= dataLastWeek[(dataLastWeek.length-1)].numberTimes){
                            // console.log('in 2');
                            dataLastWeek.push(dataItem)
                        }else{
                            for(j in dataLastWeek){
                                // console.log('in3, the j is', j);
                                // console.log('j',dataLastWeek[j]);
                                // console.log('j+1',dataLastWeek[(Number(j)+1)]);
                                if( dataItem.numberTimes>=dataLastWeek[j].numberTimes & dataItem.numberTimes<dataLastWeek[(Number(j)+1)].numberTimes){
                                    dataLastWeek.splice(j, 0, dataItem)
                                    break
                                }
                            }
                        }
                    }
                }
            }
        }
        let dataToSend=[];
        for(z in dataLastWeek){
            dataToSend.unshift(dataLastWeek[z])
        }
        if(newToken){
            res.status(200).json({
                message: 'Weekdata',
                dataToSend: dataToSend,
                token: newToken,
                refrToken: newRefrToken
            })

        }else{
            res.status(200).json({
                message: 'Weekdata',
                dataToSend: dataToSend
            })
        }

    })
    .catch(err => console.log(err))
}

exports.monthData = (req, res, next)=>{
    console.log('In monthData')
    const _userId = req.body.userId;
    const theMonth = new Date(req.body.month);
    const newToken = req.body.newToken;
    const newRefrToken  = req.body.newRefrToken;

    function daysInMonth (month, year) {
        // Use 1 for January, 2 for February, etc.
        return new Date(year, month, 0).getDate();
      }

    let lengthOfTheMonth = daysInMonth( theMonth.getMonth()+1, theMonth.getFullYear())
    let monthData = new Array(lengthOfTheMonth).fill(0);

    Didit.find({user:_userId})
    .then(allDidits => {
        for(d in allDidits){
            let aDidit = allDidits[d]
            for(i in aDidit.days){
                let aDate = aDidit.days[i];
                if(aDate.getMonth()===theMonth.getMonth() && aDate.getFullYear()===theMonth.getFullYear()){
                    monthData[(aDate.getDate()-1)] = ((monthData[(aDate.getDate()-1)]+1) )
                }
            }
        }

        if(newToken){
            res.status(200).json({
                message: 'Monthdata',
                monthData: monthData,
                token: newToken,
                refrToken: newRefrToken
            })
        }else{
            res.status(200).json({
                message: 'Monthdata',
                monthData: monthData
            })
        }
    })
    .catch(err => console.log(err))
}

