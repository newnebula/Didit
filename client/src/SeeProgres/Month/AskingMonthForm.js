import React from 'react'
import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import CSS from './Month.module.scss'

const AskingMonthForm = props => {
    return (
        <div className={CSS.FormContainer}>
                <form className={CSS.DateForm}>
                    <Datepicker
                        className={CSS.Input}
                        selected={props.selected}
                        onChange={date => props.onChange(date)}
                        // isClearable
                        placeholderText="Pick a month!"
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        showFullMonthYearPicker/>
                </form>
    </div>
    )
}

export default AskingMonthForm