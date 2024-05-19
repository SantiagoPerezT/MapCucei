import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import Marcadores from "./Marcadores.jsx"; // Asegúrate de que esta ruta es correcta
import FormCreate from "./FormCreate.jsx";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

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
      <div className="flex flex-col items-center justify-center xl:flex-row w-full">
        <div className="flex flex-col items-center justify-center w-full p-6">
          <MapContainer
            center={[20.6567129, -103.3251218]}
            zoom={17}
            style={{ height: "450px", width: "450px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {modulos.map((modulo) => (
              <Marcadores
                key={modulo.id}
                id={modulo.id}
                nombre={modulo.nombre}
                descripcion={modulo.descripcion}
                tipo={modulo.tipo}
                coordenaday={modulo.coordenaday}
                coordenadax={modulo.coordenadax}
              />
            ))}
          </MapContainer>
          <a
            href="../assets/mapa-cucei.pdf"
            download="mapa-cucei.pdf"
            className="bg-sky-700 w-full text-white text-center font-semibold text-lg"
          >
            Descargar mapa
          </a>
        </div>
        <div className="flex flex-col items-center justify-center w-full p-12">
          <iframe
            width="460"
            height="315"
            src="https://www.youtube.com/embed/Su4ktK9fZ_I?si=2-rAxkB2Aa-TYPdG"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
          <FormCreate></FormCreate>
        </div>
      </div>
    </>
  );
}
/*


*/
export default MyMap;
