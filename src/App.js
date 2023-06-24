import React from "react";
import Bezier from "./components/Bezier/Bezier";
import "./main.scss";
import ControlButtons from "./components/ControlButtons/ControlButtons";

function App() {
  return (
    <div>
      <Bezier />
      <ControlButtons />
    </div>
  );
}

export default App;
