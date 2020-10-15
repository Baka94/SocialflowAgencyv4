import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./components.css";

export default class VideoSection extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  openVideo() {
    console.log("clicked play button");
  }

  render() {
    return (
      <div className="videoSection">
        <div className="videoSectionLeft">
          <div className="tikenModule">
            <div className="tiken firstTiken">
              <div className="tikenTop">
                <h2> 30+ </h2>
              </div>
              <div className="tikenBottom">
                <h6> Events Organized. </h6>
              </div>
            </div>
            <div className="tiken secondTiken">
              <div className="tikenTop">
                <h2> 12000+ </h2>
              </div>
              <div className="tikenBottom">
                <h6> Fans gathered together. </h6>
              </div>
            </div>
            <div className="tiken thirdTiken">
              <div className="tikenTop">
                <h2> 10+ </h2>
              </div>
              <div className="tikenBottom">
                <h6> Clients on tour with us. </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="videoOverlay"></div>
        <video loop playsInline autoPlay muted>
          <source
            src="https://socialflowagency.com/wp-content/uploads/2019/12/Socialflow-Party.mp4"
            /*src="https://www.tesla.com/ns_videos/charging_overview_hero.mp4"*/
            type="video/mp4"
          />
          <img
            src="https://socialflowagency.com/wp-content/uploads/2019/05/VivienMarcucci.jpg"
            alt="nothing"
          />
          Your browser does not support the video tag.
        </video>

        <div className="videoSectionRight">
          <div className="seiteInfo">
            <div className="seiteTitle">
              <h5> Live Events </h5>
              <h2> We Take Your Brand In Tour With Influencers</h2>
            </div>
            <div className="seiteText">
              <p>
                {" "}
                We organize live events to let people see, touch, feel and enjoy
                your brand's products first hand. <br /> Our influencers bring
                their fans and together, they share amazing stories.{" "}
              </p>
            </div>
            <div className="seiteButtons">
              <Link to={"/Contacts"}>
                <button className="circleBtn circleBtnDark">
                  <span className="circleBtnIcon">+</span>
                  <h4> FIND OUT MORE </h4>
                </button>
              </Link>
              <Link to={"/Contacts"}>
                <button className="simpleBtn simpleBtnDark">
                  <h4> CONTACT US </h4>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
