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

  let [tagFormValue,setTagFormValue] = useState("");

  let dateDisplay = getTimeDisplay(date,"numbers");

  let sessionDisplay = "0:00";
  if(props.stamps.length > 0)
  {
    let stampStart = props.stamps[props.stamps.length-1];
    let sessionLength = props.time - stampStart.stamp;

    sessionDisplay = getTimeDisplay(new Date(sessionLength),"numbers");
    console.log(sessionDisplay);
  }




  return (
    <div className="innerAppContainer">
        <button className = {props.currentTag.focus?"circleTimerContainer":"circleTimerContainer distracted"} onClick={props.on?props.controls.stop:props.controls.start}>
            <div className = "tagTitle">
              Total
            </div>
            <div className = "tagTitle">
              {dateDisplay}
            </div>
            <div className = "timerTime">
              {sessionDisplay}
            </div>
            <div className = "tagTitle">
              {props.currentTag.name}
            </div>
        </button>
        {
          ((!props.on)&&(props.time>0))?
          <button onClick={props.controls.reset}>reset</button>
          :
          null
        }
        <div className="timerButtonContainer">
        {props.tags.map((tag,i)=>{return (
          <span className="tagButtonCoupler">
          <button className={tag.focus?"tagButtonName":"tagButtonName distracted"} key={i} onClick={()=>{props.setTag(tag)}}>
            {tag.name}
          </button>
          <button
            className={tag.focus?"tagButtonDelete":"tagButtonDelete distracted"}
            onClick={
              ()=>{
                props.removeTag(i)
              }
            }

          >X
          </button>
          </span>
        )})}
        <br/>
        <input
          className="tagForm"
          placeholder="add a new tag..."
          value={tagFormValue}
          onChange={(e)=>{setTagFormValue(e.target.value)}}
        />
        <button className="submitTagForm" onClick={
          ()=>{
            if(tagFormValue.length>0)
            {
              let newTag = {
                name:tagFormValue,
                focus:false,
              }
              props.addTag(newTag);
              setTagFormValue("");
            }
          }
        }>+</button>
        </div>
    </div>
  )
}

export default Timer;
