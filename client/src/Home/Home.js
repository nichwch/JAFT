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
              href="https://medium.com/@nichwch/what-is-yana-80651554c159?source=your_stories_page---------------------------"
              className="homeTagLink"
            >
              design philosophy
            </a>
          </span>
          <span className="homeTags">
            <a
              href="https://medium.com/@nichwch/making-yana-e3fade3f56e7"
              className="homeTagLink"
            >
              making JAFT
            </a>
          </span>
          {/*<span className="homeTags">
            <Link to="/features" className="homeTagLink">
              planned features
            </Link>
          </span>*/}
          <span className="homeTags">
            <a href="https://nichwch.github.io/" className="homeTagLink">
              my website
            </a>
          </span>
          <span className="homeTags">
            <a href="mailto:nichwch@gmail.com" className="homeTagLink">
              contact me
            </a>
          </span>
        </span>
        <h3 className="title3">JAFT is for staying focused</h3>
        <p>
          Use the timer to stay mindful of when you're focused, and when you're distracted. Use the scratch area to put down any temporary thoughts.
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
        </p>

        <h3 className="title3">JAFT is your mental "RAM"</h3>
        <p>
          Longform thoughts belong in your notebook, short but clever thoughts belong on your twitter. Plans and schedules belong in your planner.
          <br/><br/>
          What about "scratch" thoughts? You're working on a project, and you've thought out a few tasks you think you should knock out.
          Where do you write them down? It wouldn't make sense to clutter your journal with scratch-work. The notes app on your Mac would work for "scratch" thoughts,
          But, you might be scribbling down phone numbers, reminders, shopping lists there already - it'd be nice to have
          a place just for your scratch work.
          <br/><br/>
          Here's an analogy for you. Your notebook/planner is your <b>Hard Drive</b>, JAFT is your <b>Random Access Memory</b>. In other words, it's a place for you
          to write down things you don't neccessarily need to hold on to long-term. Think of it as mental scratch paper, built right into your focus timer.
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
