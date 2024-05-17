import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import escenario from "../assets/stage.png";
import laboratorio from "../assets/laboratory.png";
import PropTypes from "prop-types";

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

function Main({ nombre, descripcion, tipo, coordenadax, coordenaday }) {
  if (tipo === "Auditorio") {
    return (
      <Marker position={[coordenaday, coordenadax]} icon={Stage}>
        <Popup>
          <h1 className="text-base">{nombre}</h1>
          <p>{descripcion}</p>
        </Popup>
      </Marker>
    );
  }
  if (tipo === "Laboratorio") {
    return (
      <Marker position={[coordenaday, coordenadax]} icon={Lab}>
        <Popup>
          <h1 className="text-base">{nombre}</h1>
          <p>{descripcion}</p>
        </Popup>
      </Marker>
    );
  }
}

Main.propTypes = {
  nombre: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  coordenadax: PropTypes.string.isRequired,
  coordenaday: PropTypes.string.isRequired,
};

export default Main;
