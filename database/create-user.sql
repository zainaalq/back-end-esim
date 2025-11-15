CREATE USER 'mediauser'@'localhost' IDENTIFIED BY 'mypasswors';
GRANT ALL PRIVILEGES ON `MediaSharingApp`.* TO 'mediauser'@'localhost';
FLUSH PRIVILEGES;