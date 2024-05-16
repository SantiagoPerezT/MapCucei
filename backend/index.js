import express from "express";
import cors from "cors";
import pg from "pg";

const app = express();
const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "CuceiMap",
  password: "Marvel36",
  port: 5432,
});

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/modulo", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  console.log(result);
  res.send({
    modulo: [],
  });
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
