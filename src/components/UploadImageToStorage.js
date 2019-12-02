import firebase from "../util/config";
import "firebase/auth";
import "firebase/storage";

// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.
export const UploadImageToStorage = async (file, allUploads) => {
  const userId = firebase.auth().currentUser.uid;
  const db = firebase.database().ref();
  const catObjForMultiUpdate = {};

  // Upload the image to Cloud Storage.
  let filePath = userId + "/" + file.name;
  const fileSnapshot = await firebase
    .storage()
    .ref(filePath)
    .put(file);
  const url = await fileSnapshot.ref.getDownloadURL();

  // set the key as the filename
  const catHandle = fileSnapshot.metadata.name.split(".").join("");
  // Update the user data with the image's URL.
  if (allUploads) {
    // public route contains all uploaded pictures
    catObjForMultiUpdate[`allCats/${catHandle}`] = {
      catImgUrl: url
    };
    // get a list of all the user uploaded images and add the new img url to it
    catObjForMultiUpdate[`users/${userId}/userUploads`] = [...allUploads, url];
    db.update(catObjForMultiUpdate).catch(error => {
      console.error(
        "There was an error uploading a file to Cloud Storage:",
        error
      );
    });
  } else {
    // public route contains all uploaded pictures
    catObjForMultiUpdate[`allCats/${catHandle}`] = {
      catImgUrl: url
    };
    catObjForMultiUpdate[`users/${userId}/userUploads`] = [url];
    db.update(catObjForMultiUpdate).catch(error => {
      console.error(
        "There was an error uploading a file to Cloud Storage:",
        error
      );
    });
  }
};
