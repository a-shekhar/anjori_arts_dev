CREATE TABLE arts.custom_orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES arts.users(user_id) ON DELETE SET NULL, -- Nullable for guests
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  email VARCHAR(50),
  country_code VARCHAR(5),
  phone_no BIGINT,
  art_type VARCHAR(20),
  surface VARCHAR(20),
  medium VARCHAR(20),
  budget VARCHAR(20),
  preferred_size VARCHAR(10),
  no_of_copies VARCHAR(5),
  additional_notes TEXT,
  suggest_options BOOLEAN DEFAULT FALSE,
  quoted_price NUMERIC(10, 2),
  agreed_price NUMERIC(10, 2),
  status VARCHAR(50) DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE arts.custom_order_images (
  id BIGSERIAL PRIMARY KEY,
  custom_order_id BIGINT NOT NULL REFERENCES arts.custom_orders(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0
);
