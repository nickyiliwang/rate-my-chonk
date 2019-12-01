import React, { Component, Fragment } from "react";
import axios from "axios";

export default class GetImgFromReddit extends Component {
  state = {
    posts: [],
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
              posts: [
                ...this.state.posts,
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

  savePostsToState = () => {
    console.log("updated redux state with cats");
  };

  render() {
    return (
      <Fragment>
        {this.state.sendToRedux ? this.savePostsToState() : null}
      </Fragment>
    );
  }
}
