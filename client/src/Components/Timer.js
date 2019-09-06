import React,{useState,useEffect} from "react";
import "./Timer.css";
import {getTimeDisplay} from "./TimerUtils";


var moment = require('moment');

const Timer = (props) =>
{
  // useEffect(()=>{
  //   props.controls.start();
  // },[]);
  let date = new Date(props.time);

  let dateDisplay = getTimeDisplay(date,"numbers");



  // if(format.split(':'))
  return (
    <div className="innerAppContainer">
        <div className = {props.currentTag.focus?"circleTimerContainer":"circleTimerContainer distracted"} onClick={props.on?props.controls.stop:props.controls.start}>
            <div className = "tagTitle">
              {props.currentTag.name}
            </div>
            <div className = "timerTime">
              {dateDisplay}
            </div>
        </div>
        {
          ((!props.on)&&(props.time>0))?
          <button onClick={props.controls.reset}>reset</button>
          :
          null
        }

        {props.tags.map((tag,i)=>{return (
          <button key={i} onClick={()=>{props.setTag(tag)}}>
            {tag.name}
          </button>
        )})}
    </div>
  )
}

export default Timer;
