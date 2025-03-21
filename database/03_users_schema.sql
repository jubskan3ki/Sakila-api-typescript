USE sakila;

--
-- Table structure for table `users`
--

CREATE TABLE users (
                       id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
                       first_name VARCHAR(45) NOT NULL,
                       last_name VARCHAR(45) NOT NULL,
                       email_address VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       role ENUM('admin', 'common') NOT NULL DEFAULT 'common',
                       PRIMARY KEY  (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO users (first_name, last_name, email_address, password, role)
    VALUES ('pierre', 'lerocher', 'rijenththedon@gmail.com', 'password', 'admin'),
           ('jeanne', 'darc', 'test@test.com', 'password', 'common');
