import React from 'react'
import CSS from './Week.module.scss'


const DiditTile = props => {
    return (
        <div className={CSS.DoneDiditTile}>
            <p className={CSS.DoneDiditTileText}>{props.text}</p>
            <div className={CSS.DoneDiditTileNumber}> {props.numberTimes} </div>
        </div>
    )
}
export default DiditTile