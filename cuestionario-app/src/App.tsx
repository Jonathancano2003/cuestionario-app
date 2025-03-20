import React from "react";
import CuestionarioComponent from "./components/Cuestionario";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import logo from "./assets/banner.jpg"; // Asegúrate de que la ruta sea correcta

const App: React.FC = () => {
  return (
    <div>
      <h1>Aplicación de Cuestionario</h1>
      <img src={logo} alt="Logo de la Aplicación" className="img-fluid" /> {/* Clase de Bootstrap para hacer la imagen responsiva */}
      <CuestionarioComponent />
    </div>
  );
};

export default App;
