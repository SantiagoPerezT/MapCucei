import "leaflet/dist/leaflet.css";
import { useState } from "react";

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

function FormCreate() {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    tipo: "",
    coordenadax: "",
    coordenaday: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`${URL}/modulo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        console.log("Módulo creado exitosamente");
        window.location.reload();
        // Realizar acciones adicionales después de crear el módulo si es necesario
      } else {
        console.error("Error al crear el módulo");
        // Manejar el error si la creación del módulo falla
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <div>
      <h1>Crear Nuevo Módulo</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <br />
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="descripcion">Descripción:</label>
        <br />
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        ></textarea>
        <br />
        <label htmlFor="tipo">Tipo:</label>
        <br />
        <select
          type="text"
          id="tipo"
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
        >
          <option value="Auditorio">Auditorio</option>
          <option value="Laboratorio">Laboratorio</option>
          <option value="Salon">Salon</option>
          <option value="Comida">Comida</option>
          <option value="Coordinacion">Coordinacion</option>
        </select>
        <br />
        <label htmlFor="coordenaday">Coordenada Y:</label>
        <br />
        <input
          type="text"
          id="coordenaday"
          name="coordenaday"
          value={formData.coordenaday}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="coordenadax">Coordenada X:</label>
        <br />
        <input
          type="text"
          id="coordenadax"
          name="coordenadax"
          value={formData.coordenadax}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit" className="bg-green-800 text-white">
          Crear Módulo
        </button>
      </form>
    </div>
  );
}
/*


*/
export default FormCreate;
