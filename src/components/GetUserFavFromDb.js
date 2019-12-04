import React from 'react'
import { connect } from "react-redux";
import { addUserFav } from "../Redux/actions/dataActions";
// firebase
import firebase from "../util/config";
import "firebase/auth";
import "firebase/database";

const renderFavoriteCats = favCatsArr => {
  if (favCatsArr) {
    return favCatsArr.map(cat => {
      const url = cat.imgUrl;
      return (
        <li className="userFavoriteImages" key={url}>
          <img src={url} alt="user favortie chonks" />
        </li>
      );
    });
  } else {
    return (
      <li>
        <p>All your favorite chonks are here.</p>
      </li>
    );
  }
};

const GetUserFavFromDb = props => {
  const db = firebase.database();
  const { userId } = props;
  let data = null;
  db.ref(`users/${userId}/userFavorites`).once("value", snapshot => {
    data = snapshot.val();
    props.addUserFav(data);
  });

  return renderFavoriteCats(data);
};

const mapStateToProps = state => ({
  userId: state.user.credentials.userId
});

export default connect(mapStateToProps, { addUserFav })(GetUserFavFromDb);
