import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Pregunta from "./Pregunta";
import Resumen from "./Resumen";
import { cargarRespuestas, guardarRespuestas } from "../utils/localStorage";
import "../i18n"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css"; 

interface Pregunta {
  id: string;
  tipo: "text" | "number" | "select" | "check" | "textarea";
  pregunta: string;
  opciones?: string[];
}

interface Cuestionario {
  titulo: string;
  preguntas: Pregunta[];
}

const CuestionarioComponent: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [cuestionarios, setCuestionarios] = useState<Cuestionario[]>([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [respuestas, setRespuestas] = useState<{ [key: string]: string | string[] }>(cargarRespuestas());
  const [finalizado, setFinalizado] = useState(false);
  const [idioma, setIdioma] = useState(i18n.language === "en");

  useEffect(() => {
    const fetchCuestionarios = async () => {
      try {
        const archivo = idioma ? "/cuestionario_en.json" : "/cuestionario.json";
        const response = await fetch(archivo);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data: Cuestionario[] = await response.json(); // ✅ Asegurar el tipo
        setCuestionarios(data);
      } catch (error) {
        console.error("Error al cargar los cuestionarios:", error);
      }
    };

    fetchCuestionarios();
  }, [idioma]);

  const toggleIdioma = () => {
    const nuevoIdioma = idioma ? "es" : "en";
    setIdioma(!idioma);
    i18n.changeLanguage(nuevoIdioma);
  };

  if (cuestionarios.length === 0 || !cuestionarios[indiceActual]) {
    return <div className="text-center mt-5">{t("loading")}</div>;
  }

  return (
    <div className="cuestionario-container">
      <div className="language-toggle">
        <label className="switch">
          <input type="checkbox" className="toggle" checked={idioma} onChange={toggleIdioma} />
          <span className="slider"></span>
        </label>
      </div>

      <div className="cuestionario-card">
        {finalizado ? (
          <Resumen respuestas={respuestas} />
        ) : (
          <>
            <h2>{cuestionarios[indiceActual].titulo}</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (indiceActual < cuestionarios.length - 1) {
                setIndiceActual(indiceActual + 1);
              } else {
                setFinalizado(true);
              }
            }}>
              {cuestionarios[indiceActual].preguntas.map((pregunta) => (
                <Pregunta
                  key={pregunta.id}
                  id={pregunta.id}
                  tipo={pregunta.tipo}
                  pregunta={pregunta.pregunta}
                  opciones={pregunta.opciones}
                  respuesta={respuestas[pregunta.id] || ""}
                  onChange={(id, value) => {
                    const nuevasRespuestas = { ...respuestas, [id]: value };
                    setRespuestas(nuevasRespuestas);
                    guardarRespuestas(nuevasRespuestas);
                  }}
                />
              ))}
              <button type="submit" className="btn btn-custom mt-3">
                {indiceActual < cuestionarios.length - 1 ? t("next") : t("finish")}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CuestionarioComponent;
