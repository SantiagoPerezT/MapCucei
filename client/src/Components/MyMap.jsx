import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import Marcadores from "./Marcadores.jsx"; // Asegúrate de que esta ruta es correcta

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

import L from "leaflet";
import icon from "../assets/stage.png";

const Stage = L.icon({
  iconUrl: icon,
  iconSize: [48, 48], // Tamaño del icono
  iconAnchor: [16, 32], // Punto de anclaje del icono
  popupAnchor: [0, -32], // Punto de anclaje del popup
});

function MyMap() {
  const [modulos, setModulos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${URL}/modulos`);
        const data = await res.json();
        setModulos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <MapContainer
        center={[20.6567129, -103.3251218]}
        zoom={17}
        style={{ height: "650px", width: "650px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {modulos.map((modulo) => (
          <Marcadores
            key={modulo.id}
            nombre={modulo.nombre}
            descripcion={modulo.descripcion}
            tipo={modulo.tipo}
            coordenaday={modulo.coordenaday}
            coordenadax={modulo.coordenadax}
          />
        ))}
        <Marker position={[20.756899, -103.32622]} icon={Stage}>
          <Popup>
            <h1 className="text-base">ejemplo</h1>
            <p>ejemplo</p>
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}
/*


*/
export default MyMap;
