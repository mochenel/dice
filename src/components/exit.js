import React from 'react';
import './exit.css'
function Exit(props) {

    return (
        <div id = "exit" className = "exit col-xs-3">
    
                <button  className="btn btn-primary" onClick={props.exit} > Exit </button> <br /><br /><br />
     
            </div>
           

        )
}
export default Exit;