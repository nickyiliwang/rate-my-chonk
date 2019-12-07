import React, { Component } from "react";
// components
import DisplaySingleChonk from "../components/DisplaySingleChonk";
import { HandleUserFavorite } from "../components/HandleUserFavorites";
// chonk scale image
import scale from "../assets/scale.jpg";
// firebase
import "firebase/database";
import firebase from "../util/config";
import "firebase/auth";
// redux
import { connect } from "react-redux";
// firebase database
const db = firebase.database();

class chonder extends Component {
  state = {
    catHandle: "",
    catUrl: "",
    maxCats: null,
    catCount: 0,
    catRating: 0,
    catRatingsArr: [],
    allFavCatsHandlesArray: []
  };

  componentDidMount() {
    const { allCatsArray, allFavCatsArray } = this.props;
    const { catCount } = this.state;
    if (allCatsArray[0]) {
      this.setState(
        {
          maxCats: allCatsArray.length,
          catHandle: allCatsArray[catCount].id,
          catUrl: allCatsArray[catCount].url
        },
        () => {
          db.ref("cats/" + this.state.catHandle).on("value", snapshot => {
            const data = snapshot.val();
            if (data) {
              this.setState({
                catRatingsArr: data.catArrForAverage
              });
            }
          });
          db.ref("users/" + this.props.userId).on("value", snapshot => {
            const data = snapshot.val();
            if (data) {
              this.setState({
                allFavCatsHandlesArray: [
                  ...this.state.allFavCatsHandlesArray,
                  data.userFavorites
                ]
              });
            }
          });
        }
      );
    }

    if (allFavCatsArray[0]) {
      allFavCatsArray.forEach(cat => {
        this.setState({
          allFavCatsHandlesArray: [...this.state.allFavCatsHandlesArray, cat]
        });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // if the catCount changes, get the cat's avgRating array again from db
    if (prevState.catCount !== this.state.catCount) {
      const { catHandle } = this.state;
      db.ref("cats/" + catHandle).once("value", snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState({
            catRatingsArr: data.catArrForAverage
          });
        }
      });
    }
  }

  incrementImgCounter = () => {
    const { allCatsArray } = this.props;
    const { catCount, maxCats } = this.state;

    if (catCount < maxCats - 1) {
      this.setState({
        catCount: catCount + 1,
        catHandle: allCatsArray[catCount + 1].id,
        catUrl: allCatsArray[catCount + 1].url
      });
    } else {
      this.setState({
        catCount: 0,
        catHandle: allCatsArray[0].id,
        catUrl: allCatsArray[0].url
      });
    }
  };

  handleSkipOnClick = () => {
    this.incrementImgCounter();
    this.setState({ catRating: 0 });
  };

  updateCatData = (catId, ratingArr, imageUrl) => {
    db.ref("cats/" + catId).update({
      imageUrl,
      catArrForAverage: ratingArr
    });
  };

  handleSubmitOnClick = () => {
    const { catHandle, catRatingsArr, catRating, catUrl } = this.state;
    // get current cat array numbers from db, set state for later use
    const newCatArrForAverage = [...catRatingsArr, catRating];
    this.setState({
      catRatingsArr: newCatArrForAverage
    });

    this.updateCatData(catHandle, newCatArrForAverage, catUrl);
    this.incrementImgCounter();
    // reset for next vote
    this.setState({ catRating: 0 });
  };
  // user favorites the cat img
  handleFavoriteOnClick = () => {
    if (
      this.state.allFavCatsHandlesArray.indexOf(this.state.catHandle) === -1
    ) {
      const catToFavorite = {
        handle: this.state.catHandle,
        imageUrl: this.state.catUrl
      };
      console.log(catToFavorite);
      HandleUserFavorite(this.props.allFavCatsArray, catToFavorite);
    }
  };
  // user rating input change
  handleOnChange = e => {
    this.setState({
      catRating: e.target.value
    });
  };

  render() {
    return (
      <section className="chonder">
        <div className="wrapper flexContainer">
          {this.state.catUrl && (
            <DisplaySingleChonk catUrl={this.state.catUrl} />
          )}
          <div className="userInput">
            <div className="chonkScaleImageContainer">
              <img className="chonkScale" src={scale} alt="chonk scale" />
            </div>
            <input
              className="ratingSlider"
              type="range"
              name="rating"
              min="0"
              max="100"
              onChange={this.handleOnChange}
              value={this.state.catRating}
            />
          </div>
          <div className="userControls">
            <button onClick={this.handleFavoriteOnClick}>
              {this.state.allFavCatsHandlesArray.indexOf(
                this.state.catHandle
              ) === -1
                ? "Favorite"
                : "Un-Favorite"}
            </button>
            <button onClick={this.handleSkipOnClick}>Skip</button>
            <button onClick={this.handleSubmitOnClick}>Submit</button>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  allCatsArray: state.data.chonks,
  allFavCatsArray: state.data.favChonks,
  userId: state.user.credentials.userId
});

export default connect(mapStateToProps)(chonder);
