import React, { Component } from 'react';
import DrawBoard from './DrawBoard';
import Play from './play';
import Opponent from './opponent';
export default  class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            player:{ id: 0, prevId: null, play: null,image:null},
            opponent:{ id: 0, prevId: null, play: null, image: null }, 
            turn:null,
            disabled:false,
            resetPlayer:false,
            resetOpponent:false,
            danger:[14,26,32,36,44,48,52,62,76,86,88,92,94,98],
            win:null,
        }
        this.player = this.player.bind(this);
    }
    oponent() {
        
        var number = Math.floor(Math.random() * 6) + 1;
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
        var prevId = this.state.opponent.id;
        this.setState((prevState) => {
            var turn = "player";
            var disabled = false;
            var resetpl = false;
            var ID = (parseInt(prevId) + parseInt(number)) ;
            var previousID = prevState.opponent.id;
            var win = null;
            if(prevState.player.id != 0 && prevState.player.id === ID ){
                // opponent takes player's postion(player start over)
                 turn = "opponent";
                 disabled = true;
                 resetpl = true;
            }
            if(ID === 100){
               win = "opponent";
               ID = 100;
            }
            if(ID > 100){
                ID = prevState.opponent.id;
                previousID = prevState.opponent.prevId;

            }
            if(number === 6){
                turn = "opponent";
                disabled = true;
            }
            return ({
                opponent: { play: number, image: pic, id:ID, prevId:previousID },
                turn: turn,
                disabled:disabled,
                resetPlayer:resetpl,
                resetOpponent:false,
                win:win
            })
        }
        );

    }
   
    player(e) {
        e.preventDefault();
        e.target.disabled = this.state.disabled;
        var number = Math.floor(Math.random() * 6) + 1;
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
        var prevId = this.state.player.id;
        this.setState((prevState)=>
        {
            var turn = "opponent";
            var disabled = true;
            var resetOp = false;
            var ID = (parseInt(prevId) + parseInt(number));
            var previousID = prevState.player.id;
            var win = null;
            if(prevState.opponent.id != 0 && prevState.opponent.id === ID){
                 turn = "player";
                 disabled = false
                 resetOp = true 
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
                player: { play: number, image: pic, id: ID, prevId: previousID },
                turn: turn,
                disabled:disabled,
                resetPlayer:false,
                resetOpponent:resetOp,
                win:win
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
        if(this.state.turn === "opponent"){
         this.oponent(); 
         // document.getElementById("play-btn").style.disabled;  
        }
       },
    4000)
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    movePlayerImage() {

         if(this.state.resetPlayer === true){
            // reset player to zero position
            this.setState((prevState)=>{
                       return{player:{id:0,prevId:0},
                              resetPlayer:false,
                              disabled:true,
                              }
                     })
            this.oponent();
        }
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
            console.log(id)
            const imgTag = document.createElement("IMG");
            imgTag.setAttribute("src", img);
            imgTag.setAttribute("id", "pl");
            imgTag.setAttribute("title", "me");
            id.appendChild(imgTag);

        }
    }

    moveOpponentImage() {
        if(this.state.resetOpponent === true){
            // reset opponent to zero position
            this.setState((prevState)=>{
                       return{opponent:{id:0,prevId:0},
                              resetOpponent:false,
                              disabled:false,}

                     })
        }

           if (this.state.opponent.id) {
            if(this.state.opponent.id == 100){
              //  alert("you lost")
           
            }
              // check if opponent is not moving onto fire
            if(this.hasDanger(this.state.opponent.id)){
                   this.setState((prevState)=>{
                       return{opponent:{id:0,prevId:0},
                              resetOpponent:false,
                              disabled:false,
                              }
                     })
                   // remove image for start over
                   document.getElementById("t"+this.state.opponent.prevId).innerHTML = this.state.opponent.prevId;
                   
                   return;
            }
            
            if (this.state.opponent.prevId) {
                const list = document.getElementById("t"+this.state.opponent.prevId);
                list.innerHTML = this.state.opponent.prevId;
            }
            const img = "/assets/tvl_s.png";
            let id = document.getElementById("t"+this.state.opponent.id);
            const imgTag = document.createElement("IMG");
            imgTag.setAttribute("src", img);
            imgTag.setAttribute("id", "op");
            imgTag.setAttribute("title", "opponent");
            id.appendChild(imgTag);

        }  
             
    }
  
    render() {
        
         this.movePlayerImage();
         this.moveOpponentImage();
         if(this.state.win){
            if(this.state.win === "player"){
                alert("you won")
            }else{
                alert("you lost")
            }
         }
            return (
                <div>
                    <DrawBoard />
                    <Play disabled = {this.state.disabled} test={this.player} number={this.state.player.play} image={this.state.player.image} />
                    <Opponent number={this.state.opponent.play} image={this.state.opponent.image} />
                </div>
            );

    }
}
