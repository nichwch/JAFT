import React from "react";
import "./Home.css";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

function Features() {
  return (
    <React.Fragment>
      <div className="homeContainer">
        <h1 className="title1">JAFT</h1>
        <h4 className="title2">Just Another Focus Timer</h4>
        <br />

        <Link to="/" className="openButton">
          Back
        </Link>

        <h2 className="featureList">Feature List</h2>
        <p>
          Email me at nichwch@gmail.com if you have feature requests. I'll add
          it to the list if I like it.
        </p>
        <h3 className="title3">Probably Happening</h3>
        <ul>
          <li>color coded tags</li>
          <li>cloud backups</li>
          <li>autocomplete for tag entry</li>
          <li>change primary color</li>
        </ul>
        <h3 className="title3">Maybe Happening</h3>
        <ul>
          <li>google calendar integration</li>
          <li>slack integration?? idk</li>
          <li>native desktop application (electron.js)</li>
        </ul>
        <h3 className="title3">Forget About It</h3>
        <ul>
          <li>
            Mobile (unless I figure an intuitive way to do selection on mobile)
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}

export default Features;
