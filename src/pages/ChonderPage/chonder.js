import React, { Component } from "react";
// toasts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// components
import DisplaySingleChonk from "../components/DisplaySingleChonk";
import { HandleUserFavorite } from "../../components/HandleUserFavorites";
// chonk scale image
// mui
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button/Button";
import { Tooltip } from "@material-ui/core";
// firebase
import "firebase/database";
import firebase from "../../util/config";
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
    timeQuery: "all",
    isFavorite: false,
    catRatingsForBtn: [
      {
        name: "A Fine Boi",
        rating: 20
      },
      {
        name: "He Chomnk",
        rating: 35
      },
      {
        name: "A Heckin' Chonker",
        rating: 50
      },
      {
        name: "HEFTYCHONK",
        rating: 65
      },
      {
        name: "MEGACHONKER",
        rating: 80
      },
      {
        name: "OH LAWD HE COMIN",
        rating: 100
      }
    ]
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
    toast.success(`You voted ${this.state.catRating}`);
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
    const { catHandle, catUrl, allFavCats, isFavorite } = this.state;
    if (allFavCats.indexOf(catHandle) === -1 && isFavorite === false) {
      const catToFavorite = {
        handle: catHandle,
        imageUrl: catUrl
      };
      HandleUserFavorite(allFavCats, catToFavorite);
      toast.success("Cute Chonk Favored !");
      this.setState({ isFavorite: true });
    } else {
      this.setState({ isFavorite: true });
      toast.error("Chonk Already Favored !");
    }
  };
  // user rating input change
  handleOnChange = val => {
    console.log(val);
    // this.setState({
    //   catRating: val
    // });
  };

  render() {
    return (
      <section className="chonder">
        <div className="wrapper flexContainer">
          <GetImgFromReddit timeQuery={this.state.timeQuery} />
          {this.state.catUrl && (
            <div className="display-single-chonk">
              <DisplaySingleChonk
                handleNewGetCatsFromReddit={this.handleNewGetCatsFromReddit}
                handleFavoriteOnClick={this.handleFavoriteOnClick}
                handleSkipOnClick={this.handleSkipOnClick}
                isFavorite={this.state.isFavorite}
                catUrl={this.state.catUrl}
              />
            </div>
          )}
          <div className="userInput">
            {this.state.catRatingsForBtn.map((num, index) => {
              return (
                <Tooltip key={index} title={`Top r/Chonks from this ${num}`}>
                  <Button>
                    <Typography>{num}</Typography>
                  </Button>
                </Tooltip>
              );
            })}
          </div>
          <div className="userControls">
            <ToastContainer
              hideProgressBar
              pauseOnHover={false}
              position="top-center"
              autoClose={1500}
            />
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
