var mysql = require("mysql");
var inquirer = require("inquirer");

//create sql connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "ota4eva@sql",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
});

var productList = [];
var itemID = 0;

productDisplay();

function productDisplay() {
  var query = "SELECT * FROM products";
  connection.query(query, function (err, result) {
    if (err) throw err;


    console.log("Here are Today's Game of Thrones Collectibles Deals");
   

    //Empties the productList Array
    productList = [];

    //loops thruogh the result and creates the product object
    for (var i = 0; i < result.length; i++) {

      var productObject = {
        item_id: result[i].item_id,
        product_name: result[i].product_name,
        department: result[i].department_name,
        price: result[i].price,
      }
      productList.push(productObject);
    }

    console.table(productList);

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

      .then(function (answer) {
        var item = answer.whatItem - 1;
        var itemPick = answer.whatItem;
        var qty = answer.qty;
        var total = result[item].price * qty;
        var t = total.toFixed(2);

        if (result[item].stock_quantity < qty) {
          console.log("\n We don't have that many in stock. Please update your quantity or select another item. \n");

          inquirer
            .prompt([
              {
                name: "buySomethingElse",
                message: "Want to try purchasing something else?",
                type: "confirm"
              }
            ])
            .then(function (answer) {
              if (answer.buySomethingElse) {
                productDisplay();
              } else {
                console.log("\n Thanks for shopping at Bamazon. Check back tomorrow for new THUNDERBOLT deals! \n");
                connection.end();
              }
            });

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
            .then(function (answer) {
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

              inquirer
                .prompt([
                  {
                    name: "buySomethingElse",
                    message: "Want to try purchasing something else?",
                    type: "confirm"
                  }
                ])
                .then(function (answer) {
                  if (answer.buySomethingElse) {
                    productDisplay();
                  } else {
                    console.log("\n Thanks for shopping with Bamazon! Be sure to check back tomorrow for more THUNDERBOLT deals! \n");
                    //connection.end();
                  }
                });
            });

          connection.query(
            "UPDATE products SET stock_quantity=? WHERE item_id=?",
            [result[item].stock_quantity - qty, itemPick],
            function (err) {
              if (err) throw err;
            }
          );
          var query = "UPDATE products SET product_sales = product_sales + ? WHERE item_id = ?"
          connection.query(query, [total, itemPick], function (err, res) {
            if (err) throw err;
           
          }

          )
        }
      });
  });
}
