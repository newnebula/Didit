import React, { Component } from 'react';
import axios from 'axios';
import MonthGraph from './MonthGraph.js'

class GivenMonth extends Component {
    constructor(props){
        super(props);
        this.state = {
            requestedMonthFromProps: null,
            monthDataFromServer:[]
        };
    }

    doWhenChanges = () =>  {
        if(this.state.requestedMonthFromProps !== this.props.theMonth){

            this.setState({ requestedMonthFromProps: this.props.theMonth});
            const data = {month: this.props.theMonth, userId: localStorage.getItem('userId')};
            axios.post('/get-month', data,
             {headers: {
                   Authorization: 'Bearer '+ localStorage.getItem('token') + ' ' + localStorage.getItem('refrToken')
                }})
            .then(res=>{
                if(res.data.token){
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('refrToken', res.data.refrToken);
                }
                this.setState({monthDataFromServer: res.data.monthData})
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
    componentDidMount(){this.doWhenChanges()}
    componentDidUpdate(){this.doWhenChanges()}

    render() {
        return(

                <MonthGraph monthData={this.state.monthDataFromServer}/>

        )
    }
}

export default GivenMonth;