CREATE DATABASE lostandfound;
USE lostandfound;

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lost_items (
    lost_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    item_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    description TEXT,
    location_lost VARCHAR(150),
    date_lost DATE,
    image_path VARCHAR(255),
    status ENUM('Unclaimed', 'Claimed', 'Pending Verification') DEFAULT 'Unclaimed',
    date_posted DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE found_items (
    found_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    item_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    description TEXT,
    location_found VARCHAR(150),
    date_found DATE,
    image_path VARCHAR(255),
    status ENUM('Unclaimed', 'Claimed', 'Pending Verification') DEFAULT 'Unclaimed',
    date_posted DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE admin_logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    admin_id INT,
    action VARCHAR(255),
    item_type ENUM('Lost', 'Found'),
    item_id INT,
    date_action DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES users(user_id) ON DELETE SET NULL
);
