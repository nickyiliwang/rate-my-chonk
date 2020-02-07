import React from "react";
import ExpansionPanel from "./ExpansionPanel";
// mui icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const DisplaySingleChonk = ({
  catUrl,
  handleNewGetCatsFromReddit,
  handleFavoriteOnClick,
  handleSkipOnClick,
  isFavorite
}) => {
  return (
    <div>
      <div className="chonderCatImageContainer">
        <img src={catUrl} alt="cute chubby cat that will melt your heart" />
        <button className="favorite-button" onClick={handleFavoriteOnClick}>
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </button>
        <button className="skip-button" onClick={handleSkipOnClick}>
          Skip
        </button>
      </div>
      <ExpansionPanel handleNewGetCatsFromReddit={handleNewGetCatsFromReddit} />
    </div>
  );
};

export default DisplaySingleChonk;
