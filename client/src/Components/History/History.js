import React,{useState,useEffect} from "react";
import Session from "../Session/Session";
import "./History.css";

const moment = require("moment");

const themes =
[

    {
      name:"Default",
      data:[
        ["--transparent-grey","rgba(30,30,30,0.8)"],
        ["--focus-color","#FF848B"],
        ["--focus-hover","#FF535B"],
        ["--distracted-color","#AC3539"],
        ["--distracted-hover","#960000"],
        ["--field-gray","#d6d6d6"],
        ["--buttonSkin",'rgba(150,150,150,0.8)'],
        ["--background",'rgba(0,0,0,0)'],
      ],
      flavor_text:"Classic JAFT.",
    },
    {
      name:"Coffee Shop",
      data:[
        ["--transparent-grey","rgba(30,30,30,0.8)"],
        ["--focus-color","#c7fac3"],
        ["--focus-hover","#b5e3b1"],
        ["--distracted-color","#82a37f"],
        ["--distracted-hover","#668063"],
        ["--field-gray","#d6d6d6"],
        ["--buttonSkin",'url(/woodtexture.jpg)'],
        ["--background",'url(/coffee_shop.gif)'],
      ],
      flavor_text:"Coffee Shop Vibes. Pair with a nice jazz or lofi playlist.",
    },
    {
      name:"Vaporwave",
      data:[
        ["--transparent-grey","rgba(30,30,30,0.8)"],
        ["--focus-color","#b94aec"],
        ["--focus-hover","#8234a6"],
        ["--distracted-color","#a175b5"],
        ["--distracted-hover","#593b75"],
        ["--field-gray","#d6d6d6"],
        ["--buttonSkin","rgba(150,150,150,0.8)"],
        ["--background",'url(/vaporwave1.gif)'],
      ],
      flavor_text:"v a p o r w a v e a e s t h e t i c s",
    },
]

const setTheme = (theme) =>
{
  let style = document.documentElement.style;

  for(let i=0;i<theme.data.length;i++)
  {
      style.setProperty(theme.data[i][0], theme.data[i][1]);
  }
}



const History = (props) =>
{
  let [sessions,setSessions] = useState([]);
  let [display,setDisplay] = useState(null);
  let [flavorText, set_flavorText] = useState("");

  const loadSessions = ()=>{
    let arr = [];
    props.forage.iterate(
      (val,key,iterationNumber)=>
      {
        if(key==="tags") return;
        arr.push(
          {
            name:val.name,
            stamps:val.stamps,
            date:val.date,
            time:val.time,
            tags:val.tags,
            key:key,
          }
        );
      }
    ).then(
      ()=>{setSessions(arr);}
    )
  }

  useEffect(()=>{
    loadSessions();
  },[props.forage]);



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
                <div key={i}
                        className="sessionListing"
                        onClick={
                          ()=>{
                            setDisplay(valObj)
                          }
                        }
                >
                  <div>
                  <span className="listingTitle">
                  {valObj.name}
                  </span>
                  <button className="listingDeleteButton"
                  onClick={
                    (e)=>{
                      e.stopPropagation();
                      if(window.confirm("Are you sure? This cannot be undone"))
                        {
                          props.forage.removeItem(valObj.key)
                          .then(
                            ()=>{
                            loadSessions();
                            }
                          )
                        }
                      }

                  }
                  >
                  X
                  </button>
                  <br/>
                  <span>{date}</span>
                  </div>

                </div>
              )

            }
          )
        }
        {sessions.length>0?null:<p style={{color:"white"}}>No past sessions to show.</p>}
      </div>
      <div className="settingsContainer">
        <h1>Themes</h1>
        <p>{flavorText}</p>
        {
          themes.map((theme,i)=>{
            return(
              <button
                key={i}
                onClick={
                  ()=>{
                    setTheme(theme)
                    set_flavorText(theme.flavor_text)
                  }
                }
              >
              {theme.name}
              </button>
            )
          })
        }
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
