const pool = require("./db");

(async () => {
  await pool.query(
    "INSERT INTO magnet (image_path, lat, lng, owner, hunter, comment, city, country, favorite, handmade) VALUES ('magnets/_IMG_3486_amygjr', '41.034283', '28.680119', 'Yoshinori', 'Yoshinori', 'Istanbul', 'Istanbul', 'Turkey', 'true', 'true')"
  );
  await pool.query(
    "INSERT INTO magnet (image_path, lat, lng, owner, hunter, comment, city, country, favorite, handmade) VALUES ('magnets/_IMG_3483_oowcjm', '18.001593', '-87.943283', 'Haruka', 'Yoshinori', 'Caye Caulker', 'Caye Caulker', 'Belize', 'false', 'true')"
  );
  await pool.query(
    "INSERT INTO magnet (image_path, lat, lng, owner, hunter, comment, city, country, favorite, handmade) VALUES ('magnets/_IMG_3508_vuczpu', '31.63398', '74.872261', 'Yoshinori', 'Yoshinori', 'Golden Temple', 'Amritsar', 'India', 'false', 'false')"
  );
  await pool.query(
    "INSERT INTO magnet (image_path, lat, lng, owner, hunter, comment, city, country, favorite, handmade) VALUES ('magnets/_IMG_3488_s6vwjz', '21.452423916467062', '-157.8285200660759', 'Yoshinori', 'Naoko', 'Honolulu', 'Honolulu', 'US', 'false', 'false')"
  );
  await pool.query(
    "INSERT INTO magnet (image_path, lat, lng, owner, hunter, comment, city, country, favorite, handmade) VALUES ('magnets/_IMG_3495_vjtlff', '-7.155695196716455', '-78.5165626040126', 'Yoshinori', 'Yoshinori', 'Cajamarca', 'Cajamarca', 'Peru', 'false', 'false')"
  );
  await pool.query(
    "INSERT INTO magnet (image_path, lat, lng, owner, hunter, comment, city, country, favorite, handmade) VALUES ('magnets/_IMG_3504_oenzpu', '10.762622', '106.660172', 'Yoshinori', 'Yoshinori', 'Ho Chi Minh', 'Ho Chi Minh', 'Vietnam', 'false', 'false')"
  );
  await pool.query(
    "INSERT INTO magnet (image_path, lat, lng, owner, hunter, comment, city, country, favorite, handmade) VALUES ('magnets/_IMG_3484_mfe0vp', '-8.409518', '115.188919', 'Yoshinori', 'Yoshinori', 'Bali', 'Bali', 'Indonesia', 'false', 'false')"
  );
  await pool.query(
    "INSERT INTO magnet (image_path, lat, lng, owner, hunter, comment, city, country, favorite, handmade) VALUES ('magnets/_IMG_3485_uouoxt', '50.716667', '-3.533333', 'Yoshinori', 'Yoshinori', 'Exeter', 'Exeter', 'UK', 'false', 'false')"
  );
  await pool.query(
    "INSERT INTO magnet (image_path, lat, lng, owner, hunter, comment, city, country, favorite, handmade) VALUES ('magnets/_IMG_3480_vvrl4d', '47.608013', '-122.335167', 'Yoshinori', 'Yoshinori', 'Seattle', 'Seattle', 'US', 'false', 'false')"
  );
  await pool.query(
    "INSERT INTO magnet (image_path, lat, lng, owner, hunter, comment, city, country, favorite, handmade) VALUES ('magnets/_IMG_3482_ofdmil', '34.81107709457434', '135.5296870237863', 'Yoshinori', 'Yoshinori', 'Expo Park, Osaka', 'Osaka', 'Japan', 'false', 'false')"
  );
  await pool.query(
    "INSERT INTO magnet (image_path, lat, lng, owner, hunter, comment, city, country, favorite, handmade) VALUES ('magnets/_IMG_3509_ekrn37', '25.691688503701073', '32.63886696356614', 'Yoshinori', 'Yoshinori', 'Luxor', 'Luxor', 'Egypt', 'false', 'false')"
  );
  await pool.query(
    "INSERT INTO magnet (image_path, lat, lng, owner, hunter, comment, city, country, favorite, handmade) VALUES ('magnets/_IMG_3498_kz9s7l', '32.87227448898397', '35.54991416882039', 'Yoshinori', 'Yoshinori', 'Miracle church', 'Tabgha', 'Israel', 'false', 'false')"
  );
  selected = await pool.query(`SELECT * FROM magnet`);
  console.log(selected);
})();
