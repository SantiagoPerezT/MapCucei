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

app.get("/modulo", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM modulo WHERE id = 1");
    console.log("Full query result:", result); // Imprime el resultado completo
    if (result.rows.length > 0) {
      console.log("Query result:", result.rows[0]); // Imprime la primera fila del resultado
      res.send(
        result.rows[0] // Ajusta 'now' al campo correcto en tu tabla 'modulo'
      );
    } else {
      res.status(404).send({ error: "No data found" });
    }
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
