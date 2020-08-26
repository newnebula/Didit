import React from 'react'
// import PropTypes from 'prop-types'
import CSS from './Welcome.module.scss'
import axios from 'axios';

const Welcome = (props) => {
    console.log(props)


        axios.get('/is-connected',
        {headers: {
              Authorization: 'Bearer '+ localStorage.getItem('token') + ' ' + localStorage.getItem('refrToken')
           }})
       .then(res => {
           console.log('in welcome got answer from server');
           props.switchLogin();
        if(res.data.token){
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('refrToken', res.data.refrToken);
        }
       })
       .catch(err=>{
            console.log(err)
       })






    return (

        <div className={CSS.welcomeBcg}>
            <p className={CSS.title}>Welcome to didit!</p>

            <p>Didit helps making new habbits.</p>
            <p>Click on New and describe your new habbit with one sentence. From now on you can call it a "didit". ;-)</p>
            <p>Every day you have a chance to set a "checked!" next to each of your didits and
            analyze your weekly or monthly progress.</p>
            <p>Seeing all the checked didits may boost your motivation, while working on these new habbits.</p>
        </div>


    )
}

// Navigation.propTypes = {}

export default Welcome
