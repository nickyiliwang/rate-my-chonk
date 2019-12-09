import React from "react";
import ExpansionPanel from "./ExpansionPanel";

export default function DisplaySingleChonk({
  catUrl,
  handleNewGetCatsFromReddit
}) {
  return (
    <div className="">
      <div className="chonderCatImageContainer">
        <img src={catUrl} alt="cat" />
      </div>
      <ExpansionPanel handleNewGetCatsFromReddit={handleNewGetCatsFromReddit} />
    </div>
  );
}
