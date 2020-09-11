import React from 'react';
import CSS from './SixtyDays.module.scss';
// import PropTypes from 'prop-types'

const SixtyDays = props => {

    const daysArray=props.daysArray;

    let CSSnames=[];

    if(props.showing){
         CSSnames = [CSS.TwoLayers, CSS.Open];
    }else{
         CSSnames = [CSS.TwoLayers, CSS.Close];
    }


    return (
            <div onClick={props.onClick} className={CSS.TwoLayers}>
                <div className={CSS.BackgroundFotoContainer}></div>
                <div className={CSS.GridOnTopContainer}>
                    { daysArray.map( day=>{
                        if(day){
                            return <div className={CSS.CoverTileTransp}></div>
                        }else{
                            return <div className={CSS.CoverTile}></div>
                        }
                    })}
                </div>

            </div>


    )
}
// SixtyDays.propTypes = {
// }
export default SixtyDays
