import React, { Component } from 'react';
import axios from 'axios';
import CSS from './Week.module.scss';
import DoneDiditTile from './DoneDiditTile';
import TwoMonthsModal from './TwoMonths/TwoMonthsModal.js';
import Month from '../Month/Month.js'
import SixtyDays from '../SixtyDays/SixtyDays.js'

class Week extends Component {
    constructor(props){
        super(props);
        this.state = {
            weekDiditsfromServer:[]
        };
    }

    forMountingAndUpdate = () => {
        axios.get('/last-week',
         {headers: {
               Authorization: 'Bearer '+ localStorage.getItem('token') + ' ' + localStorage.getItem('refrToken')
            }})
        .then(res=>{
            console.log('in week response i got',res);
            if(res.data.token){
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('refrToken', res.data.refrToken);
            }
            this.setState({weekDiditsfromServer: res.data.dataToSend})
        })
        .catch(err=>{
            console.log(err)
            this.props.goToLogin();
        })
    }
    componentDidMount(){
        this.forMountingAndUpdate();
    }

    render() {
        const diditsGood = this.state.weekDiditsfromServer.slice(0,15);
        const diditsBad = this.state.weekDiditsfromServer.slice(-3);

        let viewGoodWeekTiles=null;
        if(!(diditsGood.length < 1)){
            viewGoodWeekTiles = diditsGood.map(didit => <DoneDiditTile
                                  text={didit.text}
                                  numberTimes={didit.numberTimes}
                                  key={didit.id} />)
        }

        let viewBadWeekTiles=null;
        if(!(diditsBad.length < 1)){
            viewBadWeekTiles = diditsBad.map(didit => <DoneDiditTile
                                  text={didit.text}
                                  numberTimes={didit.numberTimes}
                                  key={didit.id} />)
        }

        return (
            <div className={CSS.WeekMonthContainer}>

                <p className={CSS.TextOnPage}>
                    Here's what you did most last week:
                </p>

                <div className={CSS.AllDiditsView}>
                    {viewGoodWeekTiles}
                </div>

                <p className={CSS.TextOnPage}>
                Here's how you did by month:
                </p>

                <Month goToLogin={this.props.goToLogin}/>

            </div>
        )
    }
}

export default Week;
