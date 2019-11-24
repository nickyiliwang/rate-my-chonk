import React from "react";
// import UploadMyChonks from "./components/backend/UploadMyChonks";
import FirebaseAuth from './components/FirebaseAuth/FirebaseAuth'

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Rate My Chonk</h1>
        <FirebaseAuth />
      </header>
    </div>
  );
}

export default App;
