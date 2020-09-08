import React from 'react';
import './opponent.css'
function Opponent(props) {

    return (
         
            <div id="opponent" className = "opponent col-xs-7">
                <div id = "indicator1">
                <p>Opponent 1 </p>
                <img  src={props.image && props.opIndicator === 1? props.image :"/assets/tvl_s.png"} />
                </div>
                <div id = "indicator2"> 
                <p>Opponent 2 </p>
                <img  src={props.image && props.opIndicator === 2? props.image :"/assets/tvl_dh.png"} />
                </div>
                <div id = "indicator3">
                <p>Opponent 3</p>
                <img  src={props.image && props.opIndicator === 3? props.image :"/assets/tvl_dv.png"} />
                </div>
                <div id = "indicator4">
                <p>Opponent 4</p>
                <img  src={props.image && props.opIndicator === 4? props.image :"/assets/tvl_rh.png"} />
                </div>
                <div id = "indicator5">
                <p>Opponent 5</p>
                <img  src={props.image && props.opIndicator === 5? props.image :"/assets/tvl_rv.png"} />
                </div>
            </div>
     
    )
}
export default Opponent;