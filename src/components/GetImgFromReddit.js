import React, { Component } from "react";
import axios from "axios";

export default class GetImgFromReddit extends Component {
  state = {
    posts: [],
    render: false
  };

  componentDidMount() {
    axios
      .get("https://old.reddit.com/r/Chonkers/top.json?sort=top&t=all&limit=5")
      .then(res => {
        console.log(res);
        res.data.data.children.forEach(post => {
          const { name, score, id, url } = post.data;

          this.setState({
            posts: [
              ...this.state.posts,
              {
                name,
                score,
                id,
                url
              }
            ]
          });
          this.setState({ render: true });
        });
      });
  }

  renderImages = () => {
    return this.state.posts.map(post => {
      return <img key={post.id} src={post.url} alt="" />;
    });
  };

  render() {
    return (
      <div className="wrapper">
        {this.state.render ? this.renderImages() : "Loading"}
      </div>
    );
  }
}