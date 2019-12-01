import React, { Component } from "react";
// components
import ImagesOfChonks from "../components/ImagesOfChonks";
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
    catCount: 0,
    maxCats: null,
    catRating: 0,
    favorite: false
  };

  componentDidMount() {
    const catHandle = this.props.catHandlesArray[this.state.catCount];
    db.ref("cats/" + catHandle).on("value", snapshot => {
      const data = snapshot.val();
      if (data) {
        this.setState({
          catRatingsArr: data.catArrForAverage
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.catCount !== this.state.catCount) {
      const catHandle = this.props.catHandlesArray[this.state.catCount];
      db.ref("cats/" + catHandle).once("value", snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState({
            catRatingsArr: data.catArrForAverage
          });
          console.log(data.catArrForAverage);
        }
      });
    }
  }

  incrementImgCounter = () => {
    if (this.state.catCount < 3) {
      this.setState({
        catCount: this.state.catCount + 1
      });
    } else {
      this.setState({
        catCount: 0
      });
    }
  };

  handleSkipOnClick = () => {
    this.incrementImgCounter();
    this.setState({ catRating: 0 });
  };

  updateCatData = (catId, ratingArr) => {
    db.ref("cats/" + catId).set({
      catArrForAverage: ratingArr
    });
  };

  handleSubmitOnClick = () => {
    const newCatArrForAverage = [
      ...this.state.catRatingsArr,
      this.state.catRating
    ];
    this.setState({
      catRatingsArr: newCatArrForAverage
    });

    const catHandle = this.props.catHandlesArray[this.state.catCount];
    console.log(catHandle);
    this.updateCatData(catHandle, newCatArrForAverage);
    this.incrementImgCounter();

    this.setState({ catRating: 0, catRatingsArr: [] });
  };

  handleFavoriteOnClick = () => {
    const currentCatIndex = this.state.catCount;
    const catToFavorite = this.props.catHandlesArray[currentCatIndex];
    console.log(`Favorite ${catToFavorite}`);
  };

  handleOnChange = e => {
    this.setState({
      catRating: e.target.value
    });
  };

  render() {
    return (
      <section className="chonder">
        <h2>Chonder</h2>
        <ImagesOfChonks count={this.state.catCount} />
        <p>{`at ${this.props.catHandlesArray[this.state.catCount]} `}</p>

        <div className="userControls">
          <button onClick={this.handleFavoriteOnClick}>
            {this.state.favorite ? "Un-Favorite" : "Favorite"}
          </button>
          <button onClick={this.handleSkipOnClick}>Skip</button>
          <button onClick={this.handleSubmitOnClick}>Submit</button>
        </div>
        <img src={scale} alt="chonk scale" />
        <input
          className="ratingSlider"
          type="range"
          name="rating"
          min="0"
          max="100"
          onChange={this.handleOnChange}
          value={this.state.catRating}
        />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  catHandlesArray: state.data.chonks
});

export default connect(mapStateToProps, { favoriteACat })(chonder);
