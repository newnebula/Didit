import React from 'react'
// import PropTypes from 'prop-types'
import CSS from './Navigation.module.scss'

const Footer = props => {

    return (
        <div className={CSS.FooterContainer}>
            <div className={CSS.FooterItem}> Application by newnebula"at"protonmail.com</div>
            <div className={CSS.FooterItem}> Photo by Sharath G. from Pexels</div>
        </div>
    )
}

// Navigation.propTypes = {}

export default Footer
