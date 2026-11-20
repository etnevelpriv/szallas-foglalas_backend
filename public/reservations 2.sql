DROP DATABASE IF EXISTS reservations13e;
CREATE DATABASE reservations13e;
USE reservations13e;

CREATE TABLE reservations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    startDate DATETIME NOT NULL,
    guests INT NOT NULL
);
