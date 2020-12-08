const pool = require("./db");

(async () => {
  await pool.query(
    "INSERT INTO magnet (image_url, lat, lng, owner, hunter, comment, city, country, area, handmade) VALUES ('/magnetImages/_IMG_3486.JPG', '41.034283', '28.680119', 'Yoshinori', 'Yoshinori', 'Istanbul', 'Istanbul', 'Turkey', 'Middle East', 'true')"
  );
  await pool.query(
    "INSERT INTO magnet (image_url, lat, lng, owner, hunter, comment, city, country, area, handmade) VALUES ('/magnetImages/_IMG_3483.JPG', '18.001593', '-87.943283', 'Haruka', 'Yoshinori', 'Caye Caulker', 'Caye Caulker', 'Belize', 'Central America', 'true')"
  );
  await pool.query(
    "INSERT INTO magnet (image_url, lat, lng, owner, hunter, comment, city, country, area, handmade) VALUES ('/magnetImages/_IMG_3508.JPG', '31.63398', '74.872261', 'Yoshinori', 'Yoshinori', 'Golden Temple', 'Amritsar', 'India', 'South Asia', 'false')"
  );
  await pool.query(
    "INSERT INTO magnet (image_url, lat, lng, owner, hunter, comment, city, country, area, handmade) VALUES ('/magnetImages/_IMG_3488.JPG', '21.452423916467062', '-157.8285200660759', 'Yoshinori', 'Naoko', 'Honolulu', 'Honolulu', 'US', 'North America', 'false')"
  );
  await pool.query(
    "INSERT INTO magnet (image_url, lat, lng, owner, hunter, comment, city, country, area, handmade) VALUES ('/magnetImages/_IMG_3495.JPG', '-7.155695196716455', '-78.5165626040126', 'Yoshinori', 'Yoshinori', 'Cajamarca', 'Cajamarca', 'Peru', 'South America', 'false')"
  );
  await pool.query(
    "INSERT INTO magnet (image_url, lat, lng, owner, hunter, comment, city, country, area, handmade) VALUES ('/magnetImages/_IMG_3504.JPG', '10.762622', '106.660172', 'Yoshinori', 'Yoshinori', 'Ho Chi Minh', 'Ho Chi Minh', 'Vietnam', 'South East Asia', 'false')"
  );
  await pool.query(
    "INSERT INTO magnet (image_url, lat, lng, owner, hunter, comment, city, country, area, handmade) VALUES ('/magnetImages/_IMG_3484.JPG', '-8.409518', '115.188919', 'Yoshinori', 'Yoshinori', 'Bali', 'Bali', 'Indonesia', 'South East Asia', 'false')"
  );
  await pool.query(
    "INSERT INTO magnet (image_url, lat, lng, owner, hunter, comment, city, country, area, handmade) VALUES ('/magnetImages/_IMG_3485.JPG', '50.716667', '-3.533333', 'Yoshinori', 'Yoshinori', 'Exeter', 'Exeter', 'UK', 'Europe', 'false')"
  );
  await pool.query(
    "INSERT INTO magnet (image_url, lat, lng, owner, hunter, comment, city, country, area, handmade) VALUES ('/magnetImages/_IMG_3480.JPG', '47.608013', '-122.335167', 'Yoshinori', 'Yoshinori', 'Seattle', 'Seattle', 'US', 'North America', 'false')"
  );
  await pool.query(
    "INSERT INTO magnet (image_url, lat, lng, owner, hunter, comment, city, country, area, handmade) VALUES ('/magnetImages/_IMG_3482.JPG', '34.81107709457434', '135.5296870237863', 'Yoshinori', 'Yoshinori', 'Expo Park, Osaka', 'Osaka', 'Japan', 'East Asia', 'false')"
  );
  await pool.query(
    "INSERT INTO magnet (image_url, lat, lng, owner, hunter, comment, city, country, area, handmade) VALUES ('/magnetImages/_IMG_3509.JPG', '25.691688503701073', '32.63886696356614', 'Yoshinori', 'Yoshinori', 'Luxor', 'Luxor', 'Egypt', 'Middle East', 'false')"
  );
  selected = await pool.query(`SELECT * FROM magnet`);
  console.log(selected);
})();
