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
      mode:TIMER,
      startTime:0,
      time:0,
      on:false,
      stamps:[],
      tags:["FB","Medium","Twitter"],
    }
  }

  startTimer = () =>
  {
    this.setState({
      startTime:Date.now()-this.state.time,
      time:this.state.time,
      on:true,
    });
    this.timer = setInterval(()=>{

      // console.log("now",moment(Date.now()).valueOf());
      // console.log("start",moment(this.state.startTime).valueOf());
      // console.log("subtract",moment(Date.now()).valueOf() - moment(this.state.startTime).valueOf());

      //useful millisecond values to add on for testing
      //35990000 (9 hours 59 minutes 50 seconds)
      //590000 (9 minutes 50 seconds)


      this.setState({
        time:moment(Date.now()).valueOf() - moment(this.state.startTime).valueOf(),
      });
    },1);

  }

  stopTimer = () => {
    this.setState({
      on:false,
    })
    clearInterval(this.timer);
  }

  resetTimer = () => {
    this.setState({
      time:0,
      on:false,
    })
  }


  render()
  {
    let content = (<React.Fragment>
      <Timer
      controls={{start:this.startTimer,stop:this.stopTimer,reset:this.resetTimer}}
      time={this.state.time}
      on={this.state.on}
      tags={this.state.tags}
      />
      </React.Fragment>);
    if(this.state.mode===TIMER)
    {
      content = (<React.Fragment>
        <Timer
        controls={{start:this.startTimer,stop:this.stopTimer,reset:this.resetTimer}}
        time={this.state.time}
        on={this.state.on}
        tags={this.state.tags}
        />
        </React.Fragment>);
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
