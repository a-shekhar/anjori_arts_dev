create schema arts;

CREATE TABLE arts.surface(
  code VARCHAR(10) PRIMARY KEY,
  name VARCHAR(20)
);

CREATE TABLE arts.medium(
  code VARCHAR(10) PRIMARY KEY,
  name VARCHAR(20)
);

CREATE TABLE arts.availability(
  code VARCHAR(10) PRIMARY KEY,
  name VARCHAR(20)
);


CREATE TABLE arts.artworks (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    size VARCHAR(10),
    price DECIMAL(6, 2),
    surface_code VARCHAR(10)  NOT NULL REFERENCES arts.surface(code),
    tags TEXT,
    description TEXT,
    artist_note TEXT,
    availability_code varchar(20) NOT NULL REFERENCES arts.availability(code),
    featured BOOLEAN DEFAULT false,
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE arts.artwork_medium (
  artwork_id BIGSERIAL NOT NULL REFERENCES arts.artworks(id),
  medium_code VARCHAR NOT NULL REFERENCES arts.medium(code),
  PRIMARY KEY (artwork_id, medium_code)
);

CREATE TABLE arts.artwork_images (
    id BIGSERIAL PRIMARY KEY,
    artwork_id BIGSERIAL NOT NULL REFERENCES arts.artworks(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0
);


CREATE OR REPLACE VIEW arts.artwork_summary AS
SELECT
    artwork.id,
    artwork.title,
    artwork.size,
    artwork.price,
    surface.name AS surface,
	 -- Sorted, comma-separated medium names or "No Choice"
    COALESCE((
        SELECT STRING_AGG(medium.name, ', ' ORDER BY medium.name)
        FROM arts.artwork_medium art_medium
        JOIN arts.medium medium ON art_medium.medium_code = medium.code
        WHERE art_medium.artwork_id = artwork.id
    ), 'No Choice') AS mediums,
    artwork.tags,
    artwork.description,
    artwork.artist_note,
    availability.name AS availability,
    artwork.featured,
    artwork.slug,
    artwork.created_at
FROM arts.artworks artwork
JOIN arts.surface surface ON artwork.surface_code = surface.code
JOIN arts.availability availability ON artwork.availability_code = availability.code;

-- insert values

INSERT INTO arts.surface (code, name) VALUES ('CAN', 'Canvas');
INSERT INTO arts.surface (code, name) VALUES ('TOT', 'Tote Bag');


INSERT INTO arts.medium (code, name) VALUES ('ACR', 'Acrylic');
INSERT INTO arts.medium (code, name) VALUES ('CH', 'Charcoal');
INSERT INTO arts.medium (code, name) VALUES ('FAB', 'Fabric');
INSERT INTO arts.medium (code, name) VALUES ('OIL', 'Oil');
INSERT INTO arts.medium (code, name) VALUES ('MIX', 'Mixed Media');

INSERT INTO arts.availability (code, name) VALUES ('AV', 'Available');
INSERT INTO arts.availability (code, name) VALUES ('REQ', 'Ready for Request');
INSERT INTO arts.availability (code, name) VALUES ('SOLD', 'Sold');
