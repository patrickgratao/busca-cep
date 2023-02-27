import React, { useState } from "react";
import "./styles.css";

const Input = () => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [value, setValue] = useState("");

  console.log("value => ", value);
  return (
      <div className="customForm">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Type a CEP..."
        />
        <button>Go</button>
    </div>
  );
};

export default Input;
