import React from "react";
import App from './App';
import Home from './Home/Home';
import Features from './Home/Features';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Main()
{
  return(
    <React.Fragment>
      <Route path="/timer" component={App} />
      <Route path="/features" component={Features} />
      <Route path="/" exact component={Home} />
    </React.Fragment>
  )
}

export default Main
