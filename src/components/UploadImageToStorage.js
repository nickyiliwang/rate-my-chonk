import firebase from "../util/config";
import "firebase/auth";
import "firebase/storage";

// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.
export const UploadImageToStorage = async (file, allUploads) => {
  const userId = firebase.auth().currentUser.uid;
  const userDb = firebase.database().ref(`users/${userId}/userUploads`);
  const db = firebase.database();

  // Upload the image to Cloud Storage.
  let filePath = userId + "/" + file.name;
  const fileSnapshot = await firebase
    .storage()
    .ref(filePath)
    .put(file);
  const url = await fileSnapshot.ref.getDownloadURL();
  // Update the user data with the image's URL.
  const catHandle = fileSnapshot.metadata.name.split(".").join("");

  if (allUploads) {
    userDb.set([...allUploads, url]).catch(error => {
      console.error(
        "There was an error uploading a file to Cloud Storage:",
        error
      );
    });

    db.ref(`cats/${catHandle}`).push({
      catRatingsArr: []
    });
  } else {
    userDb.set([url]).catch(error => {
      console.error(
        "There was an error uploading a file to Cloud Storage:",
        error
      );
    });

    db.ref(`cats/${catHandle}`).push({
      catRatingsArr: []
    });
  }
};
