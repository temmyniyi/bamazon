USE bamazon; 

ALTER TABLE products 
ADD COLUMN product_sales DECIMAL (10,2) AFTER stock_quantity;

SELECT * FROM products; 
