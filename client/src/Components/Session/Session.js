import React,{useState,useEffect} from "react";
import "./Session.css";
import {getTimeDisplay} from "../../TimerUtils";

const Session = (props) =>
{
  let stamps = props.stamps.slice();

  // let [initTime,setInitTime] = useState(0);
  // let [initTime,setInitTime] = useState(props.time);
  let initTime = props.time;
  let [currentTag,set_currentTag] = useState("");

  const NA = "NA";
  const FOCUS = "FOCUS";
  const DISTRACTIONS = "DISTRACTIONS";
  const ALL = "ALL";

  let [sortByMode,set_sortByMode] = useState(ALL);

  // useEffect(
  //   ()=>{
  //   setInitTime(props.time);
  // },[]
  // );

  if(stamps.length>0)
  {
    stamps.push(
      {
        tag:stamps[stamps.length-1].tag,
        start:false,
        stamp:initTime
      }
    )
  }



  let bars = [];

  for(let i = 1; i<stamps.length;i+=2)
  {
    let start = stamps[i-1].stamp;
    let end = stamps[i].stamp;
    let length = end-start;
    let name = stamps[i].tag.name;
    let focus = stamps[i].tag.focus;
    if(bars.length>0 && bars[bars.length-1].name === name) bars[bars.length-1].time+=length;
    else if(length>0) bars.push({time:length,name:name,focus:focus});

  }

  let timeTotals = new Map();
  let distractionArr = [];
  let focusArr = [];

  for(let i = 0; i<bars.length;i++)
  {
    if(timeTotals.has(bars[i].name))
    {
      let arr = timeTotals.get(bars[i].name);
      arr.push(bars[i].time);
      timeTotals.set(bars[i].name,arr);
    }
    else
    {
      timeTotals.set(bars[i].name,[bars[i].time]);
    }
    if(bars[i].focus) focusArr.push(bars[i].time);
    else if(!bars[i].focus) distractionArr.push(bars[i].time);
  }


  let barDisplay = (<div className="barWrapper">
      {bars.map(
          (el,i)=>{
            let vis = "visible";

            if(sortByMode===NA)
            {
              if(el.name===currentTag) vis = "visible";
              else vis = "hidden";
            }
            else if(sortByMode===ALL) vis = "visible";
            else if(sortByMode===FOCUS)
            {
              if(el.focus) vis = "visible";
              else vis = "hidden";
            }
            else if(sortByMode===DISTRACTIONS)
            {
              if(!el.focus) vis = "visible";
              else vis = "hidden";
            }


            return(<span key={i} className="barElement" style={{width:
              `calc(${(((el.time/initTime)*100)+"% - 3px")})`,
              backgroundColor:(el.focus?"var(--focus-color)":"var(--distracted-color)"),
              borderRightColor:(el.focus?"var(--focus-hover)":"var(--distracted-hover)"),
              visibility:vis,
              }}>

              </span>
            )
          }
        )}
    </div>
  )


  let tagArr = timeTotals.get(currentTag);

  let total = "";
  let avg = "";
  if(tagArr)
  {
    total = tagArr.reduce( (acc,cv)=>{ return acc+cv } );
    avg = total/tagArr.length;
  }

  let distractionTotal,focusTotal = "";
  let distractionAvg,focusAvg = "";

  distractionTotal = distractionArr.reduce( (acc,cv)=>{ return acc+cv },0 );
  distractionAvg = (distractionTotal/distractionArr.length)||0;

  focusTotal = focusArr.reduce( (acc,cv)=>{ return acc+cv },0  );
  focusAvg = (focusTotal/focusArr.length)||0;



  let infoContent = null;

  if(bars.length===0) infoContent = (<React.Fragment><p>No data (Timer not started)</p><br/><br/></React.Fragment>)
  else if(sortByMode===ALL) infoContent = (<React.Fragment><p>Select a tag to view its information.</p><br/><br/></React.Fragment>)
  else if(sortByMode===FOCUS)
    infoContent = (
      <React.Fragment>
        <p>Displaying all focus sessions
        <br/>Total Time: {getTimeDisplay(new Date(focusTotal),"text")}
        <br/>Average Session Length: {getTimeDisplay(new Date(focusAvg),"text")}</p>
      </React.Fragment>
    )
  else if(sortByMode===DISTRACTIONS)
    infoContent = (
      <React.Fragment>
        <p>Displaying all distraction sessions
        <br/>Total Time: {getTimeDisplay(new Date(distractionTotal),"text")}
        <br/>Average Session Length: {getTimeDisplay(new Date(distractionAvg),"text")}</p>
      </React.Fragment>
    )
  else if(sortByMode===NA)
  {
    infoContent = (
      <React.Fragment>
        <p>{currentTag}
        <br/>Total Time: {getTimeDisplay(new Date(total),"text")}
        <br/>Average Session Length: {getTimeDisplay(new Date(avg),"text")}</p>
      </React.Fragment>
    )
  }

  let infoDisplay = (
    <React.Fragment>
    {infoContent}
    </React.Fragment>
  )

  let buttonDisplay = (
    <React.Fragment>
      <button
           className={"sessionTagButton"}
           onClick={
             ()=>{
               set_currentTag("");
               set_sortByMode(ALL);
             }
           }
      >
        Show All
      </button>

      <button
           className={"sessionTagButton"}
           onClick={
             ()=>{
               set_currentTag("");
               set_sortByMode(FOCUS);
             }
           }
      >
        Only Focus
      </button>

      <button
           className={"sessionTagButton distracted"}
           onClick={
             ()=>{
               set_currentTag("");
               set_sortByMode(DISTRACTIONS);
             }
           }
      >
        Only Distractions
      </button>
      <br/>
      <br/>
      {props.tags.map(
        (tag,i)=>
        {
          if(timeTotals.has(tag.name))
          {
            return(
            <button key={i}
                 className={tag.focus?"sessionTagButton":"sessionTagButton distracted"}
                 onClick={
                   ()=>{
                     set_currentTag(tag.name);
                     set_sortByMode(NA);
                   }
                 }
            >
              {tag.name}
            </button>
            )
          }
          else return null;
        }
      )}
    </React.Fragment>
  )


  return (
    <React.Fragment>
    <div className="barChartContainer">
    {barDisplay}
    </div>
    <div className="sessionInfoContainer">
    {infoDisplay}
    </div>
    <div className="sessionBottomContainer">
    {buttonDisplay}
    </div>
    </React.Fragment>
  )
}

export default Session;
