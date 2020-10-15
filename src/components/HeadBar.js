import React, { useState } from "react";

import SvgIcons from "./SvgIcons.js";

import "./headBar.css";
import { Link } from "react-router-dom";

export default function HeadBar(props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleMenu(value) {
    setIsOpen(value);
  }

  return (
    <div
      className={
        isOpen
          ? "headBarContainer headBarContainerActive"
          : props.isTop
          ? "headBarContainer headBarContainerTop"
          : "headBarContainer"
      }
    >
      <div className="headBar limitWidthContent">
        <Link to={"/"} className="headBarTitle">
          <SvgIcons
            dimension="125px"
            iconName="socialflowFullLogo"
            fillColor="#060606"
          />
        </Link>
        <div className="headBarButton" onClick={() => handleMenu(!isOpen)}>
          <button
            className="circleBtn circleBtnDark"
            style={{ margin: 0, height: "35px" }}
          >
            <span className="headBarButtonContent circleBtnIcon">+</span>
          </button>
        </div>
      </div>
      <div className="headBarMenu">
        <div className="headBarMenuItems">
          <h2 className="headBarMenuItem" onClick={() => handleMenu(false)}>
            <Link to={"/"}>Home</Link>
          </h2>
          <h2 className="headBarMenuItem" onClick={() => handleMenu(false)}>
            <Link to={"/Projects"}>Case History</Link>
          </h2>
          <h2 className="headBarMenuItem" onClick={() => handleMenu(false)}>
            <Link to={"/Services"}>Services</Link>
          </h2>
          <h2 className="headBarMenuItem" onClick={() => handleMenu(false)}>
            <Link to={"/Contacts"}>Contacts</Link>
          </h2>
          <h2 className="headBarMenuItem" onClick={() => handleMenu(false)}>
            <Link to={"/Aboutus"}>About Us</Link>
          </h2>
        </div>
        <div className="socialBox">
          <a
            href="https://www.instagram.com/socialflowagency"
            className="socialItem"
          >
            <SvgIcons
              dimension="30px"
              iconName="linkedin"
              fillColor="#060606"
            />
          </a>
          <a
            href="https://www.instagram.com/socialflowagency"
            className="socialItem"
          >
            <SvgIcons
              dimension="30px"
              iconName="instagram"
              fillColor="#060606"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
