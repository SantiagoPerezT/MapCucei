import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "../assets/stage.png";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function MyMap() {
  const Stage = L.icon({
    iconUrl: icon,
    iconSize: [48, 48], // Tamaño del icono
    iconAnchor: [16, 32], // Punto de anclaje del icono
    popupAnchor: [0, -32], // Punto de anclaje del popup
  });

  return (
    <MapContainer
      center={[20.6567129, -103.3251218]}
      zoom={17}
      style={{ height: "650px", width: "650px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[20.6567129, -103.3256218]} icon={Stage}>
        <Popup>
          <h1 className="text-base">Auditorio Ingeniero Jorge Matute Remus</h1>
        </Popup>
      </Marker>
      <Marker position={[20.6548611, -103.3254497]} icon={Stage}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.z
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MyMap;
