import React, { Component } from 'react';
import axios from 'axios';
import CSS from './Month.module.scss';
import AskingMonthForm from './AskingMonthForm.js';
import GivenMonth from './GivenMonth'

class Month extends Component {
    constructor(props){
        super(props);
        this.state = {
            dateForMonthView: new Date()
        };
    }

    onChangeMonthPicker = date =>{
        this.setState({dateForMonthView: date });
    }

    componentDidMount(){
        axios.get('/is-connected',
        {headers: {
              Authorization: 'Bearer '+ localStorage.getItem('token') + ' ' + localStorage.getItem('refrToken')
           }})
       .then(res =>{
        if(res.data.token){
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('refrToken', res.data.refrToken);
        }
       })
       .catch(err=>{
            console.log(err)
            this.props.goToLogin();
       })
   }

    render() {

        let viewMonthForm =
            (
                <AskingMonthForm
                    selected={this.state.dateForMonthView}
                    onChange={this.onChangeMonthPicker}
                />
            )

            let viewGivenMonth =
                (
                  <GivenMonth theMonth={this.state.dateForMonthView}/>
                )

        return (
            <div className={CSS.GraphContainerAndForm}>
                {viewMonthForm}
                {viewGivenMonth}
            </div>
        )
    }
}

export default Month;
