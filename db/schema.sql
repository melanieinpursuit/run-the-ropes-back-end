DROP DATABASE IF EXISTS wrestlers_dev;
CREATE DATABASE wrestlers_dev;

\c wrestlers_dev;

CREATE TABLE wrestlers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    birth_date TEXT,
    debut_date TEXT,
    gender TEXT,
    height INT,
    weight INT,
    billed_from TEXT,
    cagematch_page TEXT,
    recommended_match TEXT,
    bio TEXT,
    image TEXT
);

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    commenter TEXT NOT NULL,
    content TEXT,
    rating NUMERIC,
    CHECK (rating >= 0 AND rating <= 10),
    wrestler_id INTEGER REFERENCES wrestlers (id)
    ON DELETE CASCADE
);