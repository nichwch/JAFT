const getTimeDisplay = (date,mode) =>
{
  //Is this elegant or hideous? I can't tell

  let hours = Math.floor(date.getTime()/3600000);
  let minutes = Math.floor((date.getTime()%3600000)/60000);
  let seconds = Math.floor(((date.getTime()%3600000)%60000)/1000);
  let milliseconds = Math.floor((((date.getTime()%3600000)%60000)%1000));
  // console.log(hours,":",minutes,":",seconds,":",milliseconds);

  if(mode==="numbers")
  {
    let hourDisplay = "";
    let minuteDisplay = "";
    let secondDisplay = "";
    let millisecondDisplay = "";


    if(milliseconds>=10) millisecondDisplay = milliseconds.toString().substring(0,2);
    else millisecondDisplay = "0"+milliseconds.toString();

    if(minutes===0 && hours===0) secondDisplay = seconds.toString() + ":";
    else
    {
      if(seconds>=10) secondDisplay = seconds.toString() + ":";
      else secondDisplay = "0"+seconds.toString() + ":";
    }

    if(hours===0) minuteDisplay = minutes.toString() + ":";
    else
    {
      if(minutes>=10) minuteDisplay = minutes.toString() + ":";
      else minuteDisplay = "0"+minutes.toString() + ":";

    }

    hourDisplay = hours.toString() + ":";

    if(hours>0)
    {
      //don't display milliseconds (no space)
      millisecondDisplay = "";
      //get rid of trailing semicolon on seconds
      if(seconds>=10) secondDisplay = seconds.toString();
      else secondDisplay = "0"+seconds.toString();
    }

    //if hours is 0, don't show it
    if(hours===0) hourDisplay = "";
    //if minutes is 0, don't show it
    if(minutes===0 && hours===0) minuteDisplay = "";

    return ""+hourDisplay+minuteDisplay+secondDisplay+millisecondDisplay
  }

  else if(mode==="text")
  {
    let hourDisplay = "";
    let minuteDisplay = "";
    let secondDisplay = "";

    if(hours===0) hourDisplay="";
    else if(hours===1) hourDisplay=`${hours} hour`;
    else hourDisplay=`${hours} hours`;

    if(minutes===0) minuteDisplay="";
    else if(minutes===1) minuteDisplay=`${minutes} minute`;
    else minuteDisplay=`${minutes} minutes`;

    if(seconds===0) secondDisplay="";
    else if(seconds===1) secondDisplay=`${seconds} second`;
    else secondDisplay=`${seconds} seconds`;


    if(hourDisplay!=="" && (minuteDisplay!=="" || secondDisplay!=="")) hourDisplay=hourDisplay+", ";

    if(minuteDisplay!=="" && secondDisplay!=="") minuteDisplay=minuteDisplay+", ";

    return ""+hourDisplay+minuteDisplay+secondDisplay;
  }

  else if(mode==="numbers_full")
  {
    let hourDisplay = "";
    let minuteDisplay = "";
    let secondDisplay = "";


    if(seconds>=10) secondDisplay = seconds.toString();
    else secondDisplay = "0"+seconds.toString();

    if(minutes>=10) minuteDisplay = minutes.toString() + ":";
    else minuteDisplay = "0"+minutes.toString() + ":";

    if(hours>=10) hourDisplay = hours.toString() + ":";
    else hourDisplay = "0"+hours.toString() + ":";

    return ""+hourDisplay+minuteDisplay+secondDisplay
  }
  else
  {
    return "BAD_CALL";
  }

}



export {getTimeDisplay}
