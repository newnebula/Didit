import React from 'react';
import { Link } from 'react-router-dom';
import CSS from './Navigation.module.scss';
import {connect} from 'react-redux';

const Navigation = props => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    const date = dd + '.' + mm + '.' + yyyy;

    return (
        <div className={CSS.NavigationBar}>
            <div >
                <Link className={CSS.NavigationItem} to="/"> Welcome </Link>
            </div>
            <div>
                <Link className={CSS.NavigationItem} to={"/new-didit"}> New </Link>
            </div>
            <div>
                <Link className={CSS.NavigationItem} to={"/today"}> Today </Link>
            </div>
            <div>
                <Link className={CSS.NavigationItem} to={"/recently"}> Recently  </Link>
            </div>
            <div>
                <Link className={CSS.NavigationItem} to={"/login"}>
                    {props.areWeLoggedIn ? "Log out" : "Log in"}</Link>
            </div>
            <div className={CSS.NavigationItemDate}>
                {date}
            </div>
        </div>
    )
}

const mapsStateToProps = state => {
    return{
      areWeLoggedIn: state.loggedIn
    }
  }

export default connect(mapsStateToProps)(Navigation);
