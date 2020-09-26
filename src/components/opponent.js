import React from 'react';
import './opponent.css'
function Opponent(props) {
    var style2 = {visibility:"visible"};
    var style3 = {visibility:"visible"};
    var style4 = {visibility:"visible"};
    var style5 = {visibility:"visible"};
    if(props.max === 1){
         style2 = {visibility:"hidden"};
         style3 = {visibility:"hidden"};
         style4 = {visibility:"hidden"};
         style5 = {visibility:"hidden"};
    }
    else if(props.max == 2){
        style3 = {visibility:"hidden"};
        style4 = {visibility:"hidden"};
        style5 = {visibility:"hidden"};
    }
    else if(props.max == 3){
         style4 = {visibility:"hidden"};
         style5 = {visibility:"hidden"};
    }
    else if(props.max == 4){
        style5 = {visibility:"hidden"};

    }
    
    return (
         
            <div id="opponent" className = "opponent col-xs-7">
                <div className = "indicator1"  id = "indicator1">
                Red 
                <br></br>
                <img id = "flag1" src="./assets/redFlag.jpg" />
                <img  src={props.image && props.opIndicator === 1? props.image :"./assets/red.jpg"} />
                </div>
                <div className = "indicator2"  id = "indicator2" style = {style2}> 
                 Blue 
                 <br></br>
                 <img id = "flag2" src="./assets/redFlag.jpg" />
                <img  src={props.image && props.opIndicator === 2? props.image :"./assets/blue.png"} />
                </div>
                <div className = "indicator3"  id = "indicator3" style = {style3}>
                 Yellow
                 <br></br>
                 <img id = "flag3" src="./assets/redFlag.jpg" />
                <img  src={props.image && props.opIndicator === 3? props.image :"./assets/yellow.png"} />
                </div>
                <div className = "indicator4"  id = "indicator4" style = {style4}>
                 Purple
                 <br></br>
                 <img id = "flag4" src="./assets/redFlag.jpg" />
                <img  src={props.image && props.opIndicator === 4? props.image :"./assets/purple.png"} />
                </div>
                <div className = "indicator5"  id = "indicator5" style = {style5}>
                 Green
                 <br></br>
                 <img id = "flag5" src="./assets/redFlag.jpg" />
                <img  src={props.image && props.opIndicator === 5? props.image :"./assets/green.png"} />
                </div>
            </div>
     
    )
}
export default Opponent;