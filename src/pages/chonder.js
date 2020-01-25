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
import GetImgFromReddit from "../components/GetImgFromReddit";
// firebase database
const db = firebase.database();

class chonder extends Component {
  state = {
    catHandle: "",
    catUrl: "",
    maxCats: null,
    catCount: 0,
    catRating: 0,
    catRatings: [],
    allFavCats: [],
    timeQuery: "all"
  };

  componentDidMount() {
    const { allCatsArray, allFavCats } = this.props;
    const { catCount } = this.state;
    if (allCatsArray[0]) {
      this.setState(
        {
          maxCats: allCatsArray.length,
          catHandle: allCatsArray[catCount].id,
          catUrl: allCatsArray[catCount].url
        },
        () => {
          db.ref("cats/" + this.state.catHandle).once("value", snapshot => {
            const data = snapshot.val();
            if (data) {
              this.setState({
                catRatings: data.catArrForAverage
              });
            }
          });
          db.ref("users/" + this.props.userId).once("value", snapshot => {
            const data = snapshot.val();
            if (data) {
              this.setState({
                allFavCats: [...data.userFavorites]
              });
            }
          });
        }
      );
    }

    if (allFavCats[0]) {
      allFavCats.forEach(cat => {
        this.setState({
          allFavCats: [...this.state.allFavCats, cat]
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
            catRatings: data.catArrForAverage
          });
        }
      });
    }

    if (prevProps.allCatsArray !== this.props.allCatsArray) {
      if (this.props.allCatsArray[0]) {
        this.setState({
          catCount: 0,
          catHandle: this.props.allCatsArray[0].id,
          catUrl: this.props.allCatsArray[0].url
        });
      }
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

  handleNewGetCatsFromReddit = time => {
    this.setState({
      timeQuery: time
    });
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
    const { catHandle, catRatings, catRating, catUrl } = this.state;
    // get current cat array numbers from db, set state for later use
    const newCatArrForAverage = [...catRatings, catRating];
    this.setState({
      catRatings: newCatArrForAverage
    });

    this.updateCatData(catHandle, newCatArrForAverage, catUrl);
    this.incrementImgCounter();
    // reset for next vote
    this.setState({ catRating: 0 });
  };
  // user favorites the cat img
  handleFavoriteOnClick = () => {
    const { catHandle, catUrl, allFavCats } = this.state;
    if (allFavCats.indexOf(catHandle) === -1) {
      const catToFavorite = {
        handle: catHandle,
        imageUrl: catUrl
      };
      HandleUserFavorite(allFavCats, catToFavorite);
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
          <GetImgFromReddit timeQuery={this.state.timeQuery} />
          {this.state.catUrl && (
            <DisplaySingleChonk
              handleNewGetCatsFromReddit={this.handleNewGetCatsFromReddit}
              catUrl={this.state.catUrl}
            />
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
              {this.state.allFavCats.indexOf(this.state.catHandle) === -1
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
  allFavCats: state.data.favChonks,
  userId: state.user.credentials.userId
});

export default connect(mapStateToProps)(chonder);
