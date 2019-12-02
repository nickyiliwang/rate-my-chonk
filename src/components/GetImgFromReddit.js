import axios from "axios";
import { connect } from "react-redux";
import { addCatsToStore } from "../Redux/actions/dataActions";

function GetImgFromReddit(props) {
  axios
    .get("https://old.reddit.com/r/Chonkers/top.json?sort=top&t=all&limit=20")
    .then(res => {
      res.data.data.children.forEach(post => {
        const { id, url } = post.data;
        let catsFromReddit = [];

        if (url.endsWith(".jpg")) {
          catsFromReddit = [
            ...catsFromReddit,
            {
              id,
              url
            }
          ];
        }
        props.addCatsToStore(catsFromReddit);
      });
    });

  return null;
}

export default connect(null, { addCatsToStore })(GetImgFromReddit);
