DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE inventory (
    id INT(10) AUTO_INCREMENT,
    product_name VARCHAR (50) NOT NULL,
    department_name VARCHAR (50) NOT NULL,
    price DECIMAL (10,4) NOT NULL,
    inventory_quantity INT DEFAULT 0,
    PRIMARY KEY(id)
);