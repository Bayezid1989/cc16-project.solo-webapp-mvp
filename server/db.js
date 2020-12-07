require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  port: 5432,
  database: process.env.DB_NAME || "magnet",
});

module.exports = pool;
