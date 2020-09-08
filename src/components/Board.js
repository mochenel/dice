import React, { Component } from 'react';
import DrawBoard from './DrawBoard';
import Play from './play';
import Opponent from './opponent';
export default  class Board extends Component {

    constructor(props) {
        
        super(props);
        this.state = {
            player:{ id: 0, prevId: null, play: null,image:null},
            opponent:{
                Indicator1 : { id: 0, prevId: null, play: null, image: null,resetOpponent:false },
                Indicator2 : { id: 0, prevId: null, play: null, image: null,resetOpponent:false },
                Indicator3 : { id: 0, prevId: null, play: null, image: null,resetOpponent:false },
                Indicator4 : { id: 0, prevId: null, play: null, image: null,resetOpponent:false },
                Indicator5 : { id: 0, prevId: null, play: null, image: null,resetOpponent:false },
            }, 
            update:true,
            turn:null,
            disabled:false,
            resetPlayer:false,
            danger:[14,26,32,44,52,62,76,86,88,92,94,98],
            win:null,
            opIndicator:1,
            prevIndicator:1,
            OPPONENTS:["opponent[0]","opponent[1]","opponent[2]","opponent[3]","opponent[4]"],
        }
        this.player = this.player.bind(this);
    }
    isWin(move){
        if(move.id === 100){
            return true;
        }
    }
    isOver(move){
        if(move.id > 100){
            return true;
        }
    }
    getDicePic(number){
        var pic = "";
        if (number === 1) {
            pic = "/assets/one.jpg";
        }
        else if (number === 2) {
            pic = "/assets/two.jpg";
        }
        else if (number === 3) {
            pic = "/assets/three.png";
        }
        else if (number === 4) {
            pic = "/assets/four.png";
        }
        else if (number === 5) {
            pic = "/assets/five.jpg";
        }
        else if (number === 6) {
            pic = "/assets/six.jpg";
        }
       return pic;
    }
    isKill(oponent){
        var container = [];
        var dummy = this.state.opponent;
        if(oponent === "Indicator1"){
            container = ["Indicator2","Indicator3","Indicator4","Indicator5"];
        }
        else if(oponent === "Indicator2"){
            container = ["Indicator1","Indicator3","Indicator4","Indicator5"];
        }
        else if(oponent === "Indicator3"){
            container = ["Indicator1","Indicator2","Indicator4","Indicator5"];
        }
        else if(oponent === "Indicator4"){
            container = ["Indicator1","Indicator2","Indicator3","Indicator5"];
        }
        else if(oponent === "Indicator5"){
            container = ["Indicator1","Indicator2","Indicator3","Indicator4"];
        }
        if(container.length === 4){
            for(var i = 0; i < 4;i++){
                if(dummy[container[i]].id !==0 && dummy[container[i]].id ===dummy[oponent].id){
                    this.resetOpponentState(container[i])
                    return true;
                }
            }
        }
      return false; 
        
    }
    resetOpponentState(indicator){
        var dummy = this.state.opponent;
        
        if(indicator === "Indicator1"){
            dummy.Indicator1 = { id: 0, prevId: null, play: null, image: null,resetOpponent:false }; 
        }
        else if(indicator === "Indicator2"){
            dummy.Indicator2 = { id: 0, prevId: null, play: null, image: null,resetOpponent:false }; 
        }
        else if(indicator === "Indicator3"){
            dummy.Indicator3 = { id: 0, prevId: null, play: null, image: null,resetOpponent:false }; 
        }
        else if(indicator === "Indicator4"){
            dummy.Indicator4 = { id: 0, prevId: null, play: null, image: null,resetOpponent:false }; 
        }
        else if(indicator === "Indicator5"){
            dummy.Indicator5 = { id: 0, prevId: null, play: null, image: null,resetOpponent:false }; 
        }
        if (this.state.opponent[indicator].id) {
            const list = document.getElementById("t"+this.state.opponent[indicator].id);
            list.innerHTML = this.state.opponent[indicator].id;
        }
        this.setState({opponent:dummy})
    }
    oponent() {

        var number = Math.floor(Math.random() * 6) + 1;

        number = 6;
        if(
            this.state.opponent.Indicator1.id === 96 || 
            this.state.opponent.Indicator2.id === 96 ||
            this.state.opponent.Indicator3.id === 96 || 
            this.state.opponent.Indicator4.id === 96 ||
            this.state.opponent.Indicator5.id === 96
            ){
            number = 4;
        }

        var pic = this.getDicePic(number);
        var Indicator = "Indicator"+this.state.opIndicator;
        var prevId = this.state.opponent[Indicator].id;
        var count = this.state.opIndicator; // indicator to show who is actually in play
        this.setState((prevState) => {
            var turn = this.state.OPPONENTS[this.state.prevIndicator]
            var disabled = true;
            var resetpl = false;
            var ID = (parseInt(prevId) + parseInt(number)) ;
            var previousID = prevState.opponent[Indicator].id;
            var win = null;
            // oponent kills player
            if(prevState.player.id !== 0 && prevState.player.id === ID ){
                this.resetPlayerState()
                turn = `opponent[${this.state.prevIndicator}]`;
                disabled = true;
            }

            // oponent kills oponent
            var kill = false;
            if(ID !== 0){
                if(this.isKill(Indicator)){
                    turn = `opponent[${this.state.prevIndicator}]`;
                    disabled = true;
                    kill = true;
                }
            }

            // oponent wins the game
            if(ID === 100){
               win = `opponent[${this.state.prevIndicator}]`;
               ID = 100;
            }
            // oponent stays in the same position
            if(ID > 100){
                ID = prevState.opponent[Indicator].id;
                previousID = prevState.opponent[Indicator].prevId;

            }
            // oponent plays again
            if(number === 6 || kill == true){
                turn = `opponent[${this.state.prevIndicator}]`;
                disabled = true;
            }
            else{
                // set next player or opponent
                if(this.state.opIndicator === 1){
                    turn =  "opponent[1]";
                    count = 2;
                }
                else if(this.state.opIndicator === 2){
                    turn =  "opponent[2]";
                    count = 3;
                }
                else if(this.state.opIndicator === 3){
                    turn =  "opponent[3]";
                    count = 4;
                }
                else if(this.state.opIndicator === 4){
                    turn =  "opponent[4]";
                    count = 5;
                }
                else if(this.state.opIndicator === 5){
                    turn = "player";
                    count = 1;
                    disabled = false;
                }
            }

            // create dummy object for opponent as setState does not handle nested object property modification
            var dummy = {...this.state.opponent};
            dummy[Indicator] = { id:ID, prevId:previousID, play: number, image: pic, resetOpponent:false, }
            return ({
                opponent:dummy ,
                turn: turn,
                disabled:disabled,
                resetPlayer:resetpl,
                win:win,
                opIndicator:count,
                prevIndicator:prevState.opIndicator
            })
        }
        );

    }
    didPlayerKillOpponent(playerId){
        var opponent = this.state.opponent;
        if(opponent.Indicator1.id === playerId){
            this.resetOpponentState("Indicator1");
            return true;

        }
        else if(opponent.Indicator2.id === playerId){
            this.resetOpponentState("Indicator2");
            return true;
        }
        else if(opponent.Indicator3.id === playerId){
            this.resetOpponentState("Indicator3");
            return true;
        }
        else if(opponent.Indicator4.id === playerId){
            this.resetOpponentState("Indicator4");
            return true; 
        }
        else if(opponent.Indicator5.id === playerId){
            this.resetOpponentState("Indicator5");
            return true;
        }
        return false; 
    }
   
    player(e) {
        e.preventDefault();
        e.target.disabled = this.state.disabled;
        var count = 1;
        var number = Math.floor(Math.random() * 6) + 1;
        var pic =this.getDicePic(number);
        var prevId = this.state.player.id;
        this.setState((prevState)=>
        {
            var turn = "opponent[0]";
            var disabled = true;
            var ID = (parseInt(prevId) + parseInt(number));
            var previousID = prevState.player.id;
            var win = null;
          
            if(ID !== 0){
                  // kill opponent 
                 if( this.didPlayerKillOpponent(ID)){
                    turn = "player";
                    disabled = false
                 }
            
            }
            // set win to player if player's id is 100
            if(ID === 100){
               win = "player";
               ID = 100;
            }
            if(ID > 100){
                ID = prevState.player.id;
                previousID = prevState.player.prevId;
            }
            if(number === 6){
                turn = "player";
                disabled = false;
            }
            return ({
                player: { id: ID, prevId: previousID,play: number, image: pic,},
                turn: turn,
                disabled:disabled,
                resetPlayer:false,
                win:win,
                prevIndicator:1
            })
            }
        );
      
       
       // this.movePlayerImage();
      
    } 

    hasDanger(numId){
        if(this.state.danger.includes(numId)){
            return true;
        }
        return false;
    }
/*
the following lifecycle methods are used to give the opponent chance to play based on time interval
*/
    componentDidMount() {
      this.interval = setInterval((prevState)=>{
        this.setState({turn: this.state.turn})
        // is there chance for opponent?
        if(this.state.OPPONENTS.includes(this.state.turn)){
         this.oponent();   
        }
       },
    5000)
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    resetPlayerState(){
        if (this.state.player.id) {
            const list = document.getElementById("t"+this.state.player.id);
             list.innerHTML = this.state.player.id;
        }
        this.setState({player:{ id: 0, prevId: null, play: null,image:null},disabled:true,})

    }
    movePlayerImage() {
        if (this.state.player.id) {
            // check if player is not moving onto fire
            if(this.hasDanger(this.state.player.id)){
                   this.setState((prevState)=>{
                       return{player:{id:0,prevId:0},
                              resetPlayer:false,
                              disabled:true,
                              }
                     })
                   // remove image for start over
                   document.getElementById("t"+this.state.player.prevId).innerHTML = this.state.player.prevId;
                   
                   return;
            }
            if (this.state.player.prevId) {
                const list = document.getElementById("t"+this.state.player.prevId);
                 list.innerHTML = this.state.player.prevId;
            }
           
            const img = "/assets/tvl_t.png";
            const id = document.getElementById("t"+this.state.player.id);
            const imgTag = document.createElement("IMG");
            imgTag.setAttribute("src", img);
            imgTag.setAttribute("id", "pl");
            imgTag.setAttribute("title", "me");
            id.appendChild(imgTag);

        }
    }

    moveOpponentImage() {
        var Indicator = "Indicator"+this.state.prevIndicator;
       
            console.log(this.state)
           if (this.state.opponent[Indicator].id) {
            if(this.state.opponent[Indicator].id == 100){
              //  alert("you lost")
           
            }
              // check if opponent is not moving onto fire
            if(this.hasDanger(this.state.opponent[Indicator].id)){
                   this.setState((prevState)=>{
                    var dummy = {...this.state.opponent}
                    dummy[Indicator] = {id:0,resetOpponent:false,prevId:0};
                       return{
                              opponent:dummy,
                              disabled:false,
                              }
                     })
                   // remove image for start over
                   document.getElementById("t"+this.state.opponent[Indicator].prevId).innerHTML = this.state.opponent[Indicator].prevId;
                   
                   return;
            }
            if (this.state.opponent[Indicator].prevId) {
                const list = document.getElementById("t"+this.state.opponent[Indicator].prevId);
                 list.innerHTML = this.state.opponent[Indicator].prevId;
            }
         
            // display correct image
            let img = "/assets/tvl_s.png";
            if(this.state.prevIndicator === 2){
                img = "/assets/tvl_dh.png";
            }
            else if(this.state.prevIndicator === 3){
                img = "/assets/tvl_dv.png";
            }
            else if(this.state.prevIndicator === 4){
                img = "/assets/tvl_rh.png";
            }
            else if(this.state.prevIndicator === 5){
                img = "/assets/tvl_rv.png";
            }
            let id = document.getElementById("t"+this.state.opponent[Indicator].id);
            const imgTag = document.createElement("IMG");
            imgTag.setAttribute("src", img);
            imgTag.setAttribute("id", "op");
            imgTag.setAttribute("title", `opponent[${this.state.prevIndicator}]`);
            id.appendChild(imgTag);

        }  
             
    }
  
    render() {
        var Indicator = "Indicator"+this.state.prevIndicator;
         this.movePlayerImage();
         this.moveOpponentImage();
        console.log("*********")
         if(this.state.win){
            if(this.state.win === "player"){
                alert("you won")
            }else{
                alert("opponent "+this.state.prevIndicator+ " won")
            }
         }
            return (
                <div>
                    <DrawBoard />
                    <Play disabled = {this.state.disabled} test={this.player} number={this.state.player.play} image={this.state.player.image} />
                    <Opponent opIndicator = {this.state.prevIndicator} number={this.state.opponent[Indicator].play} image={this.state.opponent[Indicator].image} />
                </div>
            );

    }
}
