import React, { Component } from "react";
// images
import cat0 from "../assets/c1.jpg";
import cat1 from "../assets/c2.png";
import cat2 from "../assets/c3.jpg";
import cat3 from "../assets/c4.jpg";

export const catArray = [cat0, cat1, cat2, cat3];

export default class ImagesOfChonks extends Component {
  render() {
    return (
      <div className="catImageContainer">
        <img src={catArray[this.props.count]} alt="cat" />
      </div>
    );
  }
}
