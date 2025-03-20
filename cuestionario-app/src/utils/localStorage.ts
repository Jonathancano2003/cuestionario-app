export const guardarRespuestas = (respuestas: { [key: string]: string | string[] }) => {
 
  const respuestasTransformadas: { [key: string]: string } = {};
  Object.keys(respuestas).forEach((key) => {
    respuestasTransformadas[key] = Array.isArray(respuestas[key])
      ? JSON.stringify(respuestas[key]) 
      : (respuestas[key] as string);
  });

  localStorage.setItem("respuestasCuestionario", JSON.stringify(respuestasTransformadas));
};


export const cargarRespuestas = (): { [key: string]: string | string[] } => {
  const data = localStorage.getItem("respuestasCuestionario");
  if (!data) return {};

  const respuestasParseadas = JSON.parse(data);

 
  Object.keys(respuestasParseadas).forEach((key) => {
    try {
      const parsedValue = JSON.parse(respuestasParseadas[key]);
      if (Array.isArray(parsedValue)) {
        respuestasParseadas[key] = parsedValue;
      }
    } catch (error) {
      
    }
  });

  return respuestasParseadas;
};

