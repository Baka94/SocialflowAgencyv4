import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./servicesSection.css";
import "./components.css";

import SvgIcons from "./SvgIcons.js";

export default class DigitalCreations extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="servicePage">
        <div className="fullSection">
          <div className="socialPostContainer limitWidthContent transparentBlueGradientBack">
            <div className="socialPostFull">
              <div className="digitalCreations">
                <div className="digitalPc">
                  <div className="searchBox">
                    <SvgIcons
                      dimension="12px"
                      iconName="web"
                      fillColor="rgba(252, 197, 215, 1)"
                    />
                  </div>
                  <div className="webBox">
                    <SvgIcons
                      dimension="60px"
                      iconName="photo"
                      fillColor="rgba(252, 197, 215, 1)"
                    />
                  </div>
                </div>
                <div className="digitalPhone">
                  <div className="phoneBox">
                    <SvgIcons
                      dimension="60px"
                      iconName="appstore"
                      fillColor="rgba(252, 197, 215, 1)"
                    />
                  </div>
                </div>
              </div>
              <div className="serviceName">
                <h5> Websites & more... </h5>
                <h1> Digital Creations </h1>
              </div>

              <button className="circleBtn circleBtnLight plusButton">
                <span className="circleBtnIcon">+</span>
              </button>
            </div>
          </div>
        </div>

        <div className="fullSection">
          <div className="fullSectionContent limitWidthContent">
            <div className="serviceDetailsGrid">
              <div className="serviceDetailsCard">
                <SvgIcons
                  dimension="50px"
                  iconName="domain"
                  fillColor="rgba(189, 202, 251, 1)"
                />
                <h3>Domain Selection</h3>
                <p>
                  {" "}
                  We help you find your way on the web from the very beginning
                  by choosing the right domain name.
                </p>
              </div>
              <div className="serviceDetailsCard">
                <SvgIcons
                  dimension="50px"
                  iconName="design"
                  fillColor="rgba(189, 202, 251, 1)"
                />
                <h3>Branding & Design</h3>
                <p>
                  {" "}
                  Our tem will assist you in moving your branding and design
                  lenguage to the web, updating it or even creating a new one
                  tht fits even better.
                </p>
              </div>
              <div className="serviceDetailsCard">
                <SvgIcons
                  dimension="50px"
                  iconName="responsive"
                  fillColor="rgba(189, 202, 251, 1)"
                />
                <h3>Responsive Content</h3>
                <p>
                  {" "}
                  Just having a website it's not enugh, it should be an
                  experience capable of being lived torugh every screen.
                </p>
              </div>
              <div className="serviceDetailsCard">
                <SvgIcons
                  dimension="50px"
                  iconName="database"
                  fillColor="rgba(189, 202, 251, 1)"
                />
                <h3>Database management</h3>
                <p>
                  {" "}
                  If your web presence is in need of a place to store digital
                  content and client informations, we got tht covered too.{" "}
                </p>
              </div>
              <div className="serviceDetailsCard serviceDetailsCardLast">
                <SvgIcons
                  dimension="50px"
                  iconName="heartMessage"
                  fillColor="rgba(189, 202, 251, 1)"
                />
                <h3>Can't Find What Your Are Looking For?</h3>
                <p> Get in touch and let us know what you need. </p>
                <Link to={"/Contacts"}>
                  <button className="simpleBtn simpleBtnDark">
                    <h4> CONTACT US </h4>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="backSvg backRightTop">
            <SvgIcons
              dimension="200px"
              iconName="star"
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
              dimension="250px"
              iconName="ideaGear"
              fillColor="rgba(189, 202, 251, 1)"
            />
          </div>
        </div>
      </div>
    );
  }
}
