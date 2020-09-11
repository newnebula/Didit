import React from 'react'
import CalendarDay from './CalendarDay.js'
import CSS from './TwoMonths.module.scss'

const TwoMonthsModal = (props) => {
    // let numbDays = props.numbDays; //0
    // let doneDays = props.doneDays; //[]

    let numbDays = 31; //0
    let doneDays = [1,13,30]; //[]

    let arrayForMap=[];
    for (var i = 1; i < (numbDays+1); i++){
        if(doneDays.includes(Number(i))){
            arrayForMap.push({day:Number(i), done: true})
        }else{
            arrayForMap.push({day:Number(i), done: false})
        }
    }
    console.log("arrayForMap",arrayForMap);

    let daysInMonthView=arrayForMap.map(day => <CalendarDay
        doneOrNot={day.done}
        dayNumber={day.day}>
    </CalendarDay>)

    return (
        <div className={CSS.monthContainer}>
            {daysInMonthView}
        </div>
    )
}

export default TwoMonthsModal

