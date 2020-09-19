import React from 'react';
import './restart.css'
function Restart(props) {

    return (
        <div id = "restart" className = "restart col-xs-3">
    
                <button  className="btn btn-primary" onClick={props.restart}> Restart </button> <br /><br /><br />
     
            
            </div>
           

        )
}
export default Restart;