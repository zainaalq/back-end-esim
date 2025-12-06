DROP DATABASE IF EXISTS mediashare;
CREATE DATABASE mediashare;
USE mediashare;

-- USERS TABLE
CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_level_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- MEDIA TABLE
CREATE TABLE MediaItems (
  media_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filesize INT NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

--  NEW: LOCATIONS TABLE
CREATE TABLE Locations (
  location_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  description VARCHAR(255)
);

--  NEW: BOOKINGS TABLE
CREATE TABLE Bookings (
  booking_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  location_id INT NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (location_id) REFERENCES Locations(location_id)
);

--  INSERT DATA AFTER TABLES ARE CREATED
INSERT INTO Users VALUES (260, 'VCHar', 'secret123', 'vchar@example.com', 1, null);
INSERT INTO Users VALUES (305, 'Donatello', 'secret234', 'dona@example.com', 1, null);

INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type)
VALUES ('ffd8.jpg', 887574, 'Favorite drink', '', 260, 'image/jpeg');

INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type)
VALUES ('ffd8.jpg', 887574, 'Favorite drink', '', 305, 'image/jpeg'),
       ('dbbd.jpg', 60703, 'Miika', 'My Photo', 305, 'image/jpeg'),
       ('2f9b.jpg', 30635, 'Aksux and Jane', 'friends', 260, 'image/jpeg');

INSERT INTO Locations (name, address, description)
VALUES ('Studio A', 'Street 1', 'Professional indoor studio'),
       ('Park Area', 'Central Park', 'Outdoor location');

INSERT INTO Bookings (user_id, location_id, start_time, end_time)
VALUES (260, 1, '2025-11-10 12:00', '2025-11-10 14:00'),
       (305, 2, '2025-11-11 18:00', '2025-11-11 19:00');

--  QUERIES

-- Näytä kaikki varaukset
SELECT username, name AS location, start_time, end_time
FROM Bookings
JOIN Users ON Users.user_id = Bookings.user_id
JOIN Locations ON Locations.location_id = Bookings.location_id;

-- Päivitä varauksen aika
UPDATE Bookings SET start_time = '2025-11-10 13:00' WHERE booking_id = 1;

-- Poista varaus
DELETE FROM Bookings WHERE booking_id = 2;
