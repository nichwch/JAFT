import React,{useState,useEffect} from "react";
import Session from "../Session/Session";
import "./History.css";

const moment = require("moment");

const History = (props) =>
{
  let [sessions,setSessions] = useState([]);
  let [display,setDisplay] = useState(null);
  useEffect(()=>{
    let arr = [];
    props.forage.iterate(
      (val,key,iterationNumber)=>
      {
        arr.push(val);
      }
    ).then(
      ()=>{setSessions(arr);}
    )
  },[]);
  console.log(sessions);

  return (
    <React.Fragment>
    {
      display===null?
      <React.Fragment>
      <div className="historyContainer">
        {
          sessions.map(
            (valObj,i) =>
            {
              let date = moment(valObj.date).format("dddd, MM/DD/YYYY, h:mm a");
              return(
                <button key={i}
                        className="sessionListing"
                        onClick={
                          ()=>{
                            setDisplay(valObj)
                          }
                        }
                >
                  <div>
                  <div className="listingTitle">{valObj.name}</div>
                  {date}
                  </div>
                </button>
              )

            }
          )
        }
        {sessions.length>0?null:<p style={{color:"white"}}>No past sessions to show.</p>}
      </div>
      <div className="settingsContainer">

      </div>
      </React.Fragment>
      :
      <React.Fragment>
        <div className = "historyBar">
        <button className = "barBackButton" onClick={()=>{setDisplay(null)}}>
        back
        </button>
        <br/>
        <div className="barTitle">
        {display.name}
        </div>
        <div className="barSubtitle">
        {moment(display.date).format("MM/DD/YYYY, h:mm a")}
        </div>
        </div>
        <Session
          stamps={display.stamps}
          time={display.time}
          tags={display.tags}
        />
      </React.Fragment>
    }

    </React.Fragment>
  )
}

export default History;
