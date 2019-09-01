import React from "react";
import "./App.css";

import Timer from "./Components/Timer";
import Session from "./Components/Session";
import History from "./Components/History";

var localforage = require("localforage");
const moment = require("moment");

const TIMER = "TIMER";
const SESSION = "SESSION";
const HISTORY = "HISTORY";



class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      mode:HISTORY,
      time:0,
      stamps:[],
      tags:new Set(),
    }
  }


  render()
  {
    let content = (<React.Fragment><Timer /></React.Fragment>);
    if(this.state.mode===TIMER)
    {
      content = (<React.Fragment><Timer /></React.Fragment>);
    }
    else if(this.state.mode===SESSION)
    {
      content = (<React.Fragment><Session /></React.Fragment>);
    }
    else if(this.state.mode===HISTORY)
    {
      content = (<React.Fragment><History /></React.Fragment>);
    }
    return (<React.Fragment>
      <div className="appContainer">
        <div className="appNav">
          <div className={this.state.mode===TIMER?"leftNav selected":"leftNav"} onClick={()=>{this.setState({mode:TIMER})}}>
            Timer
          </div>
          <div className={this.state.mode===SESSION?"centralNav selected":"centralNav"} onClick={()=>{this.setState({mode:SESSION})}}>
            Session
          </div>
          <div className={this.state.mode===HISTORY?"centralNav selected":"centralNav"} onClick={()=>{this.setState({mode:HISTORY})}}>
            History
          </div>
          <div className="rightNav">
            Save
          </div>
        </div>
        {content}
      </div>
      </React.Fragment>)
  }
}

export default App;
