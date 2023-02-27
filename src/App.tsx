import React from "react";
import Input from "./components/Input";
import "./globalStyles/App.css";

const App = () => {
  return (
    <div className="appContainer">
      <Input />

      <div className="resultContainer">Result</div>
    </div>
  );
};

export default App;
