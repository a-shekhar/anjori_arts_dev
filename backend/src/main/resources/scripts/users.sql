CREATE SCHEMA auth;

CREATE TABLE auth.users (
  user_id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30),
  username VARCHAR(20) UNIQUE,
  email VARCHAR(100) UNIQUE,
  country_code VARCHAR(5),
  phone_no VARCHAR(10) UNIQUE,
  role VARCHAR(15) DEFAULT 'ROLE_USER',
  password VARCHAR(100),
  profile_image_url TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);


-- 15/05/2025
UPDATE arts.users SET role = 'ROLE_ADMIN' WHERE email = 'rajadityasingh31@gmail.com';