import React, { PureComponent } from "react";
// firebase
import "firebase/database";
import firebase from "../util/config";
// Mui
import LinearProgress from "@material-ui/core/LinearProgress";
// infinite scroll for lazy load
import InfiniteScroll from "react-infinite-scroll-component";
// scroll to top
import ScrollUpButton from "react-scroll-up-button";
// database
const db = firebase.database();

class hallOfChonks extends PureComponent {
  state = {
    allCatsArray: [],
    sortedCatArrToRender: null,
    chunkedArrays: null,
    pages: null,
    pageNumber: 0,
    hasMore: true
  };

  componentDidMount() {
    db.ref("cats").once("value", snapshot => {
      const data = snapshot.val();
      if (data) {
        for (const key in data) {
          // data[key] !== "" is a bug idk how to fix
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

  sortCatsObjectByHighScore = objToSort => {
    return objToSort.sort((a, b) =>
      a.catAverageScore < b.catAverageScore ? 1 : -1
    );
  };

  // https://ourcodeworld.com/articles/read/278/how-to-split-an-array-into-chunks-of-the-same-size-easily-in-javascript
  // we chunk the array to smaller size for pagination and lazy load
  chunkArray = (rawData, chunk_size) => {
    let chunkedData = [];
    while (rawData.length) {
      chunkedData.push(rawData.splice(0, chunk_size));
    }
    return chunkedData;
  };

  generateObjectForSorting = arrayToSort => {
    for (const key in arrayToSort) {
      if (arrayToSort.hasOwnProperty(key)) {
        const cat = arrayToSort[key];
        cat.catAverageScore = this.calculateAverage(cat.catArrForAverage);
      }
    }

    const sortedAllCatsArray = this.sortCatsObjectByHighScore(arrayToSort);

    // here we want to separate them into pages
    const chunkedArrays = this.chunkArray(sortedAllCatsArray, 16);

    this.setState({
      pages: chunkedArrays.length,
      chunkedArrays,
      sortedCatArrToRender: chunkedArrays[0]
    });
  };

  // fetching / lazy loading logic
  fetchMoreData = () => {
    if (this.state.pages - 1 !== this.state.pageNumber) {
      let newPageNumber = this.state.pageNumber;
      this.setState(
        {
          pageNumber: newPageNumber + 1
        },
        () => {
          this.setState({
            sortedCatArrToRender: this.state.sortedCatArrToRender.concat(
              this.state.chunkedArrays[this.state.pageNumber]
            )
          });
        }
      );
    } else {
      this.setState({
        hasMore: false
      });
    }
  };

  renderAllCats = sortedCatArr => {
    return sortedCatArr.map((cat, i) => {
      const catAverageScore = Math.round(cat.catAverageScore);
      const catSrc = cat.imageUrl;
      return (
        <div key={i} className="hallCatImageContainer">
          <img src={catSrc} alt="chonk" />
          <div className="user-controls">
            <p>Average Chonk Score: {catAverageScore}</p>
            <button>View Full</button>
            <button>Favorite</button>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <section className="hall">
        {this.state.sortedCatArrToRender === null ? (
          <LinearProgress
            style={{ position: "absolute", top: "64px", left: "0", right: "0" }}
            color="secondary"
          />
        ) : (
          <InfiniteScroll
            className="hallListOfCats"
            scrollThreshold={0.7}
            dataLength={this.state.sortedCatArrToRender.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasMore}
          >
            {this.renderAllCats(this.state.sortedCatArrToRender)}
          </InfiniteScroll>
        )}
        <ScrollUpButton style={{ bottom: "40px" }} AnimationDuration={0} />
      </section>
    );
  }
}

export default hallOfChonks;
