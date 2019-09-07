import React from "react";

const Session = (props) =>
{
  let totalTime = props.time;
  let stamps = props.stamps.slice();
  if(stamps.length>0)
  {
    stamps.push(
      {
        tag:stamps[stamps.length-1].tag,
        start:false,
        stamp:props.time
      }
    )
  }
  console.log(stamps);

  let bars = [];
  for(let i = 1; i<stamps.length;i+=2)
  {
    let start = stamps[i-1].stamp;
    let end = stamps[i].stamp;
    let length = end-start;
    let name = stamps[i].tag.name;
    let focus = stamps[i].tag.focus;
    console.log(length/props.time);
    if(bars.length>0 && bars[bars.length-1].name === name) bars[bars.length-1].time+=length;
    // console.log(stamps[i-1].tag.name);
    // console.log(stamps[i].tag.name);
    else bars.push({time:length,name:name,focus:focus});

  }

  console.log(bars);
  console.log(props.time);

  let barDisplay = (<div className="barWrapper">
      {bars.map(
          (el,i)=>{

          }
        )}
    </div>
  )



  return (
    <React.Fragment>
    Session<br/>
    {stamps.map((j)=>{return j.tag.name})}
    </React.Fragment>
  )
}

export default Session;
