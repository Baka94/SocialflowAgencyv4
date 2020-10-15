import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Homepage from "./components/Homepage.js";
import CaseHistory from "./components/CaseHistory";
import ProjectPage from "./components/ProjectPage.js";
import ContactPage from "./components/ContactPage.js";
import InfluencerMarketing from "./components/InfluencerMarketing.js";
import SocialMediaManagement from "./components/SocialMediaManagement.js";
import DigitalCreations from "./components/DigitalCreations.js";
import ServicesPage from "./components/ServicesPage.js";
import Footer from "./components/Footer.js";
import HeadBar from "./components/HeadBar.js";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTop: true
    };

    this.mainPageRef = React.createRef();
  }

  componentDidMount() {
    this.mainPageRef.current.addEventListener("scroll", this.listenToScroll);
  }

  componentWillUnmount() {
    this.mainPageRef.current.removeEventListener("scroll", this.listenToScroll);
  }

  listenToScroll = () => {
    if (this.mainPageRef.current.scrollTop > 20) {
      this.setState({
        isTop: false
      });
    } else {
      this.setState({
        isTop: true
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.mainPageRef.current.scrollTop = 0;
    }
  }

  render() {
    return (
      <div className="App">
        <div className="mainPage" ref={this.mainPageRef}>
          <HeadBar isTop={this.state.isTop} />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/Services" component={ServicesPage} />
            <Route
              path="/InfluencerMarketing"
              component={InfluencerMarketing}
            />
            <Route
              path="/InfluencerMarketing"
              component={InfluencerMarketing}
            />
            <Route path="/DigitalCreations" component={DigitalCreations} />
            <Route
              path="/SocialMediaManagement"
              component={SocialMediaManagement}
            />
            <Route path="/Contacts" component={ContactPage} />
            <Route path="/Projects" component={CaseHistory} />
            <Route path="/ProjectPage/:Project" component={ProjectPage} />
            <Route path="/AboutUs" component={ContactPage} />
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
