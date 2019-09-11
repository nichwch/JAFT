import React from "react";
import "./App.css";

import Timer from "./Components/Timer/Timer";
import Session from "./Components/Session/Session";
import History from "./Components/History/History";

const localforage = require("localforage");
const moment = require("moment");

const TIMER = "TIMER";
const SESSION = "SESSION";
const HISTORY = "HISTORY";

const DEFAULT_TAGS = [
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


class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = this.resetState();
    this.state.tags = []
    this.state.currentTag = {name:"Focus",focus:true,};
    this.state.mode = TIMER;

    var store = localforage.createInstance({
      name: "JAFT"
    });
    this.state.forage = store;
  }

  componentDidMount()
  {
    this.state.forage.getItem("tags")
    .then(
      (value)=>{
        if(value!==null) this.setState({tags:value});
        else this.setState({tags:DEFAULT_TAGS});

      }
    )
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

  addTag = (newTag) =>{
    let tags = this.state.tags;
    tags.push(newTag);
    this.setState({
      tags:tags
    },
    ()=>{
      this.state.forage.setItem("tags",this.state.tags);
    }
  );
  }

  removeTag = (index)=>{
    let tags = this.state.tags;
    tags.splice(index,1);
    this.setState({
      tags:tags
    },
    ()=>{
      this.state.forage.setItem("tags",this.state.tags);
    });
  }

  //not idempotent
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
        if(stamps.length === 0)
        {
          this.setState({
            currentTag:newTag
          });
          return;
        }
        else if(stamps[stamps.length-1].stamp === this.state.time)
        {
          stamps.pop();
          stamps.push({tag:newTag,start:true,stamp:this.state.time});
          this.setState({
            stamps:stamps,
            currentTag:newTag
          });
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
      });
    }

  }

  //idempotent
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
      removeTag={this.removeTag}
      addTag={this.addTag}
      currentTag={this.state.currentTag}
      />
      </React.Fragment>);
    if(this.state.mode===TIMER)
    {
      content = content;
    }
    else if(this.state.mode===SESSION)
    {
      content = (<React.Fragment>
                    <Session
                      stamps={this.state.stamps}
                      time={this.state.time}
                      tags={this.state.tags}
                    />
                 </React.Fragment>);
    }
    else if(this.state.mode===HISTORY)
    {
      content = (<React.Fragment><History forage={this.state.forage}/></React.Fragment>);
    }
    return (<React.Fragment>
      <div className="background">
      </div>
      <div className="appContainer">
        <div className="appNav">
          <button className={this.state.mode===TIMER?"leftNav selected":"leftNav"} onClick={()=>{this.setState({mode:TIMER})}}>
            Timer
          </button>
          <button className={this.state.mode===SESSION?"centralNav selected":"centralNav"} onClick={()=>{this.setState({mode:SESSION})}}>
            Session
          </button>
          <button className={this.state.mode===HISTORY?"centralNav selected":"centralNav"} onClick={()=>{this.setState({mode:HISTORY})}}>
            History
          </button>
          <button className="rightNav"
          onClick={
            ()=>{
              this.stopTimer();
              var name = window.prompt("Enter a name for your session. Note: This will end your session.");
              if(name===null) return;
              else if(name.trim().length===0)
              {
                window.alert("Please enter a full name");
              }
              else
              {
                let hash = Math.random()
                  .toString(36)
                  .substr(2, 9);

                this.state.forage.setItem(hash,
                  {
                    name:name,
                    stamps:this.state.stamps,
                    date:new Date(),
                    time:this.state.time,
                    tags:this.state.tags
                  }
                )
                this.resetTimer();
              }


              //needed params
              // name
              // stamps={this.state.stamps}
              // time={this.state.time}
              // tags={this.state.tags}
            }
          }

          >
            Save
          </button>
        </div>

        {content}
      </div>
      </React.Fragment>)
  }
}

export default App;
