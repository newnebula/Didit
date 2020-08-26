import React from 'react'
// import PropTypes from 'prop-types'
import CSS from './DiditTile.module.scss'

const DiditTile = props => {

    const debounce = (fn, delay) => {
        console.log('in debounce')
        let timeOutId;
        return function(...args) {
          if(timeOutId) {
            clearTimeout(timeOutId);
          }
          timeOutId = setTimeout(() => {
            fn(...args);
          },delay);
        }
      }


    let view = null;

    let n=0;

    let onClick = () => {
        if(n===0){
            n=n+1;
            debounce(props.switchDone(props._id), 1000)
        }
    }

    if(props.status){
        view = (
            <div className={CSS.DiditTileDone}>
                <div className={CSS.DiditTileText}>{props.text}</div>
                <div className={CSS.DiditTileButtonDone}> didit! </div>
            </div>
        )
    }else{
        view = (
            <div className={CSS.DiditTile}>
                <div className={CSS.DiditTileText}>{props.text}</div>
                <div className={CSS.ButtonsContainer}>

                <div className={CSS.DiditTileButton}
                onClick={onClick}> didit! </div>

                <div className={CSS.DiditTileButtonDelete}
                onClick={() => props.clickDelete(props._id)}> delete </div>
                </div>
            </div>
        )
    }
    return (
        view
    )
}

export default DiditTile