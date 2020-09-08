import React from 'react';
import './play.css'
function Play(props) {

    return (
        <div id = "player" className = " player col-xs-3">
            <form>
                <button disabled = {props.disabled} className="btn btn-primary" onClick={props.test}> Play </button> <br /><br /><br />
                <img src={props.image? props.image :"/assets/tvl_t.png"} />

            </form>
            
            </div>
           

        )
}
export default Play;