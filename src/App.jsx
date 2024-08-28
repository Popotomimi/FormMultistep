// Axios
import axios from "axios";

// Components
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
import UserForm from "./components/UserForm";
import ReviewForm from "./components/ReviewForm";
import Thanks from "./components/Thanks";
import Steps from "./components/Steps";

// Hooks
import { useForm } from "./hooks/useForm";
import { useState } from "react";

// CSS
import "./App.css";

const formTemplate = {
  name: "",
  email: "",
  review: "",
  comment: "",
};

function App() {
  const [data, setData] = useState(formTemplate);
  const [message, setMessage] = useState(false);

  const handleSubmit = async () => {
    handleMessage();
    try {
      await axios.post("http://localhost:8800/users", data);
    } catch (error) {
      handleMessageTwo();
      console.log(error.message);
    }
  };

  const handleMessage = () => {
    setMessage(true);
    setTimeout(() => {
      setMessage(false);
    }, 3000);
  };

  const updateFieldHandler = (key, value) => {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const formComponents = [
    <UserForm data={data} updateFieldHandler={updateFieldHandler} />,
    <ReviewForm data={data} updateFieldHandler={updateFieldHandler} />,
    <Thanks data={data} />,
  ];

  const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } =
    useForm(formComponents);

  return (
    <div className="app">
      <div className="header">
        <h2>Deixe sua avaliação</h2>
        <p>
          Ficamos felizes com a sua compra, utilize o formulário abaixo para
          avaliar o produto!
        </p>
      </div>
      {message && (
        <div className="message">
          <p>E-mail enviado com sucesso, verifique sua caixa de e-mail!</p>
        </div>
      )}
      <div className="form-container">
        <Steps currentStep={currentStep} />
        <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
          <div className="inputs-container">{currentComponent}</div>
          <div className="actions">
            {!isFirstStep && (
              <button type="button" onClick={() => changeStep(currentStep - 1)}>
                <GrFormPrevious />
                <span>Voltar</span>
              </button>
            )}
            {!isLastStep ? (
              <button type="submit">
                <span>Avançar</span>
                <GrFormNext />
              </button>
            ) : (
              <button onClick={handleSubmit} type="button">
                <span>Enviar</span>
                <FiSend />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
