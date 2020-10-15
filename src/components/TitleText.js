import React, { Component } from "react";
import "./titleText.css";
import "./components.css";

export default class TitleText extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={"titleText " + this.props.type}>
        <div className="titleTextFirst">
          <h3 style={{ color: this.props.color, textAlign: this.props.align }}>
            {" "}
            {this.props.preTitle}{" "}
          </h3>
          <h2
            className={this.props.titleH1}
            style={{
              color: this.props.titleColor,
              textAlign: this.props.align
            }}
          >
            {this.props.title}
          </h2>
        </div>
        <div className="titleTextSecond">
          <p
            style={{
              color: this.props.color,
              display: this.props.text !== null ? "block" : "none",
              textAlign: this.props.align
            }}
          >
            {" "}
            {this.props.text}{" "}
          </p>
          {returnButton(this.props)}
        </div>
      </div>
    );
  }
}

function returnButton(props) {
  if (props.buttonLabel !== null) {
    return <div></div>;
  } else {
    return null;
  }
}
