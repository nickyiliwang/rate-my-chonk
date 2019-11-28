import React, { Component } from "react";
import { connect } from "react-redux";
import { increment } from "../Redux/actions/dataActions";

export class Increment extends Component {
  render() {
    return (
      <div>
        <h2>the count is {this.props.count}</h2>
        <button onClick={() => this.props.increment()}>Click here to increment</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  count: state.data.count
});

export default connect(mapStateToProps, { increment })(Increment);
