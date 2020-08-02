import React from 'react';
import './opponent.css'
function Opponent(props) {

    return (
         
            <div id="opponent" className = "col-xs-7">
                <h1>Opponent </h1>
                <img  src={props.image? props.image :"/assets/tvl_s.png"} width="200" height="200" />
            </div>
     
    )
}
export default Opponent;