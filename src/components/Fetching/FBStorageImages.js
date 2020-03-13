// firebase
import firebase from "../../util/config";
import "firebase/database";
// redux
import { connect } from "react-redux";
import { addCatsToStore } from "../../Redux/data/dataActions";

const db = firebase.database().ref("allCats");

function GetImgFromStorage({ addCatsToStore }) {
  let catsFromStorage = [];
  db.once("value", async snapshot => {
    const data = await snapshot.val();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        catsFromStorage = [
          ...catsFromStorage,
          {
            id: key,
            url: data[key].catImgUrl
          }
        ];
      }
    }

    addCatsToStore(catsFromStorage);
  });
  return null;
}

export default connect(null, { addCatsToStore })(GetImgFromStorage);
