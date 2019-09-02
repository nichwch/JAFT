import React,{useState,useEffect} from "react";
var moment = require('moment');
const Timer = (props) =>
{
  // useEffect(()=>{
  //   props.controls.start();
  // },[]);
  let date = new Date(props.time);
  let milliseconds = ((date.getUTCMilliseconds()+"").length>1?(date.getUTCMilliseconds()+"").substring(0,2):"0"+date.getUTCMilliseconds());
  let seconds =((date.getUTCSeconds()+"").length>1?(date.getUTCSeconds()+"")+':':"0"+date.getUTCSeconds()+':');
  let minutes = date.getUTCMinutes()>0?
  ((date.getUTCMinutes()+"").length>1?(date.getUTCMinutes()+"")+':':"0"+date.getUTCMinutes()+':')
  :
  "";
  let hours = date.getUTCHours()>0?
  ((date.getUTCHours()+"").length>1?(date.getUTCHours()+"")+':':"0"+date.getUTCHours()+':')
  :
  "";
  // if(format.split(':'))
  return (
    <React.Fragment>
    {hours+minutes+seconds+milliseconds}
    {
      props.on?
      <button onClick={props.controls.stop}>stop</button>
      :
      <button onClick={props.controls.start}>start</button>
    }
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
