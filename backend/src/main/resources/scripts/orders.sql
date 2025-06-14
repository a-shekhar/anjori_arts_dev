CREATE TABLE orders.order_status(
    code VARCHAR(10) PRIMARY KEY,
    name VARCHAR(30)
);

INSERT INTO orders.order_status (code, name) VALUES ('AWA', 'Awaiting Artist Confirmation');

CREATE TABLE arts.orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES arts.users(user_id), -- nullable foreign key
  artwork_id BIGINT NOT NULL REFERENCES arts.artworks(id), -- required
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  email VARCHAR(50),
  country_code VARCHAR(5) DEFAULT '+91',
  phone_no VARCHAR(15),
  status VARCHAR(50) DEFAULT 'Pending',
  created_at TIMESTAMP
);
