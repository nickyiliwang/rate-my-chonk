import axios from "axios";
import { connect } from "react-redux";
import { addCatsToStore, removeAllCats } from "../Redux/actions/dataActions";

function GetImgFromReddit(props) {
  let catsFromReddit = [];
  const { timeQuery } = props;

  axios
    .get(
      `https://old.reddit.com/r/Chonkers/top.json?sort=top&t=${timeQuery}&limit=30`
    )
    .then(res => {
      res.data.data.children.forEach(post => {
        const { id, url } = post.data;

        if (url.endsWith(".jpg")) {
          catsFromReddit = [
            ...catsFromReddit,
            {
              id,
              url
            }
          ];
        }
      });
    })
    .then(() => {
      props.removeAllCats();
      props.addCatsToStore(catsFromReddit);
    })
    .catch(err => console.error("cannot get from reddit", err));

  return null;
}

export default connect(null, { addCatsToStore, removeAllCats })(
  GetImgFromReddit
);
