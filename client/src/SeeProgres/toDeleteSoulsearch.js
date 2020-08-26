import React, { Component } from 'react';
import axios from 'axios';
import CSS from './Soulsearch.module.scss';
import DoneDiditTile from './DoneDiditTile';
import AskingMonthForm from './AskingMonthForm.js';
import GivenMonth from './GivenMonth'




class Soulsearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            weekDiditsfromServer:[],
            dateForMonthView: new Date(),
            showMonth: false
        };
    }

    componentDidMount(){
        console.log('in componentDidMont of Soulsearch')
        this.setState({showMonth:false})
        axios.get('/last-week',
         {headers: {
               Authorization: 'Bearer '+ localStorage.getItem('token') + ' ' + localStorage.getItem('refrToken')
            }})
        .then(res=>{
            this.setState({weekDiditsfromServer: res.data.dataToSend})
        })
        .catch(err=>{
            console.log(err)
            this.props.goToLogin();
        })
    }


    handleSubmitMonthPicker = e =>{
        e.preventDefault();
        this.setState({showMonth: true})
      }

    onChangeMonthPicker = date =>{
        this.setState({dateForMonthView: date });
    }


    render() {
        const didits = this.state.weekDiditsfromServer

        let viewCommunicate =
            (
                <p className={CSS.messageText}>Nothing done last week!</p>
            )

        let viewWeekTiles=null;
        if(!(didits.length < 1)){
            viewCommunicate =  <p className={CSS.DoneDiditTileText}> What you did last week: </p>;
            viewWeekTiles = didits.map(didit => <DoneDiditTile
                                  text={didit.text}
                                  numberTimes={didit.numberTimes}
                                  key={didit.text} />)
        }

        let viewMonthForm =
            (
                <AskingMonthForm
                    selected={this.state.dateForMonthView}
                    onChange={this.onChangeMonthPicker}
                    monthFormSubmit={this.handleSubmitMonthPicker}
                />
            )


        let viewGivenMonth=null;
        if(this.state.showMonth){
            viewGivenMonth =
                (
                  <GivenMonth theMonth={this.state.dateForMonthView}/>
                )
            viewCommunicate=null;
            viewWeekTiles=null;

        }

        return (
            <div className={CSS.AllDiditsView}>
                {viewMonthForm}
                {/* {viewCommunicate}   */}
                {/* {viewWeekTiles} */}
                {viewGivenMonth}
            </div>
        )
    }
}

export default Soulsearch;
