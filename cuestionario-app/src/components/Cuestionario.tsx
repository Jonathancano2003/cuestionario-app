import React, { useState, useEffect } from "react";
import Pregunta from "./Pregunta";
import { cargarRespuestas, guardarRespuestas } from "../utils/localStorage";

interface Pregunta {
  id: string;
  tipo: "text" | "number" | "select";
  pregunta: string;
  opciones?: string[];
}

interface Cuestionario {
  titulo: string;
  preguntas: Pregunta[];
}

const CuestionarioComponent: React.FC = () => {
  const [cuestionarios, setCuestionarios] = useState<Cuestionario[]>([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [respuestas, setRespuestas] = useState<{ [key: string]: string }>(cargarRespuestas());

  useEffect(() => {
    const fetchCuestionarios = async () => {
      try {
        const response = await fetch("/cuestionario.json");

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data: Cuestionario[] = await response.json();
        console.log("JSON cargado:", data);

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("El JSON no contiene cuestionarios.");
        }

        setCuestionarios(data);
      } catch (error) {
        console.error("Error al cargar los cuestionarios:", error);
      }
    };

    fetchCuestionarios();
  }, []);

  const handleRespuestaChange = (id: string, value: string) => {
    const nuevasRespuestas = { ...respuestas, [id]: value };
    setRespuestas(nuevasRespuestas);
    guardarRespuestas(nuevasRespuestas);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Respuestas enviadas:", respuestas);

    if (indiceActual < cuestionarios.length - 1) {
      setIndiceActual(indiceActual + 1); // ✅ Pasa al siguiente cuestionario
    } else {
      alert("¡Has completado todos los cuestionarios!");
    }
  };

  if (cuestionarios.length === 0) return <div>Cargando cuestionario...</div>;

  const cuestionarioActual = cuestionarios[indiceActual];

  return (
    <div>
      <h2>{cuestionarioActual.titulo}</h2>
      <form onSubmit={handleSubmit}>
        {cuestionarioActual.preguntas.map((pregunta) => (
          <Pregunta
            key={pregunta.id}
            id={pregunta.id}
            tipo={pregunta.tipo}
            pregunta={pregunta.pregunta}
            opciones={pregunta.opciones}
            respuesta={respuestas[pregunta.id] || ""}
            onChange={handleRespuestaChange}
          />
        ))}
        <button type="submit">Siguiente</button>
      </form>
    </div>
  );
};

export default CuestionarioComponent;
