USE bamazon; 

CREATE TABLE departments (
    dept_id INT NOT NULL AUTO_INCREMENT, 
    dept_name VARCHAR(100), 
    over_head_cost DECIMAL (10, 2), 
    PRIMARY KEY (dept_id)
); 