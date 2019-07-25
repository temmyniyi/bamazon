USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("House of Stark Keyholder", "Collectibles", 19.99, 99),
("House Targaryan Keyholder", "Collectibles", 19.99, 144),
("House Martell Keyholder", "Collectibles", 19.99, 101),
("Hand of the King Lapel Pin", "Collectibles", 19.99, 66),
("Game of Thrones themed Watch", "Bedding", 9.99, 500),
("Arya Stark Statuette", "Toys", 5.99, 100),
("Arya Stark needle T-Shirt", "Costumes", 14.99, 181),
("Game of Thrones Opening Theme Song", "Pure Entertainment", 24.99, 6),
("Jon Snow Replica Jacket", "Clothing", 99.99, 69),
("Ned Stark Statuette Candy", "Candy", 14.99, 77),
("Danaerys Remote Control Doll", "Electronics", 44.99, 33),
("Needle Sword", "Toys", 19.99, 55),
("Jon Snow Sword", "Collectibles", 21.99, 165);

SELECT * FROM products;
