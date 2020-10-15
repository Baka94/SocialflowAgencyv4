import React, { Component } from "react";
import PlayButton from "./PlayButton.js";

const withDefaultCarousel = CardComponent => {
  class WithDefaultCarousel extends Component {
    constructor(props) {
      super(props);

      this.state = {
        /*Initial settings*/
        orientation: this.props.orientation,
        direction: this.props.direction,
        /*Direction: fromStart (means Left to Right & Top to Bottom) - fromEnd - center*/
        goFullScreen: this.props.goFullScreen,
        maxItemsToLoad: this.props.maxItemsToLoad,
        /* Carousel settings */
        maxItemsInView: this.props.maxItemsInView,
        carouselDimension: 0,
        itemDimension: this.props.itemDimension,
        carouselViewDimension: 0,
        carouselOffset: this.props.carouselOffset,
        centerItems: this.props.centerItems,
        /* Caousel movement variables */
        disabled: false,
        clickActive: false,
        startXorY: 0,
        currentXorY: 0,
        dist: 0,
        totalDist: 0,
        fastSwipeDist: 320,
        fastSwipeTime: 120,
        startTime: 0,
        marginThreshold: 0,
        maxMargin: 0,
        /* Item settings */
        highlightItem: this.props.highlightItem
      };

      this.touchStart = this.touchStart.bind(this);
      this.touchMove = this.touchMove.bind(this);
      this.touchEnd = this.touchEnd.bind(this);
      this.handleButtons = this.handleButtons.bind(this);

      this.changeHighlight = this.changeHighlight.bind(this);

      this.CarouselRef = React.createRef();
    }

    componentDidMount() {
      this.setState({
        carouselViewDimension: this.CarouselRef.current.offsetWidth
      });

      if (this.props.centerItems) {
        let addToOffset =
          (this.CarouselRef.current.offsetWidth - this.props.carouselOffset) /
            2 -
          this.props.itemDimension / 2;
        this.setState({
          carouselOffset: this.props.carouselOffset + addToOffset
        });
      }

      let finalItemDimension = this.props.itemDimension;
      let carouselViewDimension =
        this.CarouselRef.current.offsetWidth - this.state.carouselOffset;
      let carouselDimension;

      if (
        this.props.minItemsInView !== null &&
        carouselViewDimension - this.state.carouselOffset <
          this.props.itemDimension * this.props.minItemsInView
      ) {
        finalItemDimension = Math.round(
          carouselViewDimension / this.props.minItemsInView
        );
      }

      if (
        this.props.maxItemsInView !== null &&
        carouselViewDimension - this.state.carouselOffset >
          this.props.itemDimension * this.props.maxItemsInView
      ) {
        finalItemDimension = Math.round(
          carouselViewDimension / this.props.maxItemsInView
        );
      }

      carouselDimension = this.props.maxItemsToLoad * finalItemDimension;

      this.setState({
        itemDimension: finalItemDimension,
        carouselDimension: carouselDimension
      });

      let marginThreshold;
      let maxMargin;
      if (this.state.centerItems) {
        marginThreshold =
          carouselDimension + finalItemDimension - this.state.carouselOffset;
        maxMargin = -(
          finalItemDimension * (this.state.maxItemsToLoad - 1) +
          this.props.carouselOffset
        );
      } else {
        marginThreshold =
          carouselDimension - carouselViewDimension + this.state.carouselOffset;
        maxMargin =
          -1 *
          (carouselDimension -
            Math.floor(
              (carouselViewDimension - this.state.carouselOffset) /
                finalItemDimension
            ) *
              finalItemDimension);
      }

      this.setState({
        marginThreshold: marginThreshold,
        maxMargin: maxMargin,
        dist: -1 * (this.props.itemDimension * this.props.highlightItem),
        totalDist: -1 * (this.props.itemDimension * this.props.highlightItem)
      });

      /* Attaching different event handlers (using this method cause of chrome issue)
        Event handlers are different cause the difference in the returned object e from the event between touch and mouse
      */

      this.CarouselRef.current.addEventListener("touchstart", this.touchStart, {
        passive: false
      });
      this.CarouselRef.current.addEventListener("touchmove", this.touchMove, {
        passive: false
      });
      this.CarouselRef.current.addEventListener("touchend", this.touchEnd, {
        passive: false
      });
      this.CarouselRef.current.addEventListener("mousedown", this.touchStart, {
        passive: false
      });
      this.CarouselRef.current.addEventListener("mousemove", this.touchMove, {
        passive: false
      });
      this.CarouselRef.current.addEventListener("mouseup", this.touchEnd, {
        passive: false
      });
      /*this.CarouselRef.current.addEventListener("mouseleave", this.touchEnd, {
        passive: false
      });*/
    }

    touchStart(e) {
      /*e.preventDefault({ passive: false });*/

      let XorY;

      XorY = getCoordinates(e, this.state.orientation);

      this.setState({
        clickActive: true,
        startXorY: XorY,
        currentXorY: XorY,
        startTime: new Date().getTime()
      });
    }

    touchMove(e) {
      /* e.preventDefault({ passive: false });*/

      let movement;
      let XorY;

      XorY = getCoordinates(e, this.state.orientation);

      if (this.state.clickActive) {
        movement = XorY - this.state.startXorY;
        movement += this.state.totalDist;
        this.setState({
          dist: movement,
          currentXorY: XorY
        });
      }
    }

    touchEnd() {
      let movement;
      let XorY;

      XorY = this.state.currentXorY;

      movement = XorY - this.state.startXorY;

      /*swipeDist is the absolute value of the distance prim the start of the touch to the end*/
      let swipeDist = Math.abs(movement);

      let elapsedTime = new Date().getTime() - this.state.startTime;

      /* calcTotalDist is just a variable to calculate the totalDist without modifying the state at aevery calculation*/
      let calcTotalDist = this.state.totalDist;

      /* Calculating how much to move depending on the swipe
            control if swipe dist is greater than 100
              if yes control if meets requirements for the fast swipe 
                if is a fast swipe, set the movement for 1.5 times the number of items in view
              if it is not a fast swipe
                if it is a small swipe, set the movement to move only 1 item
                if it is a large swipe, set the movement to move the number of items that can be cpntained in the swipe distance itself 
          */
      if (swipeDist > 100) {
        if (
          elapsedTime < this.state.fastSwipeTime &&
          swipeDist > this.state.fastSwipeDist
        ) {
          calcTotalDist +=
            Math.sign(movement) *
            this.state.itemDimension *
            Math.round(
              (this.state.carouselViewDimension * 1.2) /
                this.state.itemDimension
            );
        } else {
          if (swipeDist <= this.state.itemDimension) {
            calcTotalDist += Math.sign(movement) * this.state.itemDimension;
          }
          if (swipeDist > this.state.itemDimension) {
            calcTotalDist +=
              Math.sign(movement) *
              Math.round(swipeDist / this.state.itemDimension) *
              this.state.itemDimension;
          }
        }
      }

      if (calcTotalDist > 0) {
        calcTotalDist = 0;
      } else {
        if (Math.abs(calcTotalDist) > this.state.marginThreshold) {
          calcTotalDist = this.state.maxMargin;
        }
      }

      this.setState({
        clickActive: false,
        totalDist: calcTotalDist,
        dist: calcTotalDist
      });
    }

    changeHighlight(newHighlight) {
      let calcTotalDist;
      if (
        (this.state.carouselViewDimension - this.state.carouselOffset) /
          this.state.itemDimension >
          1 &&
        this.state.centerItems === false
      ) {
        calcTotalDist = -1 * (this.state.itemDimension * (newHighlight - 1));
      } else {
        calcTotalDist = -1 * (this.state.itemDimension * newHighlight);
      }

      if (calcTotalDist > 0) {
        calcTotalDist = 0;
      } else {
        if (Math.abs(calcTotalDist) > this.state.marginThreshold) {
          calcTotalDist = this.state.maxMargin;
        }
      }

      this.setState({
        highlightItem: newHighlight,
        dist: calcTotalDist,
        totalDist: calcTotalDist
      });
    }

    handleButtons(direction) {
      let calcTotalDist;
      if (direction === "next") {
        calcTotalDist = this.state.totalDist - this.state.itemDimension;
      } else {
        calcTotalDist = this.state.totalDist + this.state.itemDimension;
      }

      if (calcTotalDist > 0) {
        calcTotalDist = 0;
      } else {
        if (Math.abs(calcTotalDist) > this.state.marginThreshold) {
          calcTotalDist = this.state.maxMargin;
        }
      }

      this.setState({
        totalDist: calcTotalDist,
        dist: calcTotalDist
      });
    }

    render() {
      let itemsToLoad = this.props.cardsList.slice(
        0,
        this.state.maxItemsToLoad
      );

      let carouselItemsStyle;
      if (this.state.orientation === "horizontal") {
        carouselItemsStyle = itemsToLoad.map((item, index) => ({
          marginLeft: this.state.clickActive
            ? this.state.dist + this.state.itemDimension * index + "px"
            : this.state.dist + this.state.itemDimension * index + "px",
          width: this.state.itemDimension
        }));
      } else {
        carouselItemsStyle = itemsToLoad.map((item, index) => ({
          marginTop: this.state.dist + this.state.itemDimension * index + "px",
          width: this.state.itemDimension
        }));
      }

      let carouselItems = itemsToLoad.map((item, index) => (
        <div
          className="defaultCarouselItemWrapper"
          style={carouselItemsStyle[index]}
        >
          <div
            className="defaultCarouselItem"
            onClick={() => this.changeHighlight(index)}
            style={{ padding: "0px " + this.props.itemPadding + "px" }}
          >
            <CardComponent
              key={item.id}
              item={item}
              dimension={this.state.itemDimension}
              isHighlight={this.state.highlightItem === index ? true : false}
            />
          </div>
        </div>
      ));

      return (
        <div
          ref={this.CarouselRef}
          className="defaultCarousel"
          style={{
            paddingLeft: this.state.carouselOffset + "px",
            height:
              this.state.itemDimension * this.props.itemDimRateo -
              this.props.itemPadding
          }}
        >
          <div
            className="defaultCarouselControl previous"
            //onClick={() => this.handleButtons("previous")}
            style={{ marginLeft: -this.state.carouselOffset }}
          >
            <PlayButton
              buttonIcon={">"}
              radius={120}
              minDimension={30}
              maxDimension={60}
              iconDimRateo={4}
              color={"#F6F6F6"}
              icon={"icon-keyboard_arrow_left"}
              handleClick={this.handleButtons}
              returnValue={"previous"}
            />
          </div>
          <div
            className="defaultCarouselControl next"
            //onClick={() => this.handleButtons("next")}
          >
            <PlayButton
              buttonIcon={">"}
              radius={120}
              minDimension={30}
              maxDimension={60}
              iconDimRateo={4}
              color={"#F6F6F6"}
              icon={"icon-keyboard_arrow_right"}
              handleClick={this.handleButtons}
              returnValue={"next"}
            />
          </div>
          {carouselItems}
        </div>
      );
    }
  }
  return WithDefaultCarousel;
};

/*Function to get coordinates independently if it's a touch or mouse event*/
function getCoordinates(e, orientation) {
  let xValue, yValue;

  if (e.touches !== undefined) {
    xValue =
      e.touches[0].clientX - e.currentTarget.getBoundingClientRect().left;
    yValue = e.touches[0].clientY - e.currentTarget.getBoundingClientRect().top;
    //console.log(xValue);
  } else {
    xValue = e.clientX - e.currentTarget.getBoundingClientRect().left;
    yValue = e.clientY - e.currentTarget.getBoundingClientRect().top;
    //console.log(xValue);
  }

  if (orientation === "horizontal") {
    return xValue;
  } else return yValue;
}

export default withDefaultCarousel;
