import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

function MyMap() {
  return (
    <MapContainer
      center={[20.6548611, -103.3254497]}
      zoom={17}
      style={{ height: "650px", width: "650px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[20.6548611, -103.3254497]}>
        <Popup>
          <button className="bg-[#0B7A93] rounded-md py-2">
            iniciar sesion
          </button>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MyMap;
