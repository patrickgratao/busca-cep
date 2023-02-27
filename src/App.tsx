import React, { useState } from "react";
import Form from "./components/Form";
import "./globalStyles/App.css";

interface ResultProps {
  cep?: string;
  logradouro?: string;
  complemento?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;

  erro?: boolean;
}

const App = () => {
  const [result, setResult] = useState<ResultProps>();
  const handleRenderResult = (param) => {
    setResult(param);
  };

  const ErrorComponent = () => {
    if (!result?.erro) return;
    return (
      <div className="errorContainer">
        <span>Something went wrong, try again.</span>
      </div>
    );
  };

  const DataComponent = () => {
    if (!result?.cep) return;

    return (
      <div className="dataContainer">
        <div className="item">
          <span>CEP: </span>
          <strong>{result?.cep}</strong>
        </div>

        <div className="item">
          <span>Logradouro: </span>
          <strong>{result?.logradouro}</strong>
        </div>

        <div className="item">
          <span>Bairro: </span>
          <strong>{result?.bairro}</strong>
        </div>

        <div className="item">
          <span>Localidade: </span>
          <strong>{result?.localidade}</strong>
        </div>

        <div className="item">
          <span>UF: </span>
          <strong>{result?.uf}</strong>
        </div>

        <div className="item">
          <span>IBGE: </span>
          <strong>{result?.ibge}</strong>
        </div>

        <div className="item">
          <span>DDD: </span>
          <strong>{result?.ddd}</strong>
        </div>

        <div className="item">
          <span>Siafi: </span>
          <strong>{result?.siafi}</strong>
        </div>
      </div>
    );
  };

  return (
    <div className="appContainer">
      <Form handleRenderResult={handleRenderResult} />

      <div className="resultContainer">
        <ErrorComponent />
        <DataComponent />
      </div>
    </div>
  );
};

export default App;
