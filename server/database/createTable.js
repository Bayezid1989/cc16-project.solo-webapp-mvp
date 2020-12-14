const pool = require("./db");

(async () => {
  await pool.query(
    "CREATE TABLE magnet(id SERIAL PRIMARY KEY, image_path TEXT, lat FLOAT, lng FLOAT, owner TEXT, hunter TEXT, comment TEXT, city TEXT, country TEXT, favorite BOOLEAN, handmade BOOLEAN, area TEXT)"
  );
  selected = await pool.query(`SELECT * FROM magnet`);
  console.log(selected);
})();
