import React from 'react'
import CSS from './TwoMonths.module.scss'


const CalendarDay = (props) => {

    let _className = CSS.notDoneDay;
    if(props.doneOrNot===true){
        _className = CSS.doneDay;
    }
    return (
        <div className={_className}>
            {props.dayNumber}
        </div>
    )
}

export default CalendarDay
