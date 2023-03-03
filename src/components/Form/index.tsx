import { useState } from "react";
import "./styles.css";

interface FormProps {
  handleRenderResult: Function;
  handleClearResult: Function;
}

const Form = ({ handleRenderResult, handleClearResult }: FormProps) => {
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleChange = (event) => {
    const cepWithMask = event.target.value
      .replace(/\D+/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");

    return setValue(cepWithMask);
  };

  const handleEnter = async (event) => {
    if (event.key !== "Enter") return;
    return await handleFetchApi();
  };

  const handleFetchApi = async () => {

    handleClearResult();
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
        placeholder="Digite um número de CEP"
        onKeyDown={handleEnter}
      />
      <button
        onClick={handleFetchApi}
        disabled={isLoading}
        className={isLoading ? "buttonLoading" : ""}
      >
        {isLoading ? <div className="loader-small"></div> : "Buscar"}
      </button>
    </div>
  );
};

export default Form;
