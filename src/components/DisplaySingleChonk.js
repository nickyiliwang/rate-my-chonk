import React from "react";
import ExpansionPanel from "./ExpansionPanel";

export default function DisplaySingleChonk({
  catUrl,
  handleNewGetCatsFromReddit
}) {
  return (
    <div>
      <div className="chonderCatImageContainer">
        <img src={catUrl} alt="cute chubby cat that will melt your heart" />
      </div>
      <ExpansionPanel handleNewGetCatsFromReddit={handleNewGetCatsFromReddit} />
    </div>
  );
}
