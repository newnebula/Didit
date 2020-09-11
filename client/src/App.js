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


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      pages:{
        viewWelcome: true,
        viewLoginSignup: false,
        viewAll: false,
        viewAdd: false,
        viewSoulsearch: false,
        viewWeek: false,
        viewMonth: false
      },
      viewSideNav: false,
      loggedIn: false
    };
  }

  showSideNav = () => {
    console.log("in showSideNav")
    this.setState({viewSideNav: true})
  }

  setView = (chosenKey) =>{
    console.log('setting veiw', chosenKey);
    let newPagesState={...this.state.pages};

    for (let [key] of Object.entries({...this.state.pages})) {

      newPagesState[key]= false;
      if(key===chosenKey){
        newPagesState[key]= true;
      }
    }

    this.setState({pages: newPagesState});
    this.setState({viewSideNav:false})
  }

  whenNoActivity =()=>{
    this.setView('viewLoginSignup');
    this.setState({loggedIn: false});
  }

  logInSwitch=()=>{
    console.log("in logInSwitch")
    this.setView('viewAll');
    this.setState({loggedIn: true});

  }

  logout =()=>{
    axios.get('/logout',
        {headers: {
              Authorization: 'Bearer '+ localStorage.getItem('token') + ' ' + localStorage.getItem('refrToken')
           }})
       .then(res =>{
        this.setView('viewLoginSignup');
        this.setState({loggedIn: false});
       })
       .catch(err=>{
          // console.log('Catching call to server in logout.Error:')
          // console.log(err)
      })
    }

  render() {
  let forView = 'viewWelcome';
  let view = (<Welcome switchLogin={this.logInSwitch}/>);
  for (let [key, value] of Object.entries({...this.state.pages})) {
    if(value===true){
        forView = key
    }
  }

    switch (forView) {
      case 'viewLoginSignup':
        view = (<LoginSignup logInSwitch={this.logInSwitch} showAllDidits={()=>this.setView('viewAll')}/>);
        break;
      case 'viewAll':
        view = (<AllDiditsView goToLogin={this.whenNoActivity}/>);
        break;
      case 'viewAdd':
        view = (<AddADidit goToLogin={()=>this.whenNoActivity()}/>);
        break;
      case 'viewWeek':
        view = (<Week goToLogin={()=>this.whenNoActivity()}/>);
        break;
      case 'viewMonth':
        view = (<Month goToLogin={()=>this.whenNoActivity()}/>);
        break;
      default:
         view = (<Welcome switchLogin={this.logInSwitch}/>)
  }

    return (
      <div className={CSS.App}>

        <Navigation
        welc={()=>this.setView('viewWelcome')}
        all={()=>this.setView('viewAll')}
        add={()=>this.setView('viewAdd')}
        week={()=>this.setView('viewWeek')}
        month={()=>this.setView('viewMonth')}
        loginSignup={()=>this.setView('viewLoginSignup')}
        logout={this.logout}
        loggedIn={this.state.loggedIn}
        />

        <SideButton onClick={this.showSideNav}/>

        <SideNav
                showing={this.state.viewSideNav}
                welc={()=>this.setView('viewWelcome')}
                all={()=>this.setView('viewAll')}
                add={()=>this.setView('viewAdd')}
                week={()=>this.setView('viewWeek')}
                month={()=>this.setView('viewMonth')}
                loginSignup={()=>this.setView('viewLoginSignup')}
                logout={this.logout}
                loggedIn={this.state.loggedIn}
        />
        {view}
        <Footer/>
      </div>
    )
  }
}
export default App;




