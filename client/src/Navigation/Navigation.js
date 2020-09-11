import React from 'react'
// import PropTypes from 'prop-types'
import CSS from './Navigation.module.scss'

const Navigation = props => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    const date = dd + '.' + mm + '.' + yyyy;



    let navView;
    if(props.loggedIn){
        navView =(
        <div className={CSS.NavigationBar}>
            <div className={CSS.NavigationItem} onClick={props.welc}> Welcome </div>
            <div className={CSS.NavigationItem} onClick={props.add}> New </div>
            <div className={CSS.NavigationItem} onClick={props.all}> Today </div>
            <div className={CSS.NavigationItem} onClick={props.week}> Recently </div>
            {/* <div className={CSS.NavigationItem} onClick={props.month}> 60 Days </div> */}
            {/* <div className={CSS.NavigationItem} onClick={props.logout}> Settings </div> */}
            <div className={CSS.NavigationItem} onClick={props.loginSignup}> Logout </div>
            <div className={CSS.NavigationItemDate}> {date} </div>
        </div>
        )
    }else{
        navView =(
        <div className={CSS.NavigationBar}>
             <div className={CSS.NavigationItem} onClick={props.welc}> Welcome </div>
            <div className={CSS.NavigationItem} onClick={props.add}> New </div>
            <div className={CSS.NavigationItem} onClick={props.all}> Today </div>
            <div className={CSS.NavigationItem} onClick={props.week}> Recently </div>
            {/* <div className={CSS.NavigationItem} onClick={props.month}> 60 Days </div> */}
            {/* <div className={CSS.NavigationItem} onClick={props.loginSignup}> Settings </div> */}
            <div className={CSS.NavigationItem} onClick={props.loginSignup}> Login </div>
            <div className={CSS.NavigationItemDate}> {date} </div>
        </div>
        )
    }

    return (
        navView
    )
}

// Navigation.propTypes = {}

export default Navigation
