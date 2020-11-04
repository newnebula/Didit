import React, { Component } from 'react';
import Welcome from './Welcome/Welcome';
import AllDiditsView from './AllDiditsView/AllDiditsView';
import AddADidit from './AddADidit/AddADidit';
import Navigation from './Navigation/Navigation';
import Footer from './Navigation/Footer';
import TitleBar from './Navigation/TitleBar';
import SideNav from './Navigation/SideNav';
import SideButton from './Navigation/SideButton';
import LoginSignup from './LoginSignup/LoginSignup';
import Week from './SeeProgres/Week/Week.js';
import Month from './SeeProgres/Month/Month.js';
import CSS from './App.module.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import {connect} from 'react-redux';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      viewSideNav: false,
    };
  }

  showSideNav = () => {
    console.log("in showSideNav")
    this.setState({viewSideNav: true})
  }
  hideSideNav = () => {
    console.log("in hideSideNav")
    this.setState({viewSideNav: false})
  }


  render(){
    return (
      <Router>
      <div className={CSS.App}>
        <Navigation/>
        <SideButton onClick={this.showSideNav}/>

         <SideNav
                hiding={this.hideSideNav}

        />

        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/login" exact component={LoginSignup} />
          {
            this.props.areWeLoggedIn ?
            <>
              <Route path="/new-didit"  component={AddADidit} />
              <Route path="/today"  component={AllDiditsView} />
              <Route path="/recently"  component={Week} />

            </> : <Redirect to="/login"/>
          }
        </Switch>

        <Footer/>
      </div>
      </Router>
    )
  }
}

const mapsStateToProps = state => {
  return{
    areWeLoggedIn: state.loggedIn
  }
}

export default connect(mapsStateToProps)(App) ;




