const pool = require("./db");

(async () => {
  await pool.query("DROP TABLE magnet");
})();
