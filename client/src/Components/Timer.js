import React,{useState,useEffect} from "react";
import "./Timer.css";
var moment = require('moment');
const Timer = (props) =>
{
  // useEffect(()=>{
  //   props.controls.start();
  // },[]);
  let date = new Date(props.time);

  let hours = date.getUTCHours()>0?
  ((date.getUTCHours()+"").length>1?(date.getUTCHours()+"")+':' : "0"+date.getUTCHours()+':')
  :
  "";

  let minutes = date.getUTCMinutes()>0?
  ((date.getUTCMinutes()+"").length>1?(date.getUTCMinutes()+"")+':' : "0"+date.getUTCMinutes()+':')
  :
  "";

  let seconds = ""
  if(hours.length>0)
  {
    seconds = ((date.getUTCSeconds()+"").length>1?(date.getUTCSeconds()+"") : "0"+date.getUTCSeconds());
  }
  else
  {
    seconds =((date.getUTCSeconds()+"").length>1?(date.getUTCSeconds()+"")+':' : "0"+date.getUTCSeconds()+':');
  }

  let milliseconds = "";
  if(hours.length>0)
  {
    milliseconds = "";
  }
  else
  {
    milliseconds = ((date.getUTCMilliseconds()+"").length>1?(date.getUTCMilliseconds()+"").substring(0,2) : "0"+date.getUTCMilliseconds());
  }


  let finalTime = hours+minutes+seconds+milliseconds;
  // if(format.split(':'))
  return (
    <React.Fragment>
        <div className = "circleTimerContainer" onClick={props.on?props.controls.stop:props.controls.start}>
            <div className = "timerTime">
              {finalTime}
            </div>
        </div>
        {
          ((!props.on)&&(props.time>0))?
          <button onClick={props.controls.reset}>reset</button>
          :
          null
        }

        {props.tags.map((tag,i)=>{return (
          <div key={i}>
            {tag}
          </div>
        )})}
    </React.Fragment>
  )
}

export default Timer;
