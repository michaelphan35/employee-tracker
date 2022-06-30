DROP DATABASE IF EXISTS tracker;
CREATE DATABASE tracker;
USE tracker;

CREATE TABLE department
(
    id INT AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KET(id)
);

CREATE TABLE roles
(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    department_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id);
);

CREATE TABLE employee
(
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (role_id) REFERENCES roles(id);
);