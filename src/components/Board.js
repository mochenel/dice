import React, { Component } from 'react';
import DrawBoard from './DrawBoard';
import Play from './play';
import Opponent from './opponent';
import queryString from "query-string";
import Restart from './restart'
import Exit from './exit'
import './Board.css'
import { Redirect } from 'react-router-dom';
export default  class Board extends Component {

    constructor(props) {
    
        super(props);
        const {max} = queryString.parse(this.props.location.search)
        if(max){

        }
        else{
            max = 1;
        }
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
            danger:[14,26,32,36,44,48,52,62,76,86,88,92,94,98],
            win:null,
            opIndicator:1,
            prevIndicator:1,
            OPPONENTS:["A1","A2","A3","A4","A5"],
            max:parseInt(max),
            exit:false,
            current:{player:true,p1:false,p2:false,p3:false,p4:false,p5:false}
        }
        this.player = this.player.bind(this);
        this.restart = this.restart.bind(this);
        this.exit = this.exit.bind(this);
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
            pic = "./assets/one.jpg";
        }
        else if (number === 2) {
            pic = "./assets/two.jpg";
        }
        else if (number === 3) {
            pic = "./assets/three.png";
        }
        else if (number === 4) {
            pic = "./assets/four.png";
        }
        else if (number === 5) {
            pic = "./assets/five.jpg";
        }
        else if (number === 6) {
            pic = "./assets/six.jpg";
        }
       return pic;
    }
    isKill(oponent,ID){
        var container = [];
        var dummy = {...this.state.opponent};
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
                if(dummy[container[i]].id !==0 && dummy[container[i]].id ===ID){
                   // kill him
                    return container[i];
                }
            }
        }
      return null; 
        
    }
    isPlayerKilled(ID){
        if(ID !==0 && ID === this.state.player.id){
            return true;
        }
        return false;
    }
   
    resetOpponentState(indicator){
        var dummy = {...this.state.opponent};
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
     
        this.setState({opponent:dummy})
      
    }
    getIndicator(){
       
        const curr = this.state.current;
        if(curr.player === true){
            return "player";
        }
        else if(curr.p1 === true){
        document.getElementById("flag1").src = "./assets/greenFlag.png";
        document.getElementById("flag2").src = "./assets/redFlag.jpg";
        document.getElementById("flag3").src = "./assets/redFlag.jpg";
        document.getElementById("flag4").src = "./assets/redFlag.jpg";
        document.getElementById("flag5").src = "./assets/redFlag.jpg";
            return "Indicator1";
        }
        else if(curr.p2 === true){
            document.getElementById("flag1").src = "./assets/redFlag.jpg";
            document.getElementById("flag2").src = "./assets/greenFlag.png";
            document.getElementById("flag3").src = "./assets/redFlag.jpg";
            document.getElementById("flag4").src = "./assets/redFlag.jpg";
            document.getElementById("flag5").src = "./assets/redFlag.jpg";
            return "Indicator2";
        }
        else if(curr.p3 === true){
            document.getElementById("flag1").src = "./assets/redFlag.jpg";
            document.getElementById("flag2").src = "./assets/redFlag.jpg";
            document.getElementById("flag3").src = "./assets/greenFlag.png";
            document.getElementById("flag4").src = "./assets/redFlag.jpg";
            document.getElementById("flag5").src = "./assets/redFlag.jpg";
            return "Indicator3";
        }
        else if(curr.p4 === true){
            document.getElementById("flag1").src = "./assets/redFlag.jpg";
            document.getElementById("flag2").src = "./assets/redFlag.jpg";
            document.getElementById("flag3").src = "./assets/redFlag.jpg";
            document.getElementById("flag4").src = "./assets/greenFlag.png";
            document.getElementById("flag5").src = "./assets/redFlag.jpg";
            return "Indicator4";
        }
        else if(curr.p5 === true){
            document.getElementById("flag1").src = "./assets/redFlag.jpg";
            document.getElementById("flag2").src = "./assets/redFlag.jpg";
            document.getElementById("flag3").src = "./assets/redFlag.jpg";
            document.getElementById("flag4").src = "./assets/redFlag.jpg";
            document.getElementById("flag5").src = "./assets/greenFlag.png";
            return "Indicator5";
        }
       
        return "player";
        

    }
    getOpponentNumber(Indicator){
        if(Indicator=== "Indicator1"){
            return 1;
        }
        else if(Indicator === "Indicator2"){
            return 2;
        }
        else if(Indicator === "Indicator3"){
            return 3;
        }
        else if(Indicator === "Indicator4"){
            return 4;
        }
        else if(Indicator === "Indicator5"){
            return 5;
        }
      
            return 0;
        
    }
    fireSound(){
        var audio = new Audio('./sound/fire.mp3');
        audio.play();
    }
    killSound(){
        var audio = new Audio('./sound/kill.mp3');
        audio.play();
    }
    oponent() {

        var number = Math.floor(Math.random() * 6) + 1;
        var pic = this.getDicePic(number);
        var Indicator = this.getIndicator();
        var prevId = this.state.opponent[Indicator].id;    
        var ID = (parseInt(prevId) + parseInt(number)) ;
        var opNumber = this.getOpponentNumber(Indicator);
        var playAgain = false;
        var kill = this.isKill(Indicator,ID);
        // check if opponent goes over fire
        if(this.isPlayerOverFire(ID)){
            this.fireSound();
            this.resetOpponentState(Indicator);
            this.removeFromBorad(prevId);
            ID = 0;
            prevId = 0;
            number = 0;
            pic = null;
           

        }
        // check if opponent kills player
       else if(this.isPlayerKilled(ID)){
            this.killSound();
            this.resetPlayerState();
            this.removeFromBorad(this.state.player.id); // remove player from board
            this.removeFromBorad(prevId); // remove opponent from prev position
            this.moveOpponentImage(ID,opNumber); // update opponent postion
            playAgain = true;
            
        }
        // check if opponent kills opponent
       else if(kill){
            this.killSound();
            this.resetOpponentState(kill);
            this.removeFromBorad(ID);
            this.removeFromBorad(prevId);
            this.moveOpponentImage(ID,this.getOpponentNumber(Indicator));
            playAgain = true;
         

        }
        else if(ID > 100){
            if(number === 6){
                playAgain = true;
            }
        }
        else if(ID === 100){
            this.removeFromBorad(prevId);
            this.moveOpponentImage(ID,this.getOpponentNumber(Indicator)); 
            alert("you won");
            this.restart();
        }
        else if(number === 6){
            this.removeFromBorad(prevId);
            this.moveOpponentImage(ID,this.getOpponentNumber(Indicator)); 
            playAgain = true;
        }
        else{
            this.removeFromBorad(prevId);
            this.moveOpponentImage(ID,this.getOpponentNumber(Indicator)); 
        }

        var dummy = {...this.state.opponent};
        dummy[Indicator] = { id:ID, prevId:prevId, play: number, image: pic, resetOpponent:false}
        
      
        if(playAgain === true){
            this.setState({opponent:dummy});
        }
        else{
            var next =  this.setNext(opNumber);
            this.setState({opponent:dummy,current:next});
        }        

    }
    setNext(opNumber){
        const max = this.state.max;
        var turn;
        if(max === 1){
            turn = {player:true,p1:false,p2:false,p3:false,p4:false,p5:false};
        }
        else  if(max === 2){
            if(opNumber === 2){
                // from 2 to 0
                turn = {player:true,p1:false,p2:false,p3:false,p4:false,p5:false};
            }
            else{
                // from 1 to 2
                turn = {player:false,p1:false,p2:true,p3:false,p4:false,p5:false};
            }
           
        }
        else  if(max === 3){
            if(opNumber === 3){
                // from 3 to 0
                turn = {player:true,p1:false,p2:false,p3:false,p4:false,p5:false};
            }
            else if(opNumber ===2){
                // from 2 to 3
                turn = {player:false,p1:false,p2:false,p3:true,p4:false,p5:false};
            }
            else{
                // 1 to 2
                turn = {player:false,p1:false,p2:true,p3:false,p4:false,p5:false};
            }
           
        }
        else  if(max === 4){
            if(opNumber === 4){
                // from 4 to 0
                turn = {player:true,p1:false,p2:false,p3:false,p4:false,p5:false};
            }
            else if(opNumber ===3 ){
                // from 3 to 4
                turn = {player:false,p1:false,p2:false,p3:false,p4:true,p5:false};
            }
            else if(opNumber === 2){
                // 2 to 3
                turn = {player:false,p1:false,p2:false,p3:true,p4:false,p5:false};
            }
            else{
                // 1 to 2
                turn = {player:false,p1:false,p2:true,p3:false,p4:false,p5:false};
            }
           
        }
        else  if(max === 5){
            if(opNumber === 5){
                // from 5 to 0
                turn = {player:true,p1:false,p2:false,p3:false,p4:false,p5:false};
            }
            else if(opNumber ===4 ){
                // from 4 to 5
                turn = {player:false,p1:false,p2:false,p3:false,p4:false,p5:true};
            }
            else if(opNumber === 3){
                // 3 to 4
                turn = {player:false,p1:false,p2:false,p3:false,p4:true,p5:false};
            }
            else if(opNumber === 2){
                // 2 to 3
                turn = {player:false,p1:false,p2:false,p3:true,p4:false,p5:false};
            }
            else{
                // 1 to 2
                turn = {player:false,p1:false,p2:true,p3:false,p4:false,p5:false};
            }
           
        }
        if(turn.player == true){
            document.getElementById(`flag${this.state.max}`).src = "./assets/redFlag.jpg";
        }
       return turn;
    }
    didPlayerKillOpponent(playerId){
        var opponent = this.state.opponent;
        if(opponent.Indicator1.id === playerId){
            return "Indicator1";

        }
        else if(opponent.Indicator2.id === playerId){
            return "Indicator2";
        }
        else if(opponent.Indicator3.id === playerId){
            return "Indicator2";
        }
        else if(opponent.Indicator4.id === playerId){
            return "Indicator2"; 
        }
        else if(opponent.Indicator5.id === playerId){
            return "Indicator2";
        }
        return null; 
    }
   
    player(e) {
        e.preventDefault();
        if(this.state.current.player === true){
            e.target.disabled = false;
        }
        else{
            e.target.disabled = true;
        }
        var number = Math.floor(Math.random() * 6) + 1;
        var pic =this.getDicePic(number);
        var prevId = this.state.player.id;
        var ID = (parseInt(prevId) + parseInt(number));
        var Next = true; // indicate whether player play again or not
        var done = false;
        var Indicator = this.didPlayerKillOpponent(ID);
        var turn =  {player:true,p1:false,p2:false,p3:false,p4:false,p5:false};
        // check player over fire
        if(this.isPlayerOverFire(ID)){
            this.fireSound();
            this.resetPlayerState();
            this.removeFromBorad(prevId);
          if(number !== 6){
            turn =  {player:false,p1:true,p2:false,p3:false,p4:false,p5:false}

          }
          else{
            Next = false;
          }
         ID = 0;
         prevId = 0;
         number = 0;
         pic = null;
        
        }
        // check if player kills opponent
      
        else if(Indicator !==null){
            this.killSound();
            this.resetOpponentState(Indicator);
            this.removeFromBorad(ID); // remove opponent
            this.removeFromBorad(prevId); // remove player at prev position
            this.movePlayerImage(ID); // move player to the next
            Next = false;
            
        }
      
        // check if ID > 100
        else if(ID > 100){
            ID = prevId;
            if(number === 6){
                Next = false;
            }
        }
        else if(number === 6){
            this.removeFromBorad(prevId); // remove player at prev position
            this.movePlayerImage(ID); // move player to the next
            Next = false;
         }
           // check if player wins
       else  if(ID === 100){
            alert("Player won");
            this.restart();
        }
         // normal move
         else{
             
            this.removeFromBorad(prevId); // remove player at prev position
            this.movePlayerImage(ID); // move player to the next
            
            Next = true;
            turn =  {player:false,p1:true,p2:false,p3:false,p4:false,p5:false};
         }
       
            this.setState({ player:{ id: ID, prevId: prevId, play: number,image:pic},disabled:Next,current:turn})
 
        
      
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
        if(this.state.current.player === false){
         
         this.oponent();   
        }
       
       },
    5000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    resetPlayerState(){
        this.setState({player:{ id: 0, prevId: null, play: null,image:null},disabled:true,})

    }
    removeFromBorad(prevID){
        if (prevID) {
            const list = document.getElementById("t"+prevID);
             list.innerHTML = prevID;
        }
    }

    isPlayerOverFire(ID){
        if(this.hasDanger(ID)){
           return true;
     }
     return false;
    }

    movePlayerImage(ID) {

        if(ID !== 0){
            const img = "./assets/tvl_t.png";
            const id = document.getElementById("t"+ID);
            const imgTag = document.createElement("IMG");
            imgTag.setAttribute("src", img);
            imgTag.setAttribute("id", "pl");
            imgTag.setAttribute("title", "me");
            id.appendChild(imgTag);
        }
           

        }

    moveOpponentImage(ID,opNumber) {
           if (ID) {
            // display correct image
            let img = "./assets/red.jpg";
            if(opNumber === 2){
                img = "./assets/blue.png";
            }
            else if(opNumber === 3){
                img = "./assets/yellow.png";
            }
            else if(opNumber === 4){
                img = "./assets/purple.png";
            }
            else if(opNumber === 5){
                img = "./assets/green.png";
            }
            let id = document.getElementById("t"+ID);
            const imgTag = document.createElement("IMG");
            imgTag.setAttribute("src", img);
            imgTag.setAttribute("id", "op");
            imgTag.setAttribute("title", `opponent${opNumber}`);
            id.appendChild(imgTag);
        }  
             
    }
    restart(){
      
     window.location.reload(false);
    }
    exit(){
        this.setState({exit:true})
    }
  
    render() {

        const path2 = "/"
        if(this.state.exit === true){
            return(
                <Redirect to={path2} />
            )
        }
        var Indicator = this.getIndicator();
        var opNumber = this.getOpponentNumber(Indicator);
        var number;
        var image;
        if(opNumber === 0){
            number = 0;
            image = null;
        }
        else{
          
            number = this.state.opponent[Indicator].play;
            image = this.state.opponent[Indicator].image
        }
            return (
                <div className = "parent">
                    <div className = "flex-board">
                        <DrawBoard />
                    </div>
                    <div className = 'flex-player'>
                        <div className = 'flex-player-child-1'>
                            <Play disabled = {!this.state.current.player} test={this.player} number={this.state.player.play} image={this.state.player.image} />
                        </div>

                        <div className = 'flex-player-child-2'>
                            <Restart restart = {this.restart} />
                        </div>

                        <div className = 'flex-player-child-3'>
                            <Exit exit = {this.exit} />
                        </div>

                    </div>
                    
                    <div className = "flex-opponent">
                    <Opponent 
                    opIndicator = {opNumber} 
                    number={number}
                    image={image}
                    max = {this.state.max}
                     />
                     </div>
                </div>
            );

    }
}
