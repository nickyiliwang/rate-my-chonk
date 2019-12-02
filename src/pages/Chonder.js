import React, { Component } from "react";
// components
import DisplaySingleChonk from "../components/DisplaySingleChonk";
// chonk scale image
import scale from "../assets/scale.jpg";
// firebase
import "firebase/database";
import firebase from "../util/config";
// redux
import { connect } from "react-redux";
import { favoriteACat } from "../Redux/actions/userActions";
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
    favorite: false
  };

  componentDidMount() {
    const { allCatsArray } = this.props;
    const { catCount } = this.state;
    this.setState(
      {
        maxCats: allCatsArray.length,
        catHandle: allCatsArray[catCount].id,
        catUrl: allCatsArray[catCount].url
      },
      () => {
        const { catHandle } = this.state;
        db.ref("cats/" + catHandle).on("value", snapshot => {
          const data = snapshot.val();
          if (data) {
            this.setState({
              catRatingsArr: data.catArrForAverage
            });
          }
        });
      }
    );
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

    if (catCount < maxCats) {
      this.setState({
        catCount: catCount + 1,
        catHandle: allCatsArray[catCount].id,
        catUrl: allCatsArray[catCount].url
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
    const currentCatIndex = this.state.catCount;
    const catToFavorite = this.props.allCatsArray[currentCatIndex];
    console.log(catToFavorite);
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
        {this.state.catUrl && <DisplaySingleChonk catUrl={this.state.catUrl} />}
        <div className="userControls">
          <button onClick={this.handleFavoriteOnClick}>
            {this.state.favorite ? "Un-Favorite" : "Favorite"}
          </button>
          <button onClick={this.handleSkipOnClick}>Skip</button>
          <button onClick={this.handleSubmitOnClick}>Submit</button>
        </div>
        <div className="userInput">
          <img className="chonkScale" src={scale} alt="chonk scale" />
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
      </section>
    );
  }
}

const mapStateToProps = state => ({
  allCatsArray: state.data.chonks
});

export default connect(mapStateToProps, { favoriteACat })(chonder);
