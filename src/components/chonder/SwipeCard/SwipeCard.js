import React, { Component } from "react";
import Swing from 'react-swing'

export default class SwipeCard extends Component {
  render() {
    return (
      <div>
        <Swing
          className="stack"
          tagname="div"
          setStack={stack => this.setState({ stack: stack })}
          ref="stack"
          throwout={e => console.log("throwout", e)}
        >
          {/*
            children elements is will be Card
        */}
          <div
            className="card clubs"
            ref="card1"
            throwout={e => console.log("card throwout", e)}
          >
            Hello
          </div>
          <div className="card diamonds" ref="card2">
            ♦
          </div>
          <div className="card hearts" ref="card3">
            ♥
          </div>
          <div className="card spades" ref="card4">
            ♠
          </div>
        </Swing>
      </div>
    );
  }
}
