import React, { Component } from "react";
// firebase
import "firebase/database";
import firebase from "../util/config";
// database
const db = firebase.database();

class hallOfChonks extends Component {
  state = {
    allCatsArray: [],
    sortedCatArrToRender: null
  };

  componentDidMount() {
    db.ref("cats").once("value", snapshot => {
      const data = snapshot.val();
      if (data) {
        for (const key in data) {
          if (data.hasOwnProperty(key) && data[key] !== "") {
            const cat = data[key];
            cat.catAverageScore = null;
            this.setState({
              allCatsArray: [...this.state.allCatsArray, cat]
            });
          }
        }

        this.generateObjectForSorting(this.state.allCatsArray);
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

  generateObjectForSorting = arrayToSort => {
    for (const key in arrayToSort) {
      if (arrayToSort.hasOwnProperty(key)) {
        const cat = arrayToSort[key];
        cat.catAverageScore = this.calculateAverage(cat.catArrForAverage);
      }
    }

    const sortedAllCatsArray = this.sortCatsObjectByHighScore(arrayToSort);
    this.setState({
      sortedCatArrToRender: sortedAllCatsArray
    });
  };

  sortCatsObjectByHighScore = objToSort => {
    return objToSort.sort((a, b) =>
      a.catAverageScore < b.catAverageScore ? 1 : -1
    );
  };

  // rendering helper fn
  renderAllCats = sortedCatArr => {
    return sortedCatArr.map((cat, i) => {
      const catAverageScore = Math.round(cat.catAverageScore);
      const catSrc = cat.imageUrl;

      return (
        <li key={i} class="hallCatImageContainer">
          <img src={catSrc} alt="chonk" />
          <p>Average Chonk Score: {catAverageScore}</p>
        </li>
      );
    });
  };

  render() {
    return (
      <section className="hall">
        {this.state.sortedCatArrToRender === null ? (
          // change to to loading circle/skaleton
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

export default hallOfChonks;
