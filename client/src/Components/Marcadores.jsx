import { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import escenario from "../assets/stage.png";
import laboratorio from "../assets/laboratory.png";
import salon from "../assets/school.png";
import comida from "../assets/food.png";
import coordi from "../assets/coordinacion.png";
import PropTypes from "prop-types";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const Stage = L.icon({
  iconUrl: escenario,
  iconSize: [48, 48], // Tamaño del icono
  iconAnchor: [16, 32], // Punto de anclaje del icono
  popupAnchor: [0, -32], // Punto de anclaje del popup
});

const Lab = L.icon({
  iconUrl: laboratorio,
  iconSize: [48, 48], // Tamaño del icono
  iconAnchor: [16, 32], // Punto de anclaje del icono
  popupAnchor: [0, -32], // Punto de anclaje del popup
});

const Salon = L.icon({
  iconUrl: salon,
  iconSize: [48, 48], // Tamaño del icono
  iconAnchor: [16, 32], // Punto de anclaje del icono
  popupAnchor: [0, -32], // Punto de anclaje del popup
});

const Food = L.icon({
  iconUrl: comida,
  iconSize: [48, 48], // Tamaño del icono
  iconAnchor: [16, 32], // Punto de anclaje del icono
  popupAnchor: [0, -32], // Punto de anclaje del popup
});

const Coordi = L.icon({
  iconUrl: coordi,
  iconSize: [48, 48], // Tamaño del icono
  iconAnchor: [16, 32], // Punto de anclaje del icono
  popupAnchor: [0, -32], // Punto de anclaje del popup
});

function Main({ id, nombre, descripcion, tipo, coordenadax, coordenaday }) {
  const [deleting, setDeleting] = useState(false);
  const [progress, setProgress] = useState(0);

  const deleteModulo = async (id) => {
    try {
      const response = await fetch(`${URL}/modulo/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar el elemento");
      }
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteClick = () => {
    setDeleting(true);
    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 10;
      setProgress(progressValue);
      if (progressValue >= 100) {
        clearInterval(interval);
        deleteModulo(id);
      }
    }, 500); // Duración total de 1 segundo
  };

  return (
    <Marker position={[coordenaday, coordenadax]} icon={getIcon(tipo)}>
      <Popup>
        <h1 className="text-base">{nombre}</h1>
        <p>{descripcion}</p>
        <button
          onClick={handleDeleteClick}
          className="bg-red-500 text-white"
          disabled={deleting}
        >
          Eliminar
        </button>
        {deleting && (
          <div
            className="progress-bar"
            style={{
              width: `${progress}%`,
              height: "5px",
              background: "green",
              marginTop: "5px",
            }}
          ></div>
        )}
      </Popup>
    </Marker>
  );
}

const getIcon = (tipo) => {
  switch (tipo) {
    case "Auditorio":
      return Stage;
    case "Laboratorio":
      return Lab;
    case "Salon":
      return Salon;
    case "Comida":
      return Food;
    case "Coordinacion":
      return Coordi;
    default:
      return null;
  }
};

Main.propTypes = {
  id: PropTypes.number.isRequired,
  nombre: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  coordenadax: PropTypes.string.isRequired,
  coordenaday: PropTypes.string.isRequired,
};

export default Main;
