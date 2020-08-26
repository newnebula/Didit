import React, { Component } from 'react';
import axios from 'axios';
import DiditTile from '../DiditTile/DiditTile.js';
import CSS from './AllDiditsView.module.scss';



class AllDiditsView extends Component {
    constructor(props){
        super(props);
        this.state = {
            didits: []
        };
    }

//
    componentDidMount(){

         axios.get('/all-didits',
         {headers: {
               Authorization: 'Bearer '+ localStorage.getItem('token') + ' ' + localStorage.getItem('refrToken')
            }})
        .then(res=>{
            if(res.data.token){
                console.log(' in didmount of alldidits made it to the if cause found tokens in resp')
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('refrToken', res.data.refrToken);
            }
            const allDidits = res.data.allDidits;

            let newDidits = allDidits.map(el=> {
                let _done = false;
                const today = ((new Date()).toString()).substring(0,15);

                if((new Date(el.days[el.days.length-1])).toDateString() === today){
                    _done = true;
                }
                return {text: el.text, done: _done, _id: el._id, days: el.days, deleted: el.deleted}
            })
            this.setState({didits: newDidits});
        })
        .catch(err=>{
            console.log(err)
            this.props.goToLogin();
        })
    }

    switchDone = (didit_id) => {
        axios
        .post('/update-didit', {_id: didit_id},
        {headers: {
             Authorization: 'Bearer '+ localStorage.getItem('token') + ' ' + localStorage.getItem('refrToken')
          }})
        .then(res=>{
            this.componentDidMount();
        })
        .catch(err => console.log(err))
    }

    clickDelete = (didit_id) => {
        axios
        .post('/delete-didit', {_id: didit_id},
        {headers: {
             Authorization: 'Bearer '+ localStorage.getItem('token') + ' ' + localStorage.getItem('refrToken')
          }})
        .then(res=>{
            this.componentDidMount();
        })
        .catch(err => {
            console.log(err);
            this.props.goToLogin();
         })
    }

    render() {

        const didits = this.state.didits;
        const activeDidits = didits.filter(didit => didit.deleted===false)

        let view =(
            <p className={CSS.messageText}>Click New to add your first didit.</p>
        );

        if(!(activeDidits.length < 1)){
           view = activeDidits.map(didit => <DiditTile
                                  clickDelete={this.clickDelete}
                                  text={didit.text}
                                  _id={didit._id}
                                  status={didit.done}
                                  switchDone={this.switchDone}
                                  key={didit._id} />)
            }

        return (
            <div className={CSS.AllDiditsView}>
                {view}
            </div>
        )
    }
}

export default AllDiditsView;
