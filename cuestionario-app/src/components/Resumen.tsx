import React from "react";
import { useTranslation } from "react-i18next";

interface ResumenProps {
  respuestas: { [key: string]: string | string[] };
}

const Resumen: React.FC<ResumenProps> = ({ respuestas }) => {
  const { t } = useTranslation();

  // Diccionario de traducciones de identificadores
  const traducciones: { [key: string]: string } = {
    nombre: t("name"),
    fecha_nacimiento: t("date_of_birth"),
    email: t("email"),
    sexo: t("gender"),
    preferencias: t("preferences"),
    comentarios: t("comments"),
    satisfaccion: t("satisfaction"),
    asistencia: t("attendance"),
    horarios: t("schedules"),
    frecuencia: t("frequency"),
    tiempo: t("time"),
    productos: t("products"),
    sistema_operativo: t("operating_system"),
    favorito: t("favorite_movie"),
    vista: t("viewed_movies"),
  };

  return (
    <div className="resumen-container">
      <h2>{t("summary")}</h2>
      <ul className="list-group">
        {Object.entries(respuestas).map(([clave, valor], index) => (
          <li key={index} className="list-group-item">
            <strong>{traducciones[clave] || clave}:</strong> {Array.isArray(valor) ? valor.join(", ") : valor}
          </li>
        ))}
      </ul>
      <button className="btn btn-custom mt-3" onClick={() => window.location.reload()}>
        {t("restart")}
      </button>
    </div>
  );
};

export default Resumen;
