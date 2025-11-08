DROP DATABASE IF EXISTS mediashare;
CREATE DATABASE mediashare;
USE mediashare;

-- USERS TABLE --
CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_level_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- MEDIAITEMS TABLE --
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
  FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- COMMENTS TABLE --
CREATE TABLE Comments (
  comment_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  media_id INT NOT NULL,
  user_id INT NOT NULL,
  comment_text VARCHAR(255) NOT NULL,
  FOREIGN KEY (media_id) REFERENCES MediaItems(media_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- LIKES TABLE --
CREATE TABLE Likes (
  like_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  media_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(media_id, user_id),
  FOREIGN KEY (media_id) REFERENCES MediaItems(media_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- FOLLOWS TABLE --
CREATE TABLE Follows (
  follower_id INT NOT NULL,
  followee_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (follower_id, followee_id),
  FOREIGN KEY (follower_id) REFERENCES Users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (followee_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- TEST DATA --
INSERT INTO Users VALUES (260, 'VCHar', 'secret123', 'vchar@example.com', 1, NULL);
INSERT INTO Users VALUES (305, 'Donatello', 'secret234', 'dona@example.com', 1, NULL);

INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type) 
VALUES ('ffd8.jpg', 887574, 'Favorite drink', '', 260, 'image/jpeg');

INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type) 
VALUES ('ffd8.jpg', 887574, 'Favorite drink', '', 305, 'image/jpeg'),
       ('dbbd.jpg', 60703, 'Miika', 'My Photo', 305, 'image/jpeg'),
       ('2f9b.jpg', 30635, 'Aksux and Jane', 'friends', 260, 'image/jpeg');

-- test query
SELECT username, title, filename
FROM Users, MediaItems
WHERE username LIKE 'D%' AND Users.user_id = MediaItems.user_id;

-- EXTRA DATA --
INSERT INTO Comments (media_id, user_id, comment_text) VALUES
 (1, 260, 'Nice picture!'),
 (1, 305, 'Great photo!'),
 (2, 260, 'Looks cool!');

INSERT INTO Likes (media_id, user_id) VALUES
 (1, 260),
 (1, 305),
 (2, 260);

INSERT INTO Follows (follower_id, followee_id) VALUES
 (260, 305),
 (305, 260);



--show media with comment count and like count--
SELECT
  MediaItems.media_id,
  MediaItems.title,
  Users.username AS owner,
  (SELECT COUNT(*) FROM Comments WHERE Comments.media_id = MediaItems.media_id) AS comment_count,
  (SELECT COUNT(*) FROM Likes WHERE Likes.media_id = MediaItems.media_id) AS like_count
FROM MediaItems
JOIN Users ON MediaItems.user_id = Users.user_id;
