import React from "react";

export default function DisplaySingleChonk({ catUrl }) {
  return (
    <div className="wrapper">
      <div className="chonderCatImageContainer">
        <img src={catUrl} alt="cat" />
      </div>
    </div>
  );
}
