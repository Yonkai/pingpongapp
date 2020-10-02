import React, { Component } from 'react';
import styles from './Home.module.css';
var uniq = require('lodash/uniq')

class PingPongSystem extends Component {
  constructor(props) {
    super(props)
    //TODO: Track various parts of state for the ping-pong management system
    this.state = {
      yourWins:0,
      oppWins:0,
      yourLoses:0,
      oppLoses:0,
      yourPoints:0,
      oppPoints:0,
      yourNameCurrentInput:'',
      yourOppNameCurrentInput:'',
      //TODO: Mirror this to the localstorage api, filter out anything thats not already been stored then
      //save it to the local storage system
      registeredNames: [],
      //Note false = opponent is serving, and true = you are serving in the point management system
      startingServer:false,
      currentServer:false,
      winThreshold:10,
      servingSwitchWinThreshold:2,
      servingSwitchPointsThreshold:2
    }

    this.resetEntirePingPongState = this.resetEntirePingPongState.bind(this)
    this.updateNameRegistrar = this.updateNameRegistrar.bind(this)
    this.updateYourNameInputValue = this.updateYourNameInputValue.bind(this)
    this.updateOppNameInputValue = this.updateOppNameInputValue.bind(this)
    this.updateStartingServer = this.updateStartingServer.bind(this)
    this.addYourPoint = this.addYourPoint.bind(this)
    this.addOpponentPoint = this.addOpponentPoint.bind(this)
    this.addYourWin = this.addYourWin.bind(this)
    this.addOpponentWin = this.addOpponentWin.bind(this)
  }

    //Resets the entire application state for ping to reset the game
    resetEntirePingPongState(){
      this.setState({
        yourWins:0,
        oppWins:0,
        yourLoses:0,
        oppLoses:0,
        yourPoints:0,
        oppPoints:0,
        yourNameCurrentInput:'',
        yourOppNameCurrentInput:'',
        registeredNames: [],
        startingServer:false,
        currentServer:false,
        winThreshold:10,
        servingSwitchWinThreshold:2,
        servingSwitchPointsThreshold:2
      })
    }

    updateYourNameInputValue(evt){
      this.setState({
        yourNameCurrentInput: evt.target.value
      });
    }

    updateOppNameInputValue(evt){
      this.setState({
        yourOppNameCurrentInput: evt.target.value
      });
    }

    updateStartingServer(){
      this.setState({
        startingServer: !this.state.startingServer
      });
    }

    updateNameRegistrar(){
      let registeredNamesCopy = this.state.registeredNames;
      registeredNamesCopy.push(this.state.yourOppNameCurrentInput,this.state.yourNameCurrentInput);
      registeredNamesCopy = uniq(registeredNamesCopy);
      this.setState({
        registeredNames: registeredNamesCopy
      });    
    }
 
addYourPoint(name){
  console.log(name)
  if(this.state.registeredNames.includes(name) && this.state[name] == undefined) {
    this.setState((state)=>{
    return {
      [name]: 0
    }})
  }

  this.setState((state)=>{return{
    yourPoints:this.state.yourPoints+1
  }}, ()=>{

    if(this.state.yourPoints>=10 && ((this.state.yourPoints-this.state.oppPoints)>=2)){
      this.setState((state)=>{
        return {
        oppPoints:0,
        yourPoints:0,
        [name]:  this.state[name] + 1
      }
    }
    )}
    }
  )}

addOpponentPoint(name){
  
  if(this.state.registeredNames.includes(name) && this.state[name] == undefined) {
    this.setState((state)=>{
    return {
      [name]: 0
    }})
  }
  this.setState((state)=>{return{
    oppPoints:this.state.oppPoints+1
  }}, ()=>{

    if(this.state.oppPoints>=10 && ((this.state.oppPoints-this.state.yourPoints)>=2)){  
      this.setState((state)=>{
        return{
        oppPoints:0,
        yourPoints:0,
        [name]:  this.state[name] + 1
      }
      })
    }
  })
}
    

addYourWin(){
  this.setState({
    yourWins:this.state.yourWins+1
  })
}
addOpponentWin(){
  this.setState({
    oppWins:this.state.oppWins+1
  })
} 
  
    render(){
      //TODO: Enable input system that will enter into state the various pieces of state that need to
      // be tracked in the ping-pong application system
      return (
        <div className={styles.container}>
          <h1>Ping Pong Game Registration Input System:</h1>
          <div>
            <span>Your Name:</span> <input value={this.state.yourNameCurrentInput} onChange={evt => this.updateYourNameInputValue(evt)}  type='text' maxlength={25}/>
          </div>
          <div>
            <span>Opponent's Name:</span> <input value={this.state.yourOppNameCurrentInput} onChange={evt => this.updateOppNameInputValue(evt)}  type='text' maxlength={25}/>
          </div>
          <div>
            <label for="prevNamesYou">You Select from previous names:</label>
          <input id="prevNamesYou" value={this.state.inputValue} onChange={evt => this.updateYourNameInputValue(evt)} type='search' list="prevNamesList" />
            </div>
          <div>

          <div>
            <label for="prevNamesOpp">Opponent Select from previous names:</label>
          <input id="prevNamesOpp" value={this.state.inputValue} onChange={evt => this.updateOppNameInputValue(evt)} type='search' list="prevNamesList" />
              {/* Use map function on state array to display previously registered names: */}
              <datalist id="prevNamesList">
                  {this.state.registeredNames.map((name,index)=>{
                    return <option value={name}/>
                  })}
              </datalist>
            </div>


            <button onClick={this.updateStartingServer}>Swap Server</button>
            <span>Starting Server: {this.state.startingServer ? 'Opponent - ' + this.state.yourOppNameCurrentInput: 'You - ' + this.state.yourNameCurrentInput}</span>

          
          </div>
         <div style={{display:'flex'}}>
          <div style={{border:5 + 'px' + ' solid black', paddingLeft:10+'px',paddingRight:10+'px'}}> 
            <h1> Game Simulation:</h1>
            <p>Current Server:{this.state.startingServer ? ' Opponent: ' + this.state.oppNameCurrentInput: ' You: ' + this.state.yourNameCurrentInput}</p>
            <p>Your Points: {this.state.yourPoints}</p>
            <p>Opponent Points: {this.state.oppPoints}</p>
          </div>
          <div style={{border:5 + 'px' + ' solid black', paddingLeft:10+'px',paddingRight:10+'px'}}>
            <h1>Leaderboard Display:</h1>
              {this.state.registeredNames.map((uniqueName,index)=>{
                return <p>{uniqueName}'s Win Count: {this.state[uniqueName]}</p>
              })}
          </div>
        </div>
          <button onClick={this.updateNameRegistrar}>updateNameRegistrar</button>
          <button onClick={this.resetEntirePingPongState}>RESET APPLICATION STATE</button>
          <button onClick={() => this.addYourPoint(this.state.yourNameCurrentInput)}>Add Your Point</button>
          <button onClick={() => this.addOpponentPoint(this.state.yourOppNameCurrentInput)}>Add Opponent Point</button>
          {/* <button onClick={this.addYourWin}>Add Your Win</button>
          <button onClick={this.addOpponentWin}>Add Opponent Win</button> */}
        {/* <h2>HERE FOR DEBUGGING PURPOSES:</h2>
        <p>{this.state.yourWins} yourWins</p>
        <p>{this.state.oppWins} oppWins</p>
        <p>{this.state.yourLoses} yourLoses</p>
        <p>{this.state.yourPoints} yourPoints</p>
        <p>{this.state.oppPoints} oppPoints</p>
        <p>{this.state.yourNameCurrentInput}yourNameCurrentInput</p>
        <p>{this.state.oppNameCurrentInput}oppNameCurrentInput</p>
        <p>{this.state.registeredNames}registeredNames</p>
        <p>{this.state.startingServer}startingServer</p>
        <p>{this.state.winThreshold} winThreshold</p>
        <p>{this.state.servingSwitchPointsThreshold}servingSwitchPointsThreshold</p>
        <p>{this.state.servingSwitchWinThreshold}servingSwitchWinThreshold</p> */}
        </div>
      )
    }
  }
  export default PingPongSystem;