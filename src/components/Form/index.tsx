import React, { useState } from "react";
import "./styles.css";

interface FormProps {
  handleRenderResult: Function;
}

const Form = ({ handleRenderResult }: FormProps) => {
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleChange = (event) => {
    return setValue(event.target.value);
  };

  const handleEnter = async (event) => {
    if (event.key !== "Enter") return;
    return await handleFetchApi();
  };

  const handleFetchApi = async () => {
    const url = `https://viacep.com.br/ws/${value}/json/`;

    try {
      setLoading(true);

      const result = await fetch(url).then((response) => response.json());

      if (result) {
        handleRenderResult(result);
      }

      setLoading(false);
    } catch (error) {
      handleRenderResult({ erro: true });
      setLoading(false);
    }
  };

  return (
    <div className="customForm">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Type a CEP..."
        onKeyDown={handleEnter}
      />
      <button
        onClick={handleFetchApi}
        disabled={isLoading}
        className={isLoading ? "buttonLoading" : ""}
      >
        {isLoading ? "Loading" : "Go"}
      </button>
    </div>
  );
};

export default Form;
