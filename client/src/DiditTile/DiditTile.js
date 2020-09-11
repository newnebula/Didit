import React, {useState} from 'react'
// import PropTypes from 'prop-types'
import CSS from './DiditTile.module.scss'
import axios from 'axios';
import SixtyDays from '../SeeProgres/SixtyDays/SixtyDays'

const DiditTile = props => {

    const [theSixty, setTheSixty]=useState(<div></div>);
    const onClickOfSixty = () => {
        console.log('in on click')
        setTheSixty(<div></div>)
    }

    const getAndShow60 = () => {
        axios.post('/last60days',{_id: props._id},
        {headers: {
              Authorization: 'Bearer '+ localStorage.getItem('token') + ' ' + localStorage.getItem('refrToken')
           }})
       .then(res=>{
           if(res.data.token){
               console.log(' in didmount of alldidits made it to the if cause found tokens in resp')
               localStorage.setItem('token', res.data.token);
               localStorage.setItem('refrToken', res.data.refrToken);
           }

           setTheSixty(<SixtyDays onClick={()=>onClickOfSixty()} daysArray={res.data.data60Days}/>);

        })
       .catch(err=>{
           console.log(err)
       })
   }

    let view = null;
    let onClick = () => {
        props.switchDone(props._id)
    }

    if(props.status){
        view = (
            <div className={CSS.DiditTileDone}>
                <div className={CSS.DiditTileText}>{props.text}</div>
                <div className={CSS.DiditTileButtonDone}> didit! </div>
                <div className={CSS.DiditTileSeeButton}
                onClick={getAndShow60}> Progres </div>
            </div>
        )
    }else{
        view = (
            <div className={CSS.DiditTile}>
                <div className={CSS.DiditTileText}>{props.text}</div>

                <div className={CSS.ButtonsContainer}>

                    <div className={CSS.DiditTileButton}
                    onClick={onClick}> Did it today! </div>

                    <div className={CSS.DiditTileSeeButton}
                    onClick={getAndShow60}> Progres </div>

                    <div className={CSS.DiditTileButtonDelete}
                    onClick={() => props.clickDelete(props._id)}> delete </div>
                </div>
            </div>
        )
    }
    return (
        [view,theSixty]
    )
}

export default DiditTile