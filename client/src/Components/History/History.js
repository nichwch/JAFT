import React,{useState,useEffect} from "react";
import "./History.css";

const moment = require("moment");

const History = (props) =>
{
  let [sessions,setSessions] = useState([]);
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
      <div className="historyContainer">
        {
          sessions.map(
            (valObj,i) =>
            {
              let date = moment(valObj.date).format("dddd, MMMM Do YYYY, h:mm:ss a");
              return(
                <div key={i} className="sessionListing">
                <p>
                {valObj.name}<br/>
                {date}<br/>
                </p>
                </div>
              )

            }
          )
        }
      </div>
      <div className="settingsContainer">

      </div>
    </React.Fragment>
  )
}

export default History;
