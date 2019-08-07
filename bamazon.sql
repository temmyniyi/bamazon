CREATE database bamazon;  

USE bamazon; 

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT, 
    product_name VARCHAR(100), 
    department_name VARCHAR(100), 
    price DECIMAL (10,2), 
    stock_quantity INT 
)

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Reverberation Spot - Smart Speaker with Balexa", "Smart Home", 24.99, 100); 

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Ignite Paperwhite E-Reader" ,"Books" ,129.99,250); 

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Bamazon Basics Modulation-Controlled Microwave","Kitchen" ,59.99,200); 

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Ablaze 7-Inch Tablet" ,"Electronics" ,49.99,300); 

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Alight TV Stick with Balexa Voice Control","Electronics" ,39.99,550); 

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Reverberation Dot Kids Edition ", "Smart Home" ,69.99,100); 

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Reverberation Present Compact Smart Display" ,"Smart Home" ,89.99,150); 

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Reverberation (2nd Generation) Speaker with Balexa" ,"Electronics",69.99,10); 

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Reverberation Dapple Smart Alarm Clock with Balexa" ,"Electronics" ,129.99,60); 

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Reverberation Stare  | Hands-Free Style Assistant with Balexa","Electronics" ,99.99,90); 

SELECT * FROM products 




