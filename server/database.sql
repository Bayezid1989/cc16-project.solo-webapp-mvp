CREATE DATABASE magnet;

CREATE TABLE magnet(
    id SERIAL PRIMARY KEY,
    image_url TEXT,
    lat FLOAT,
    lng FLOAT,
    city TEXT,
    country TEXT,
    area TEXT,
    handmade BOOLEAN
);

DROP TABLE magnet;