import firebase from "../util/config";
import "firebase/auth";

// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.
export const saveImageMessage = file => {
  console.log(firebase.auth().currentUser);
  //   console.log(file)
  // 1 - We add a message with a loading icon that will get updated with the shared image.
  //   firebase
  //     .ref("user/" + uid)
  //     .update({
  //       name: getUserName(),
  //       imageUrl: LOADING_IMAGE_URL,
  //       profilePicUrl: getProfilePicUrl()
  //     })
  //     .then(function(messageRef) {
  //       // 2 - Upload the image to Cloud Storage.
  //       var filePath =
  //         firebase.auth().currentUser.uid + "/" + messageRef.id + "/" + file.name;
  //       return firebase
  //         .storage()
  //         .ref(filePath)
  //         .put(file)
  //         .then(function(fileSnapshot) {
  //           // 3 - Generate a public URL for the file.
  //           return fileSnapshot.ref.getDownloadURL().then(url => {
  //             // 4 - Update the chat message placeholder with the image's URL.
  //             return messageRef.update({
  //               imageUrl: url,
  //               storageUri: fileSnapshot.metadata.fullPath
  //             });
  //           });
  //         });
  //     })
  //     .catch(function(error) {
  //       console.error(
  //         "There was an error uploading a file to Cloud Storage:",
  //         error
  //       );
  //     });
};
