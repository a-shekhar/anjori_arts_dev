CREATE SCHEMA orders;

CREATE TABLE arts.art_type(
    code VARCHAR(10) PRIMARY KEY,
    name VARCHAR(20)
);


CREATE TABLE orders.order_status(
    code VARCHAR(10) PRIMARY KEY,
    name VARCHAR(30)
);


CREATE TABLE orders.custom_orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGSERIAL REFERENCES auth.users(user_id) ON DELETE SET NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  email VARCHAR(50),
  country_code VARCHAR(5),
  phone_no VARCHAR(10),
  art_type_code VARCHAR(20) REFERENCES arts.art_type(code),
  surface_code VARCHAR REFERENCES arts.surface(code),
  budget VARCHAR(20),
  preferred_size VARCHAR(10),
  no_of_copies VARCHAR(5),
  additional_notes TEXT,
  suggest_options BOOLEAN DEFAULT FALSE,
  quoted_price NUMERIC(10, 2),
  agreed_price NUMERIC(10, 2),
  status_code VARCHAR REFERENCES orders.order_status(code),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);


CREATE TABLE orders.custom_order_images (
  id BIGSERIAL PRIMARY KEY,
  custom_order_id BIGSERIAL NOT NULL REFERENCES orders.custom_orders(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0
);


CREATE TABLE orders.custom_order_medium (
  custom_order_id BIGSERIAL NOT NULL REFERENCES orders.custom_orders(id) ON DELETE CASCADE,
  medium_code VARCHAR NOT NULL REFERENCES arts.medium(code),
  PRIMARY KEY (custom_order_id, medium_code)
);


-- insert values
INSERT INTO arts.art_type (code, name) VALUES ('MAN', 'Mandala');
INSERT INTO orders.order_status (code, name) VALUES ('AWA', 'Awaiting Artist Confirmation');