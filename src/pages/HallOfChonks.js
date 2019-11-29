import React, { Component } from "react";
import { catArray } from "../components/ImagesOfChonks";
import "firebase/database";
import firebase from "../util/config";
const db = firebase.database();

export default class HallOfChonks extends Component {
  state = {
    catHandlesArray: ["cat0", "cat1", "cat2", "cat3"],
    cats: null
  };

  componentDidMount() {
    db.ref("cats").on("value", snapshot => {
      const data = snapshot.val();
      if (data) {
        this.setState({
          cats: data
        });
      }
    });
  }

  calculateAverage = arr => {
    const sum = arr.reduce((acc, ini) => parseInt(acc) + parseInt(ini), 0);
    return sum / arr.length;
  };

  renderAllCats = () => {
    if (this.state.cats) {
      return this.state.catHandlesArray.map(cat => {
        const catIndex = this.state.catHandlesArray.indexOf(cat);
        const catObject = this.state.cats[cat];
        const catAverageScore = this.calculateAverage(
          catObject.catArrForAverage
        );
        const catSrc = catArray[catIndex];

        return (
          <li key={catIndex} className="hallCatImageContainer">
            <img src={catSrc} alt="chonk" />
            <h2>Chonk Score Average: {catAverageScore}</h2>
          </li>
        );
      });
    } else {
      return <h2>No Chonk Data !</h2>;
    }
  };

  render() {
    return (
      <section className="hall">
        <h2>HallOfChonks</h2>
        <ul className="hallListOfCats">{this.renderAllCats()}</ul>
      </section>
    );
  }
}
