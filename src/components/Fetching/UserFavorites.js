import { connect } from "react-redux";
import { addUserFav } from "../../Redux/actions/dataActions";
// firebase
import firebase from "../../util/config";
import "firebase/database";
import "firebase/auth";
// instead of using redux for auth, we just need firebase/auth

const GetUserFavFromDb = props => {
  const db = firebase.database();
  const { userId } = props;
  let data = null;
  db.ref(`users/${userId}/userFavorites`).once("value", snapshot => {
    const dataFromFirebase = snapshot.val();
    if (dataFromFirebase) {
      data = dataFromFirebase;
      props.addUserFav(data);
    }
  });
  return null;
};

const mapStateToProps = state => ({
  userId: state.user.credentials.userId
});

export default connect(mapStateToProps, { addUserFav })(GetUserFavFromDb);
