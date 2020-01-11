// this page will route to and display a single chonks full image
import React from "react";
import { useParams } from "react-router-dom";

export default function chonkProfile() {
  let { id } = useParams();

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}
