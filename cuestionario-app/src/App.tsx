import React from "react";
import CuestionarioComponent from "./components/Cuestionario";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const App: React.FC = () => {
  return (
    <div>
      <h1>Aplicación de Cuestionario</h1>
      <CuestionarioComponent />
    </div>
  );
};

export default App;
