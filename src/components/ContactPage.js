import React, { Component } from "react";

import SvgIcons from "./SvgIcons.js";

import "./pages.css";

export default class ContactPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="contactPage">
        <div className="fullSection fullHeight">
          <div className="fullSectionContent limitWidthContent">
            <div className="contactUsContainer">
              <h2>Write Us</h2>
              <h5>Tell us about you...</h5>
              <h3>info@socialflowagency.com</h3>
              <p>
                Tell us about your project, brand or product or contact us to
                set up a virtual consultation and speak directly to one of our
                team members.
              </p>

              <h6>Socialflow Agency</h6>
            </div>
          </div>
          <div
            className="backSvg backRightBottom noShowTablet"
            style={{ bottom: "5%", right: "15%", transform: "rotate(15deg)" }}
          >
            <SvgIcons
              dimension="400px"
              iconName="heartMessage"
              fillColor="rgba(189, 202, 251, 1)"
            />
          </div>
          <div
            className="backSvg noShowTablet"
            style={{
              bottom: "5%",
              left: "15%",
              transform: "rotate(-15deg)"
            }}
          >
            <SvgIcons
              dimension="200px"
              iconName="star"
              fillColor="rgba(189, 202, 251, 1)"
            />
          </div>
          <div
            className="backSvg onlyTablet"
            style={{
              bottom: "0%",
              left: "5%",
              transform: "rotate(15deg)"
            }}
          >
            <SvgIcons
              dimension="150px"
              iconName="heartMessage"
              fillColor="rgba(189, 202, 251, 1)"
            />
          </div>
        </div>
      </div>
    );
  }
}
