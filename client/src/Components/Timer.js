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
  console.log(getTimeDisplay(date,"numbers_full"));



  // if(format.split(':'))
  return (
    <React.Fragment>
        <div className = "circleTimerContainer" onClick={props.on?props.controls.stop:props.controls.start}>
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
          <button key={i}>
            {tag.name}
          </button>
        )})}
    </React.Fragment>
  )
}

export default Timer;
