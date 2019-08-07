# Bamazon

This activity was for week 12 of my Penn Boot Camp coursework. This week's challenge was to create an Amazon-like store that allows customers to place orders, and depletes the stock quantity as the orders are successfully filled. There's also a manager console that allows users to view what is on sale, check which items are about to run out, and add additional inventory to an item, and add a brand new item for sale. Supervisors can track product sales across departments and see which departments are making the most money.

## Video 
[Click here to view a Bamazon demo](https://embed.vidyard.com/share/UtydV5wznNf22ZkbA9FfBA? "Named link title") 

## Technologies Used
* Node.js
* Javascript 
* NPM Packages 
    * mysql
    * inquirer 
* mySQL

## Features 

* Customers 
    * Load the Bamazon storefront and view the 'thunderbolt' deals (list of products)
    * Select and item and quantity
        * Warns when the user selects a quantity that is greater than what's in stock
    * Confirm purchase (or not)
        * Decrements the stock quantity and increments the sales total for the item if confirmed

* Managers 
    * View a list of products currently for sale in the storefront 
    * View and manage inventory 
        * See a list of products with inventory under 25 items
        * Choose a product to add inventory to 
    * Add new products to the product list 

* Supervisors 
    * View a table of sales by department 
        * Takes data from both tables in the app, and joins them 
        * Total profit is calculated on the fly when the table is generated 
    * Add a new department to the store 

## Backlog
* Refactor the customer flow. I definitely was more confident in the manager and supervisor flow. 
* Add some confirmations when the user adds a department or a product before asking to add another one. 
* Add an actual front end onto the app. 

## My Role 
I was the sole developer on this project and was provided academic support from my TAs and Instructor when I got stuck. 

