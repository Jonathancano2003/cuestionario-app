import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Pregunta from "./Pregunta";
import Resumen from "./Resumen";
import { cargarRespuestas, guardarRespuestas } from "../utils/localStorage";
import "../i18n";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

interface PreguntaType {
  id: string;
  tipo: "text" | "number" | "select" | "check" | "textarea";
  pregunta: string;
  opciones?: string[];
  restricciones?: {
    min?: number;
    max?: number;
  };
  validacion?: {
    formato?: "email";
    dominio?: string;
    min_edad?: number;
    max_seleccionados?: number;
  };
}

interface Cuestionario {
  titulo: string;
  preguntas: PreguntaType[];
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
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data: Cuestionario[] = await response.json();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const preguntas = cuestionarios[indiceActual].preguntas;

    for (const pregunta of preguntas) {
      const valor = respuestas[pregunta.id];

      if (!valor || (Array.isArray(valor) && valor.length === 0)) {
        alert(`La pregunta "${pregunta.pregunta}" es obligatoria.`);
        return;
      }

      if (typeof valor === "string" && pregunta.restricciones) {
        const { min, max } = pregunta.restricciones;
        if (min && valor.length < min) {
          alert(`La respuesta de "${pregunta.pregunta}" debe tener al menos ${min} caracteres.`);
          return;
        }
        if (max && valor.length > max) {
          alert(`La respuesta de "${pregunta.pregunta}" debe tener como máximo ${max} caracteres.`);
          return;
        }
      }

      if (pregunta.validacion?.formato === "email" && typeof valor === "string") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(valor)) {
          alert(`"${pregunta.pregunta}" debe ser un correo válido.`);
          return;
        }
        if (pregunta.validacion.dominio && !valor.endsWith(`@${pregunta.validacion.dominio}`)) {
          alert(`"${pregunta.pregunta}" debe pertenecer al dominio @${pregunta.validacion.dominio}`);
          return;
        }
      }

      if (pregunta.validacion?.max_seleccionados && Array.isArray(valor)) {
        if (valor.length > pregunta.validacion.max_seleccionados) {
          alert(`Solo puedes seleccionar hasta ${pregunta.validacion.max_seleccionados} opciones en "${pregunta.pregunta}".`);
          return;
        }
      }

      if (pregunta.validacion?.min_edad && typeof valor === "string") {
        const fecha = new Date(valor);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fecha.getFullYear();
        const m = hoy.getMonth() - fecha.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) {
          edad--;
        }
        if (edad < pregunta.validacion.min_edad) {
          alert(`Debes tener al menos ${pregunta.validacion.min_edad} años.`);
          return;
        }
      }
    }

    if (indiceActual < cuestionarios.length - 1) {
      setIndiceActual(indiceActual + 1);
    } else {
      setFinalizado(true);
    }
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
            <form onSubmit={handleSubmit}>
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
