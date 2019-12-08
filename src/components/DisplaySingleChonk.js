import React from "react";
import SimpleExpansionPanel from "./ExpansionPanel";

export default function DisplaySingleChonk({ catUrl }) {
  return (
    <div className="">
      <div className="chonderCatImageContainer">
        <img src={catUrl} alt="cat" />
      </div>
      <SimpleExpansionPanel />
    </div>
  );
}
