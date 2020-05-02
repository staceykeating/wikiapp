-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  zoom INTEGER  NOT NULL DEFAULT 0,
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
);
