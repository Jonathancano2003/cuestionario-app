import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "title": "Questionnaire",
        "next": "Next",
        "finish": "Finish",
        "summary": "Summary of your answers",
        "restart": "Restart",
        "selectLanguage": "Select language",
        "loading": "Loading questionnaire...",
        "name": "Name",
        "date_of_birth": "Date of Birth",
        "email": "Email",
        "gender": "Gender",
        "preferences": "Preferences",
        "comments": "Comments",
        "satisfaction": "Satisfaction",
        "attendance": "Attendance",
        "schedules": "Schedules",
        "frequency": "Frequency",
        "time": "Time",
        "products": "Products",
        "operating_system": "Operating System",
        "favorite_movie": "Favorite Movie",
        "viewed_movies": "Viewed Movies",
          "select_option": "Select an option"
      }
    },
    es: {
      translation: {
        "title": "Cuestionario",
        "next": "Siguiente",
        "finish": "Finalizar",
        "summary": "Resumen de tus respuestas",
        "restart": "Volver a empezar",
        "selectLanguage": "Seleccionar idioma",
        "loading": "Cargando cuestionario...",
        "name": "Nombre",
        "date_of_birth": "Fecha de Nacimiento",
        "email": "Correo Electrónico",
        "gender": "Sexo",
        "preferences": "Preferencias",
        "comments": "Comentarios",
        "satisfaction": "Satisfacción",
        "attendance": "Asistencia",
        "schedules": "Horarios",
        "frequency": "Frecuencia",
        "time": "Tiempo",
        "products": "Productos",
        "operating_system": "Sistema Operativo",
        "favorite_movie": "Película Favorita",
        "viewed_movies": "Películas Vistas",
          "select_option": "Select an option"
      }
    }
  },
  lng: "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
