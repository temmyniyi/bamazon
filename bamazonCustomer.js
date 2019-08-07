// INCLUDING NPM PACKAGES
var mysql = require("mysql");
var inquirer = require("inquirer");
// var Table = require("cli-table2");
require("console.table"); 

// DATABASE CONNECTION VAR AND FUNCTION
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "ota4eva@sql",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  // console.log ("You're in Bamazon!");
});

// GLOBAL VARIABLES
var productList = [];
var itemID = 0;

productDisplay();

// RETRIEVE A LIST OF PRODUCTS AND SAVING THEIR NAMES TO AN EMPTY ARRAY AND LOGGING THEM
function productDisplay() {
  var query = "SELECT * FROM products";
  connection.query(query, function(err, result) {
    if (err) throw err;
    // console.log(result);

    
    // EMPTIES THE PRODUCT LIST VALUE 
    productList = [];   

    // LOOP THROUGH RESULTS AND CREATE A PRODUCT OBJECT
    for (var i = 0; i < result.length; i++) {
    
      var productObject = {
        item_id: result[i].item_id,
        product_name: result[i].product_name,
        department: result[i].department_name,
        price: result[i].price,
        // stock_quantity: result[i].stock_quantity
      }

      //PUSH THE PRODUCT OBJECT TO THE VARIABLE
      productList.push(productObject); 
        }
      
        // DISPLAY A LIST OF PRODUCTS 
      console.table(productList); 

    // ASK THE USER WHAT THEY'D LIKE TO BUY AND HOW MANY 
    inquirer
      .prompt([
        {
          name: "whatItem",
          type: "input",
          message: "Enter the Item Number for the item you'd like to purchase!"
        },
        {
          name: "qty",
          type: "input",
          message: "How many do you want?"
        }
      ])

      .then(function(answer) {
        var item = answer.whatItem - 1;
        var itemPick = answer.whatItem;
        var qty = answer.qty;
        var total = result[item].price * qty;
        var t = total.toFixed(2); 

        // CHECK STOCK QUANTITY
        if (result[item].stock_quantity < qty) {
          console.log("\n We don't have that many in stock. Please update your quantity or select another item. \n");

          // ASK FOR ANOTHER PURCHASE 
          inquirer
            .prompt([
              {
                name: "buySomethingElse",
                message: "Want to try purchasing something else?",
                type: "confirm"
              }
            ])
            .then(function(answer) {
              // console.log(answer);
              if (answer.buySomethingElse) {
                productDisplay();
              } else {
                console.log("\n Thanks for shopping at Bamazon. Check back tomorrow for new THUNDERBOLT deals! \n");
                connection.end();
              }
            });

          // CONFIRM THEIR PURCHASE 
        } else {
          inquirer
            .prompt([
              {
                name: "enoughStock",
                message:
                  "Are you sure you want to purchase " +
                  qty +
                  " " +
                  result[item].product_name +
                  "'s for a total of " +
                  t,
                type: "confirm"
              }
            ])
            .then(function(answer) {
              if (answer.enoughStock) {
                console.log(
                  "\n GET EXCITED!! Your " +
                    qty +
                    " " +
                    result[item].product_name +
                    "'s will be delivered in 3-5 business days! \n"
                );
              } else {
                console.log("\n Ok! Maybe Next Time. \n");
              }

              // CHECK IF THEY WANT TO BUY SOMETHING ELSE 
              inquirer
                .prompt([
                  {
                    name: "buySomethingElse",
                    message: "Want to try purchasing something else?",
                    type: "confirm"
                  }
                ])
                .then(function(answer) {
                  // console.log(answer);
                  if (answer.buySomethingElse) {
                    productDisplay();
                  } else {
                    console.log("\n Thanks for shopping with Bamazon! Be sure to check back tomorrow for more THUNDERBOLT deals! \n");
                    connection.end();
                  }
                });
            });


          // CONNECT TO THE DB AND REMOVE THE NUMBER FROM THE STOCK  
          connection.query(
            "UPDATE products SET stock_quantity=? WHERE item_id=?",
            [result[item].stock_quantity - qty, itemPick],
            function(err) {
              if (err) throw err;
            }
          );

          //CONNECT TO THE DB AND ADD THE TOTAL TO PRODUCT_SALES 
          var query = "UPDATE products SET product_sales = product_sales + ? WHERE item_id = ?"
          connection.query (query, [total, itemPick], function(err, res){
            if (err) throw err; 
            // console.log("updated product sales!"); 
            // console.log (total, itemPick); 
          }
            
          )
          }
      });
  });
}
