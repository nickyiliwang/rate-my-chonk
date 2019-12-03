import firebase from "../util/config";
import "firebase/auth";
import "firebase/storage";

// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.
export const HandleUserFavorite = (allUserFavCatsArr, favCatObj) => {
  const userId = firebase.auth().currentUser.uid;
  const db = firebase.database().ref(`user/${userId}/userFavorites`);
  console.log('fav' , favCatObj)
  db.update([favCatObj])
  // const catObjForMultiUpdate = {};

  // if (allUploads) {
  //   // public route contains all uploaded pictures
  //   catObjForMultiUpdate[`allCats/${catHandle}`] = {
  //     catImgUrl: url
  //   };
  //   // get a list of all the user uploaded images and add the new img url to it
  //   catObjForMultiUpdate[`users/${userId}/userUploads`] = [...allUploads, url];
  //   db.update(catObjForMultiUpdate).catch(error => {
  //     console.error(
  //       "There was an error uploading a file to Cloud Storage:",
  //       error
  //     );
  //   });
  // } else {
  //   // public route contains all uploaded pictures
  //   catObjForMultiUpdate[`allCats/${catHandle}`] = {
  //     catImgUrl: url
  //   };
  //   catObjForMultiUpdate[`users/${userId}/userUploads`] = [url];
  //   db.update(catObjForMultiUpdate).catch(error => {
  //     console.error(
  //       "There was an error uploading a file to Cloud Storage:",
  //       error
  //     );
  //   });
  // }
};
