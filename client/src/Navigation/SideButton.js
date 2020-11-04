import React from 'react'
// import PropTypes from 'prop-types'
import CSS from './Navigation.module.scss'
import {connect} from 'react-redux';


const SideButton = props => {

    return (

        <div className={CSS.SideButton} onClick={props.onOpen}>
            <div className={CSS.Bar}></div>
            <div className={CSS.Bar}></div>
            <div className={CSS.Bar}></div>
        </div>
    )
}

const mapsDispatchToProps = dispatch => {
    return{
      onLogin: () => dispatch({type: 'LOGIN'}),
      onLogout: () => dispatch({type: 'LOGOUT'}),

      onOpen: () => dispatch({type: 'OPENSIDENAV'}),
      onClose: () => dispatch({type:'CLOSESIDENAV'})
    }
  }

export default connect(null, mapsDispatchToProps)(SideButton)