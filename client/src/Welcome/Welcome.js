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
           //props.switchLogin();
        if(res.data.token){
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('refrToken', res.data.refrToken);
        }
       })
       .catch(err=>{
            console.log(err)
       })


    return (
        <div className={CSS.TwoColContainer}>

            <div className={CSS.SidePhotoRight}></div>


            <div className={CSS.WelcomeBcg}>
                Welcome to Didit!
                <div className={CSS.SpaceUnder}/>
                Didit helps making new habits.
                Click on "New" and describe your new habit in a few words. From now on you can call it a "didit". ;-)
                <div className={CSS.SpaceUnder}/>
                Daily visit "Today" and mark every successful didit. Seeing your 60-day progress may boost your motivation and that's what Didit is about.
                <div className={CSS.SpaceUnder}/>
                Go to "Recently" and have a glimpse of your weekly and monthly achievements.
                If it works for you - enjoy the process of becoming that little bit better!
            </div>

        </div>
    )
}
// Navigation.propTypes = {}

export default Welcome
