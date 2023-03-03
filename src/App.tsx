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
  const [result, setResult] = useState<ResultProps>({});

  
  const handleRenderResult = (result: ResultProps) => {
    setResult(result);
    
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    // Mobile devices
    if (isMobile) {
      window.scrollTo({
        left: 0,
        top: document?.body?.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleClearResult = () => {
    setResult({});
  };

  const ErrorResult = () => {
    if (!result?.erro) return;
    return (
      <div className="errorContainer">
        <span>
          Algo deu errado com este número de CEP, por favor, tente novamente.
        </span>
      </div>
    );
  };

  const SuccessResult = () => {
    if (!result?.cep) return <></>;

    const formattedText = `${result?.logradouro}, ${result?.bairro}, ${result?.localidade} - ${result.uf}`;

    return (
      <div className="dataContainer">
        <span>Este produto será entregue em: </span>
        <div className="addressContainer">{formattedText}</div>
      </div>
    );
  };

  return (
    <>
      <div className="productPageContainer">
        <div className="productImageContainer">
          <img
            src="https://images.tcdn.com.br/img/img_prod/769517/t_shirt_nike_essntl_icon_20685_1_ad613c9da7e914cb1d637fa13a4eef28.jpg"
            alt="product"
          />
        </div>

        <div className="productDetailsContainer">
          <h1>Nike T-Shirt</h1>
          <div className="modelId">Modelo: BV6169010</div>
          <div className="description">
            Para arrasar no look desde o sportwear até o mood casual, a melhor
            aposte é nessa tshirt da Nike!
          </div>

          <div className="price">
            <span className="labelPrice">Por:</span>
            <span className="valuePrice">R$ 149,90</span>
          </div>

          <div className="cepContainer">
            <div className="labelCepContainer">Simulador de Entrega</div>
            <Form
              handleRenderResult={handleRenderResult}
              handleClearResult={handleClearResult}
            />
          </div>

          <div className="resultContainer">
            <ErrorResult />
            <SuccessResult />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
