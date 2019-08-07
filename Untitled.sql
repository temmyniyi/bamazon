USE bamazon; 

CREATE TABLE departments (
    dept_id INT NOT NULL AUTO_INCREMENT, 
    department_name VARCHAR(100), 
    over_head_cost DECIMAL (10, 2), 
    PRIMARY KEY (dept_id)
); 


INSERT INTO departments (department_name, over_head_cost) 
VALUES ("Smart Home", 500); 

INSERT INTO departments (department_name, over_head_cost) 
VALUES ("Kitchen", 600); 

INSERT INTO departments (department_name, over_head_cost) 
VALUES ("Books", 1000); 

INSERT INTO departments (department_name, over_head_cost) 
VALUES ("Electronics", 2100); 

SELECT * FROM departments 