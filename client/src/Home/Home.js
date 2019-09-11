import React from "react";
import "./Home.css";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

function Home() {
  return (
    <React.Fragment>
      <div className="homeContainer">
        <h1 className="title1">JAFT</h1>
        <h4 className="title2">Just Another Focus Timer</h4>
        <br />

        <Link to="/timer" className="openButton">
          Open App
        </Link>
        <span className="homeTagContainer">
          <span className="homeTags">
            <a
              href="https://medium.com/@nichwch/what-is-jaft-f543a4fad9d7"
              className="homeTagLink"
            >
              design philosophy
            </a>
          </span>
          {/*<span className="homeTags">
            <Link to="/features" className="homeTagLink">
              planned features
            </Link>
          </span>*/}
          <span className="homeTags">
            <a href="http://nicholaschen.io/" className="homeTagLink">
              my website
            </a>
          </span>
          <span className="homeTags">
            <a href="mailto:nichwch@gmail.com" className="homeTagLink">
              contact me
            </a>
          </span>
          <span className="homeTags">
            <a
              href="http://yananotes.com/"
              className="homeTagLink"
            >
              YANA notes
            </a>
          </span>
        </span>
        <h3 className="title3">JAFT is for staying focused</h3>
        <p>
          Use the timer to stay mindful of when you're focused, and when you're distracted. Create your own categories to track.
        </p>
        <h3 className="title3">JAFT is lenient</h3>
        <p>
          "Focus" apps that block distractions don't work. The internet is full of distractions, but it's also a useful tool.
          <br/><br/>
          Say you're a writer doing research. How is your blocker going to distinguish between articles you're using for research, and articles you're being
          distracted by? The low-hanging fruit is to block Facebook, Reddit, your obvious culprits. But what if you're wasting your time reading long-form
          New Yorker articles that, while interesting, have nothing to do with the article you're writing?
          <br/><br/>
          A better solution is to be mindful of <b>when</b> you're distracted.
          <img src="/how_to.jpg" width="100%">
          </img>
        </p>

        <h3 className="title3">JAFT is customizable</h3>
        <p>
          Most time trackers allow you to keep track of rough, pre-made categories -
          how much time you spend working, sleeping, exercizing, etc.
          <br/><br/>
          What if you want to track how much time you spend debugging, or searching for files?
          Or how much time you spend spacing out? There's no way an automatic time tracker can keep
          track of these categories.
          <br/><br/>
          JAFT allows you to define your own custom categories, and for you to manually track them.

        </p>

        <h3 className="title3">JAFT is for me</h3>
        <p>
          I struggle with staying focused. So, I made this app to help myself with that.
          <br />
          <br />
          This is <b>my</b> focus timer. The design choices will be weird
          because it's being designed for me and my idiosyncrasies. Just keep
          that in mind.
          <br />
          <br />
          Of course, feature requests and feedback are still appreciated.
        </p>
      </div>
    </React.Fragment>
  );
}

export default Home;
