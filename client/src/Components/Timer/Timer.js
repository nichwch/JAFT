import React,{useState,useEffect} from "react";
import "./Timer.css";
import {getTimeDisplay} from "../../TimerUtils";

var moment = require('moment');

const Timer = (props) =>
{



  let date = new Date(props.time);

  let [tagFormValue,setTagFormValue] = useState("");
  //true means its a distraction, false means its not
  let [focusVal,setFocusVal] = useState(false);

  let dateDisplay = getTimeDisplay(date,"numbers");

  let sessionDisplay = "0:00";
  if(props.stamps.length > 0)
  {
    let stampStart = props.stamps[props.stamps.length-1];
    let sessionLength = props.time - stampStart.stamp;

    sessionDisplay = getTimeDisplay(new Date(sessionLength),"numbers");
  }

  let toggle = () => {
    if(props.on) props.controls.stop();
    else props.controls.start();
  }

  let spaceToggle = (e) => {
     if(e.code === "Space") toggle();
   };

  useEffect(()=>{
    document.addEventListener("keyup",spaceToggle);
    return(
      ()=>{
        document.removeEventListener("keyup",spaceToggle);
      }
    );
  },[props.on]);


  return (
    <div className="innerAppContainer">
        <div className = {props.currentTag.focus?"circleTimerContainer":"circleTimerContainer distracted"} onClick={()=>{toggle()}}>
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
            {props.currentTag.focus?null:
            <div className = "distractedTitle">
              DISTRACTED
            </div>
            }
        </div>
        {
          ((!props.on)&&(props.time>0))?
          <button className={props.currentTag.focus?"resetButton":"resetButton distracted"}onClick={props.controls.reset}>reset</button>
          :
          <div style={{marginTop:"66px"}}></div>
        }
        <div className="timerButtonContainer">
        {props.tags.map((tag,i)=>{return (
          <span className="tagButtonCoupler" key={i}>
          <button className={tag.focus?"tagButtonName":"tagButtonName distracted"} key={i} onClick={()=>{props.setTag(tag)}}>
            {tag.name}
          </button>
          <button
            className={tag.focus?"tagButtonDelete":"tagButtonDelete distracted"}
            onClick={
              ()=>{
                if(window.confirm("Delete this tag?")) props.removeTag(i)
              }
            }

          >X
          </button>
          </span>
        )})}
        <br/>
        <input
          className="tagForm"
          placeholder="add a new category..."
          value={tagFormValue}
          onChange={(e)=>{setTagFormValue(e.target.value)}}
        />
        <span className="focusCheckBoxCaption">
        Distraction?
        </span>
        <input
            type="checkbox"
            className={focusVal?"focusCheckBox checked":"focusCheckBox"}
            checked={focusVal}
            onChange={
              (e)=>
              {
                setFocusVal(e.target.checked)
              }
            } />
        <button className={props.currentTag.focus?"submitTagForm":"submitTagForm distracted"} onClick={
          ()=>{
            if(tagFormValue.trim().length>0)
            {
              let newTag = {
                name:tagFormValue,
                focus:!focusVal,
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
