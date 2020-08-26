import React from 'react'
// import PropTypes from 'prop-types'
import CSS from './Navigation.module.scss'

const SideButton = props => {




    return (

        <div className={CSS.SideButton} onClick={props.onClick}>
            <div className={CSS.Bar}></div>
            <div className={CSS.Bar}></div>
            <div className={CSS.Bar}></div>
        </div>
    )
}

// Navigation.propTypes = {}

export default SideButton