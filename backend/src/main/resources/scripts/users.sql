CREATE TABLE users (
  user_id SERIAL PRIMARY KEY, -- Use BIGSERIAL for auto-incrementing ID
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30),
  username VARCHAR(20) UNIQUE,
  email VARCHAR(50) UNIQUE,
  country_code VARCHAR(5),
  phone_no bigint UNIQUE,
  role VARCHAR(15) DEFAULT 'ROLE_USER', -- Fixed default value syntax
  password VARCHAR(100),
  profile_image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
