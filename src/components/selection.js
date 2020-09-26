import React from 'react';
import {Redirect} from 'react-router-dom'
import './selection.css'
class Selection extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            boundary:null,
            link:null,
        }
        this.clickHandler = this.clickHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        
    }
    clickHandler(e){
 
        if(this.state.boundary === null || this.state.boundary === 0){
            e.preventDefault();
            this.setState({link:null})
 
            document.getElementById("error").style.visibility = "visible";
            document.getElementById("error").style.height = "40px";
           
            
        }
        else{
            this.setState({link:`/fireGame?max=${this.state.boundary}`})
        }
       
      
    }
    changeHandler(e){
      
        this.setState({boundary:e.target.value})
       
    }
  
    render(){
        
        if (this.state.link) {
            return <Redirect to={this.state.link} />
          }
    return (
        
        <div className = "selection">
             <div className = "form-group">
            <h2 className = "text-center header">Welcome to fire Game</h2>
            </div>
            <form className = "form-group pt-20 ">
                <div className="alert alert-danger error custom-control" id = "error">
                  
                    <strong>Select the number of opponents</strong> 
                </div>
               <div className = "form-group">
                    <select className = "custom-select text-center mt-20" onChange = {this.changeHandler}>
                            <option value = "0">Select Number of opponents</option>
                            <option value = "1">1</option>
                            <option value = "2">2</option>
                            <option value = "3">3</option>
                            <option value = "4">4</option>
                            <option value = "5">5</option>
                        </select>
                </div>
                <div className = "form-group">
                    <button className = "form-control btn btn-primary"onClick = {this.clickHandler} >Play</button>
                    
               </div>
            </form>
        </div>
    )
}
}
export default Selection