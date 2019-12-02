import axios from "axios";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addCatsToStore } from "../Redux/actions/dataActions";

class GetImgFromReddit extends Component {
  state = {
    catsFromReddit: [],
    sendToRedux: false
  };

  componentDidMount() {
    axios
      .get("https://old.reddit.com/r/Chonkers/top.json?sort=top&t=all&limit=10")
      .then(res => {
        res.data.data.children.forEach(post => {
          const { id, url } = post.data;
          if (url.endsWith(".jpg")) {
            this.setState({
              catsFromReddit: [
                ...this.state.catsFromReddit,
                {
                  id,
                  url
                }
              ]
            });
          }
        });
        this.setState({ sendToRedux: true });
      });
  }

  saveCatsFromRedditToState = () => {
    catsFromReddit(this.state.catsFromReddit);
  };

  render() {
    return (
      <Fragment>
        {this.state.sendToRedux ? this.saveCatsFromRedditToState() : null}
      </Fragment>
    );
  }
}

export default connect(null, { addCatsToStore })(GetImgFromReddit);
