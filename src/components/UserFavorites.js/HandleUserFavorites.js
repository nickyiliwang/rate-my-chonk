import firebase from "../../util/config";
import "firebase/auth";
import "firebase/storage";

export const HandleUserFavorite = (allUserFavCats, favCat) => {
  const userId = firebase.auth().currentUser.uid;
  const db = firebase.database().ref(`users/${userId}/userFavorites`);
  db.set([...allUserFavCats, favCat]).catch(error => {
    console.error(
      "There was an error uploading a file to Cloud Storage:",
      error
    );
  });
};
