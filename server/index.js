require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./database/db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "..", "build")));

app.get("/api/magnets", async (req, res) => {
  try {
    let magnets;
    if (Object.keys(req.query).length > 0) {
      const queries = req.query;
      let conditions = "WHERE ";
      for (query in queries) {
        if (conditions !== "WHERE ") conditions += " AND ";
        conditions += `${query} = '${queries[query]}'`;
      }
      magnets = await pool.query(
        `SELECT * FROM magnet ${conditions}ORDER BY random()`
      );
    } else {
      magnets = await pool.query(`SELECT * FROM magnet ORDER BY random()`);
    }
    res.json(magnets.rows);
  } catch (err) {
    console.log("You got an error at GET(/api/magnets)", err);
  }
});

app.post("/api/magnet", async (req, res) => {
  try {
    const postData = req.body;
    console.log(postData.image_url);
    const newMagnet = await pool.query(
      `INSERT INTO magnet (image_url, lat, lng, owner, hunter, comment, city, country, area, handmade) VALUES ('${postData.image_url}', '${postData.lat}', '${postData.lng}', '${postData.owner}', '${postData.hunter}', '${postData.comment}', '${postData.city}', '${postData.country}', '${postData.area}','${postData.handmade}')`
    );
    res.json(newMagnet);
  } catch (err) {
    console.log("You got an error at POST(/api/magnet)", err);
  }
});

app.patch("/api/magnet/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const patchData = req.body;
    let conditions = "";
    for (data in patchData) {
      if (conditions !== "") conditions += ", ";
      conditions += `${data} = '${patchData[data]}'`;
    }
    const updateMagnet = await pool.query(
      `UPDATE magnet SET ${conditions} WHERE id = $1`,
      [id]
    );
    res.json(updateMagnet);
  } catch {
    console.log("You got an error at UPDATE(/api/magnet)", err);
  }
});

app.delete("/api/magnet/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMagnet = await pool.query("DELETE FROM magnet WHERE id = $1", [
      id,
    ]);
    res.json(deleteMagnet);
  } catch {
    console.log("You got an error at DELETE(/api/magnet)", err);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend server is running on ${PORT}`);
});
