export const guardarRespuestas = (respuestas: { [key: string]: string }) => {
    localStorage.setItem("respuestasCuestionario", JSON.stringify(respuestas));
  };
  
  export const cargarRespuestas = (): { [key: string]: string } => {
    const data = localStorage.getItem("respuestasCuestionario");
    return data ? JSON.parse(data) : {};
  };
  