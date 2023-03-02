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
    return setValue(event.target.value);
  };

  const handleEnter = async (event) => {
    if (event.key !== "Enter") return;
    return await handleFetchApi();
  };

  const handleFetchFakeAPI = (error = false) => {
    handleClearResult()
    if (error) {
      setTimeout(() => {
        return handleRenderResult({ erro: true });
      }, 2000);
    }

    const data = {
      cep: "75389-125",
      logradouro: "Rua Lázaro Carvelo Borges",
      bairro: "Setor Cristina II",
      localidade: "Trindade",
      uf: "GO",
      ibge: "5221403",
      ddd: "62",
      siafi: "9625",
    };

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      return handleRenderResult(data);
    }, 2000);
  };

  const handleFetchApi = async () => {
    handleClearResult()
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
        onClick={() => handleFetchFakeAPI(true)}
        // onClick={handleFetchApi}
        disabled={isLoading}
        className={isLoading ? "buttonLoading" : ""}
      >
        {isLoading ? <div className="loader-small"></div> : "Buscar"}
      </button>
    </div>
  );
};

export default Form;
