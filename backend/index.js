import express from "express";
import cors from "cors";
import pg from "pg";
import {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  FRONTEND_URL,
  PORT,
} from "./config.js";

const app = express();
const pool = new pg.Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

app.use(
  cors({
    origin: FRONTEND_URL,
  })
);

app.use(express.json());

app.get("/modulos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM modulo");
    console.log("Full query result:", result); // Imprime el resultado completo
    if (result.rows.length > 0) {
      console.log("Query result:", result.rows); // Imprime la primera fila del resultado
      res.send(
        result.rows // Ajusta 'now' al campo correcto en tu tabla 'modulo'
      );
    } else {
      res.status(404).send({ error: "No data found en get" });
    }
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// Nueva ruta para crear un elemento en la tabla
app.post("/modulo", async (req, res) => {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const { nombre, descripcion, tipo, coordenadax, coordenaday } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!nombre || !descripcion || !tipo || !coordenadax || !coordenaday) {
      return res.status(400).send({ error: "All fields are required" });
    }

    // Insertar el nuevo elemento en la tabla 'modulo'
    const result = await pool.query(
      "INSERT INTO modulo (nombre, descripcion, tipo, coordenadax, coordenaday) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nombre, descripcion, tipo, coordenadax, coordenaday]
    );

    console.log("Inserted row:", result.rows[0]); // Imprime la fila insertada
    res.status(201).send({
      message: "Element created successfully",
      created: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating element:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// Nueva ruta para eliminar un elemento basado en su id
app.delete("/modulo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM modulo WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount > 0) {
      console.log("Deleted row:", result.rows[0]); // Imprime la fila eliminada
      res.send({
        message: "Element deleted successfully",
        deleted: result.rows[0],
      });
    } else {
      res.status(404).send({ error: "Element not found" });
    }
  } catch (error) {
    console.error("Error executing delete query", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
