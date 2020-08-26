import React, { Component } from 'react';
import axios from 'axios';
import CSS from './Week.module.scss';
import DoneDiditTile from './DoneDiditTile';

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
        const didits = this.state.weekDiditsfromServer
        let viewWeekTiles=null;
        if(!(didits.length < 1)){
            viewWeekTiles = didits.map(didit => <DoneDiditTile
                                  text={didit.text}
                                  numberTimes={didit.numberTimes}
                                  key={didit.id} />)
        }

        return (
            <div className={CSS.AllDiditsView}>
                {viewWeekTiles}
            </div>
        )
    }
}

export default Week;
