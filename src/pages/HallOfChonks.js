import React, { Component } from "react";
// firebase
import "firebase/database";
import firebase from "../util/config";
// cat imgs
import { catArray } from "../components/ImagesOfChonks";
const db = firebase.database();

export default class hallOfChonks extends Component {
  state = {
    catHandlesArray: [],
    catObjectToSort: {},
    sortedCatArrToRender: null,
    cats: null
  };

  componentDidMount() {
    db.ref("cats").once("value", snapshot => {
      const data = snapshot.val();
      if (data) {
        this.setState({
          cats: data,
          catHandlesArray: Object.keys(data)
        });

        this.generateObjectForSorting(data);
      }
    });
  }

  calculateAverage = arr => {
    if (arr) {
      const sum = arr.reduce((acc, ini) => parseInt(acc) + parseInt(ini), 0);
      return sum / arr.length;
    } else {
      return 0;
    }
  };

  generateObjectForSorting = dataFromFirebase => {
    let newCatObjectToSort = {};
    this.state.catHandlesArray.forEach(cat => {
      const catAverageScore = this.calculateAverage(
        dataFromFirebase[cat].catArrForAverage
      );
      newCatObjectToSort = {
        ...newCatObjectToSort,
        [cat]: catAverageScore
      };
    });
    this.setState({
      catObjectToSort: newCatObjectToSort
    });
    this.sortCatsObjectByHighScore(this.state.catObjectToSort);
  };

  sortCatsObjectByHighScore = objToSort => {
    let sortedCatsArr = [];

    for (const key in objToSort) {
      if (objToSort.hasOwnProperty(key)) {
        const cat = objToSort[key];
        sortedCatsArr.push([key, cat]);
      }
    }
    const resultToRender = sortedCatsArr.sort((a, b) => b[1] - a[1]);
    this.setState({
      sortedCatArrToRender: resultToRender
    });
  };

  renderAllCats = sortedCatArr => {
    console.log(sortedCatArr);
    if (this.state.cats) {
      return sortedCatArr.map(cat => {
        const catIndex = this.state.catHandlesArray.indexOf(cat[0]);
        const catAverageScore = cat[1];
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

        {this.state.sortedCatArrToRender === null ? (
          <h2>Loading ... </h2>
        ) : (
          <ul className="hallListOfCats">
            {this.renderAllCats(this.state.sortedCatArrToRender)}
          </ul>
        )}
      </section>
    );
  }
}
