import React from "react";

export default function DisplaySingleChonk() {
  return (
    <div className="catImageContainer">
      <img src={catArray[this.props.count]} alt="cat" />
    </div>
  );
}
