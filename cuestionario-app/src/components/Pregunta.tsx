import React from "react";

interface PreguntaProps {
  id: string;
  tipo: "text" | "number" | "select";
  pregunta: string;
  opciones?: string[];
  respuesta: string;
  onChange: (id: string, value: string) => void;
}

const Pregunta: React.FC<PreguntaProps> = ({ id, tipo, pregunta, opciones, respuesta, onChange }) => {
  return (
    <div className="mb-3">
      <label className="form-label">{pregunta}</label>
      {tipo === "select" ? (
        <select className="form-select" value={respuesta} onChange={(e) => onChange(id, e.target.value)}>
          <option value="">Selecciona una opción</option>
          {opciones?.map((opcion, index) => (
            <option key={index} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={tipo}
          className="form-control"
          value={respuesta}
          onChange={(e) => onChange(id, e.target.value)}
        />
      )}
    </div>
  );
};

export default Pregunta;
