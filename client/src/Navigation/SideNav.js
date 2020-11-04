import React from 'react'
// import PropTypes from 'prop-types'
import CSS from './Navigation.module.scss'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

const SideNav = props => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    const date = dd + '.' + mm + '.' + yyyy;

    let CSSnames=[];

    if(props.areWeShowingSideNav){
         CSSnames = [CSS.SideNavigation, CSS.Open];
    }else{
         CSSnames = [CSS.SideNavigation, CSS.Close];
    }


    return (
        <div className={CSS.SideNavigationContainer} onClick={props.onClose}>
        <div className={CSSnames.join(' ')}>
        <div className={CSS.NavigationItem}>
            <Link className={CSS.NavigationItem} to="/"> Welcome </Link>
        </div>
        <div className={CSS.NavigationItem}>
            <Link className={CSS.NavigationItem} to={"/new-didit"}> New </Link>
        </div>
        <div className={CSS.NavigationItem}>
            <Link className={CSS.NavigationItem} to={"/today"}> Today </Link>
        </div>
        <div className={CSS.NavigationItem}>
            <Link className={CSS.NavigationItem} to={"/recently"}> Recently  </Link>
        </div>
        <div className={CSS.NavigationItem}>
            <Link className={CSS.NavigationItem} to={"/login"}>
                {props.areWeLoggedIn ? "Log out" : "Log in"}</Link>
        </div>
        <div className={CSS.NavigationItemDate}>
            {date}
        </div>
        </div>
    </div>
    )
}

const mapsStateToProps = state => {
    return{
      areWeLoggedIn: state.loggedIn,
      areWeShowingSideNav: state.showingSideNav
    }
  }


  const mapsDispatchToProps = dispatch => {
    return{
      onLogin: () => dispatch({type: 'LOGIN'}),
      onLogout: () => dispatch({type: 'LOGOUT'}),

      onOpen: () => dispatch({type: 'OPENSIDENAV'}),
      onClose: () => dispatch({type:'CLOSESIDENAV'})
    }
  }

export default connect(mapsStateToProps, mapsDispatchToProps)(SideNav)