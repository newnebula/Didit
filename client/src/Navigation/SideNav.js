import React from 'react'
// import PropTypes from 'prop-types'
import CSS from './Navigation.module.scss'

const SideNav = props => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    const date = dd + '.' + mm + '.' + yyyy;

    let CSSnames=[];

    if(props.showing){
         CSSnames = [CSS.SideNavigation, CSS.Open];
    }else{
         CSSnames = [CSS.SideNavigation, CSS.Close];
    }


    let navView;
    if(props.loggedIn){
        navView =(
            <div className={CSS.SideNavigationContainer}>
            <div className={CSSnames.join(' ')}>
                <div className={CSS.NavigationItemDate}> {date} </div>
                <div className={CSS.NavigationItem} onClick={props.add}> New </div>
                <div className={CSS.NavigationItem} onClick={props.all}> Didits </div>
                <div className={CSS.NavigationItem} onClick={props.week}> Week </div>
                <div className={CSS.NavigationItem} onClick={props.month}> Month </div>
                <div className={CSS.NavigationItem} onClick={props.logout}> Logout </div>
            </div>
        </div>
        )
    }else{
        navView =(
            <div className={CSS.SideNavigationContainer}>
            <div className={CSSnames.join(' ')}>
                <div className={CSS.NavigationItemDate}> {date} </div>
                <div className={CSS.NavigationItem} onClick={props.add}> New </div>
                <div className={CSS.NavigationItem} onClick={props.all}> Didits </div>
                <div className={CSS.NavigationItem} onClick={props.week}> Week </div>
                <div className={CSS.NavigationItem} onClick={props.month}> Month </div>
                <div className={CSS.NavigationItem} onClick={props.loginSignup}> Login </div>
            </div>
        </div>
        )
    }

    return (
        navView
    )
}

// Navigation.propTypes = {}

export default SideNav