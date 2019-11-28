import React, { Component } from "react";
import { catArray } from "../components/ImagesOfChonks";

export default class HallOfChonks extends Component {
  calculateAverage = arr => {
    const sum = arr.reduce((acc, ini) => parseInt(acc) + parseInt(ini), 0);
    return sum / arr.length;
  };

  render() {
    return (
      <section className="hall">
        <h2>HallOfChonks</h2>
        {catArray.map((cat, i) => {
          return (
            <div key={i} className="hallCatImageContainer">
              <img src={cat} alt="chonk" />
            </div>
          );
        })}
      </section>
    );
  }
}
