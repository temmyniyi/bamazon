// INCLUDING NPM PACKAGES
var mysql = require("mysql");
var inquirer = require("inquirer");
// var Table = require("cli-table2");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "ota4eva@sql",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
});

// GLOBAL VARIABLES
var productList = [];

managerConsole();

// FUNCTION WELCOMING THE  USER TO THE MANAGER CONSOLE AND ASKING WHAT THEY'D LIKE TO DO
function managerConsole() {
  inquirer
    .prompt([
      {
        name: "whatToDo",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View and Update Low Inventory",
          "Add a New Product"
        ]
      }
    ])
    .then(function(answer) {
      var toDo = answer.whatToDo;
      //   console.log("You want to " + toDo);

      switch (toDo) {
        case "View Products for Sale":
          //   console.log("You sure want to " + toDo);
          doneViewing();
          break;

        case "View and Update Low Inventory":
          lowInventory();
          break;

        case "Add a New Product":
          // console.log("adding new product");
          addNew();
          break;
      }
    });
}

//FUNCTION TO DISPLAY A LIST OF PRODUCTS
function viewProducts() {
  return new Promise(function(resolve, reject) {
    productList = [];

    var query = "SELECT * FROM products";

    connection.query(query, function(err, result) {
      if (err) throw err;

      for (var i = 0; i < result.length; i++) {
        var productObject = {
          item_id: result[i].item_id,
          product_name: result[i].product_name,
          department: result[i].department_name,
          price: result[i].price,
          stock_quantity: result[i].stock_quantity
        };
        productList.push(productObject);
      }

      console.log("");
      console.log("");
      console.log(
        "\n Here's a list of all the products currently on sale at Bamazon. \n"
      );
      console.table(productList);
      resolve();
    });
  });
}

// FUNCTION TO CLOSE THE LIST OF PRODUCTS WHEN THE USER IS DONE LOOKING AT THEM
function doneViewing() {
  viewProducts().then(function(result) {
    inquirer
      .prompt([
        {
          name: "doneViewing",
          type: "confirm",
          message: "Do you want to complete another task?"
        }
      ])
      .then(function(answer) {
        if (answer.doneViewing) {
          managerConsole();
        } else {
          console.log("\n OK! Have a great day, Ms. Manager! \n");
          connection.end();
        }
      });
  });
}

//FUNCTION THAT CHECKS FOR LOW INVENTORY ON ITEMS
function lowInventory() {
  console.log("you're in low inventory!");
  var query = "SELECT * FROM Products WHERE stock_quantity < 25";
  var lowInv = [];

  connection.query(query, function(err, res) {
    if (err) return err;
    // console.log(res);

    for (var i = 0; i < res.length; i++) {
      var lowInvObject = {
        item_id: res[i].item_id,
        product_name: res[i].product_name,
        department: res[i].department_name,
        price: res[i].price,
        stock_quantity: res[i].stock_quantity
      };
      lowInv.push(lowInvObject);
    }
    console.log("\n\n The following product have less than 25 in stock. \n");
    console.table(lowInv);

    inquirer
      .prompt([
        {
          name: "upInv",
          type: "confirm",
          message: "Do you want to update the inventory for an item?"
        }
      ])
      .then(function(ans) {
        if (ans.upInv) {
        //   console.log("great! pick an item");
          addInventory();
        }
      });
  });
}

//FUNCTION THAT ALLOWS THE USER TO ADD INVENTORY
function addInventory() {
  // console.log ("you're adding inventory!");

  // INQUIRER PROMPT ASKING THEM WHICH PRODUCT THEY WOULD LIKE TO UPDATE THE INVENTORY FOR
  inquirer
    .prompt([
      {
        name: "whichOne",
        type: "input",
        message: "Which product do you want to add inventory to?"
      },
      {
        name: "howMany",
        type: "input",
        message: "How many do you want to add?"
      }
    ])
    .then(function(ans) {
    //   console.log(ans.whichOne);
    //   console.log(ans.howMany);

      
      var query =
        "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?";

      connection.query(query, [ans.howMany, ans.whichOne], function(err, res) {
        if (err) return err;
        // console.log("updated!");
      });

      inquirer
        .prompt ([
            {
                name:"anotherOne", 
                type: "confirm", 
                message: "Do you want to update another item?"
            }
        ])
        .then (function(ans){
            if (ans.anotherOne) { 
                addInventory(); 
            }
            else {
                doneViewing(); 
            }
        })
    });
}

//FUNCTION THAT ALLOWS THE USER TO ADD A NEW PRODUCT 
function addNew() {
  console.log("ADDING NEW");
  // INQUIRER PROMPT FOR THE PRODUCT NAME, DEPARTMENT, PRICE, QTY
  inquirer
    .prompt([
      {
        name: "prodName",
        type: "input",
        message: "What is the name of the product you want to add?"
      },

      {
        name: "dept",
        type: "input",
        message: "What Department does this product belong in?"
      },

      {
        name: "price",
        type: "input",
        message: "How much does the product cost?"
      },

      {
        name: "qty",
        type: "input",
        message: "How many products do you have to sell?"
      }
    ])
    .then(function(answer) {
      var product_name = answer.prodName;
      var department_name = answer.dept;
      var price = parseFloat(answer.price);
      var stock_quantity = parseInt(answer.qty);

      var query =
        "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)";

    //   console.log(query);

      connection.query(
        query,
        [product_name, department_name, price, stock_quantity],
        function(err, res) {
          if (err) throw err;
          // console.log("Successfully added a new product to the store!")
        }
      );

      inquirer
        .prompt([
          {
            name: "anotherItem",
            type: "confirm",
            message: "Do you want to add another item?"
          }
        ])

        .then(function(ans) {
          if (ans.anotherItem) {
            addNew();
          } else {
            doneViewing();
          }
        });
    });
}
