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
    this.state = this.resetState();
    this.state.tags =
    [
        {
          name:"Focus",
          focus:true,
        },
        {
          name:"FB",
          focus:false,
        },
        {
          name:"Twitter",
          focus:false,
        },
        {
          name:"Medium",
          focus:false,
        },
    ];
    this.state.currentTag = {name:"Focus",focus:true,};
    this.state.mode = TIMER;
  }

  resetState = () =>{
    return(
      {
        startTime:0,
        time:0,
        on:false,
        stamps:[],
      }
    );
  }

  startTimer = () =>
  {
    let stamps;
    if(this.state.time == 0)
    {
      stamps = this.state.stamps;
      stamps.push({tag:this.state.currentTag,start:true,stamp:this.state.time.valueOf()});

      this.setState({
        stamps:stamps,
        currentTag:this.state.currentTag
      });
    }
    this.setState({
      startTime:Date.now()-this.state.time,
      time:this.state.time,
      on:true,
    });
    this.timer = setInterval(()=>{
      //useful millisecond values to add on for testing
      //35990000 (9 hours 59 minutes 50 seconds)
      //590000 (9 minutes 50 seconds)
      this.setState({
        time:moment(Date.now()).valueOf() - moment(this.state.startTime).valueOf(),
      });
    },1);
  }


  setTag = (newTag) =>
  {
    let oldTag = this.state.currentTag;
    if(oldTag.name!==newTag.name || oldTag.focus!==newTag.focus)
    {
      let stamps = this.state.stamps;

      if(!this.state.on)
      {
        if(stamps[stamps.length-1].stamp === this.state.time)
        {
          stamps.pop();
          stamps.push({tag:newTag,start:true,stamp:this.state.time});
          this.setState({
            stamps:stamps,
            currentTag:newTag
          },()=>{console.log(stamps)});
          return;
        }

      }
      //close the previous tag
      stamps.push({tag:oldTag,start:false,stamp:this.state.time});
      //open the new tag
      stamps.push({tag:newTag,start:true,stamp:this.state.time});

      this.setState({
        stamps:stamps,
        currentTag:newTag
      },()=>{console.log(stamps,this.state.time)});
    }

  }

  stopTimer = () => {
    this.setState({
      on:false,
    })
    clearInterval(this.timer);
  }

  resetTimer = () => {
    this.setState(this.resetState());
  }


  render()
  {
    let content = (<React.Fragment>
      <Timer
      controls={{start:this.startTimer,stop:this.stopTimer,reset:this.resetTimer}}
      time={this.state.time}
      on={this.state.on}
      tags={this.state.tags}
      stamps={this.state.stamps}
      setTag={this.setTag}
      currentTag={this.state.currentTag}
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
        stamps={this.state.stamps}
        setTag={this.setTag}
        currentTag={this.state.currentTag}
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
      {this.state.stamps.map((j)=>{return j.tag.name})}
      </React.Fragment>)
  }
}

export default App;
