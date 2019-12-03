import { connect } from "react-redux";
import { addUserFav } from "../Redux/actions/dataActions";
// firebase
import firebase from "../util/config";
import "firebase/auth";
import "firebase/database";

function GetUserFavFromDb(props) {
  const db = firebase.database().ref("user");
  const userId = props.userId;

  console.log(userId)
  db.ref(`users/${userId}/userFavorites`).once("value", snapshot => {
    const data = snapshot.val();
    console.log(data);
  });

  //   props.addUserFav(catsFromStorage);

  return null;
}
export default connect(null, { addUserFav })(GetUserFavFromDb);
