import React,{useState,useEffect} from "react";
import "./Timer.css";
var moment = require('moment');
const Timer = (props) =>
{
  // useEffect(()=>{
  //   props.controls.start();
  // },[]);
  let date = new Date(props.time);

  //Is this elegant or hideous? I can't tell
  let hours = Math.floor(date.getTime()/3600000);
  let minutes = Math.floor((date.getTime()%3600000)/60000);
  let seconds = Math.floor(((date.getTime()%3600000)%60000)/1000);
  let milliseconds = Math.floor((((date.getTime()%3600000)%60000)%1000));
  // console.log(hours,":",minutes,":",seconds,":",milliseconds);

  let hourDisplay = "";
  let minuteDisplay = "";
  let secondDisplay = "";
  let millisecondDisplay = "";


  if(milliseconds>=10) millisecondDisplay = milliseconds.toString().substring(0,2);
  else millisecondDisplay = "0"+milliseconds.toString();

  if(seconds>=10) secondDisplay = seconds.toString() + ":";
  else secondDisplay = "0"+seconds.toString() + ":";

  if(minutes>=10) minuteDisplay = minutes.toString() + ":";
  else minuteDisplay = "0"+minutes.toString() + ":";

  if(hours>=10) hourDisplay = hours.toString() + ":";
  else hourDisplay = "0"+hours.toString() + ":";

  if(hours>0)
  {
    millisecondDisplay = "";
    if(seconds>=10) secondDisplay = seconds.toString();
    else secondDisplay = "0"+seconds.toString();
  }
  if(hours===0) hourDisplay = "";
  if(minutes===0 && hours===0) minuteDisplay = "";



  // if(format.split(':'))
  return (
    <React.Fragment>
        <div className = "circleTimerContainer" onClick={props.on?props.controls.stop:props.controls.start}>
            <div className = "timerTime">
              {hourDisplay+minuteDisplay+secondDisplay+millisecondDisplay}
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
