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

                    // console.log('in 0 , will continue without adding it.')
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
                                    dataLastWeek.splice((Number(j)+1), 0, dataItem)
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






exports.twoMonthData = (req, res, next)=>{

    console.log('In two months', req.body._id)
    const _id = req.body._id;
    const newToken = req.body.newToken;
    const newRefrToken  = req.body.newRefrToken;

    let sixtyLastDates=[];
    for (var i = 1; i < 61; i++){
        let today = new Date();
        // let dayAgo = today.getDate()-Number(i);
        console.log('today', today)
        // console.log('aDayAgo', dayAgo)
        console.log('today to datestring', today.toDateString())
        console.log('will it work', today.setDate(today.getDate()-Number(i)), today.toDateString())

        sixtyLastDates.push(today.toDateString())
    }

    let resultToSend=[];

    Didit.findById(_id)
    .then(result =>{
        console.log(result)
        let lastEntriesUnform=result.days.slice(-60)
        let lastEntries= lastEntriesUnform.map( e => e.toDateString())
        for(i in sixtyLastDates){

            resultToSend.unshift(lastEntries.includes(sixtyLastDates[i]))
        }

        console.log(sixtyLastDates)
        console.log(lastEntries)
    })
    .then(result => {
        if(newToken){
            res.status(201).json({
                data60Days: resultToSend,
                token: newToken,
                refrToken: newRefrToken
            })
        }else{
            res.status(201).json({
                data60Days: resultToSend
            })
        }
    })
    .catch(err => console.log(err))
}