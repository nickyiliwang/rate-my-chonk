import { connect } from "react-redux";
import { addCatsToStore } from "../Redux/actions/dataActions";
// firebase
import firebase from "../util/config";
import "firebase/database";

const db = firebase.database().ref("allCats");

function GetImgFromStorage(props) {
  db.once("value", snapshot => {
    const data = snapshot.val();
    let catsFromStorage = [];
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
    props.addCatsToStore(catsFromStorage);
  });
  return null;
}

export default connect(null, { addCatsToStore })(GetImgFromStorage);
