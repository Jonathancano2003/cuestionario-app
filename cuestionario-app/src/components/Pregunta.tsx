import React from "react";

interface PreguntaProps {
  id: string;
  tipo: "text" | "number" | "select" | "check" | "textarea";
  pregunta: string;
  opciones?: string[];
  respuesta: string | string[];
  onChange: (id: string, value: string | string[]) => void;
}

const Pregunta: React.FC<PreguntaProps> = ({ id, tipo, pregunta, opciones, respuesta, onChange }) => {
  return (
    <div className="mb-3">
      <label className="form-label">{pregunta}</label>
      
      {tipo === "select" ? (
        <select className="form-select" value={respuesta as string} onChange={(e) => onChange(id, e.target.value)}>
          <option value="">Selecciona una opción</option>
          {opciones?.map((opcion, index) => (
            <option key={index} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      ) : tipo === "textarea" ? (
        <textarea
          className="form-control"
          value={respuesta as string}
          onChange={(e) => onChange(id, e.target.value)}
        />
      ) : tipo === "check" ? (
        <div>
          {opciones?.map((opcion, index) => (
            <div key={index} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`${id}-${index}`}
                checked={Array.isArray(respuesta) && respuesta.includes(opcion)}
                onChange={(e) => {
                  const newValue = e.target.checked
                    ? [...(respuesta as string[]), opcion]
                    : (respuesta as string[]).filter((item) => item !== opcion);
                  onChange(id, newValue);
                }}
              />
              <label className="form-check-label" htmlFor={`${id}-${index}`}>
                {opcion}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <input
          type={tipo}
          className="form-control"
          value={respuesta as string}
          onChange={(e) => onChange(id, tipo === "number" ? e.target.value.replace(/\D/g, "") : e.target.value)}
        />
      )}
    </div>
  );
};

export default Pregunta;
