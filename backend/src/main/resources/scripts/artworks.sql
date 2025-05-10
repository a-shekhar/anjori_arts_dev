CREATE TABLE arts.artworks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    size VARCHAR(20),
    medium VARCHAR(20),
    surface VARCHAR(20),
    price DECIMAL(6, 2),
    slug VARCHAR(255) UNIQUE NOT NULL,
    available BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    tags TEXT, -- comma-separated tags (e.g., "nature,green,oil")
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE arts.artwork_images (
    id SERIAL PRIMARY KEY,
    artwork_id INTEGER NOT NULL REFERENCES arts.artworks(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    display_order INTEGER DEFAULT 0,
    is_main BOOLEAN DEFAULT false
);
