var mysql = require("mysql");
var inquirer = require("inquirer");
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
  // console.log("you're a supervisor!")
});

start();

function start() {
  //console.log( );

  inquirer
    .prompt([
      {
        name: "supervisor",
        type: "list",
        message: "Hello, supervisor! What would you like to do? \n",
        choices: ["Check Product Sales by Department", "Add a New Department"]
      }
    ])

    .then(function(ans) {
      var answer = ans.supervisor;

      switch (answer) {
        case "Check Product Sales by Department":
          // console.log("sales");
          totalProfits();
          break;
        case "Add a New Department":
          //   console.log("new department");
          newDept();
          break;
      }
    });
}

function totalProfits() {
  // console.log("hello i am total profits");
  // var query = "SELECT departments.dept_id, departments.dept_name, departments.over_head_cost, products.product_sales" +
  // "FROM products" +
  // "INNER JOIN departments ON products.department_name=departments.dept_name";
  var query = `
    SELECT departments.dept_id, departments.department_name, MAX(departments.over_head_cost) AS over_head_cost, SUM(products.product_sales) AS product_sales 
    FROM products 
    INNER JOIN departments ON products.department_name=departments.department_name 
    GROUP BY dept_id, departments.department_name; 
    `;

  connection.query(query, function(err, res) {
    if (err) throw err;
    // console.log(res);
    var data = [];


    for (var i = 0; i < res.length; i++) {
      var deptData = {
        dept_id: res[i].dept_id,
        department_name: res[i].department_name,
        over_head_cost: res[i].over_head_cost,
        product_sales: res[i].product_sales,
        total_profit: (res[i].product_sales - res[i].over_head_cost).toFixed(2)
      };
      data.push(deptData);
    }
    console.table(data);

    inquirer
      .prompt([
        {
          name: "somethingElse",
          type: "confirm",
          message: "Would you like to do anything else today?"
        }
      ])
      .then(function(ans) {
        if (ans.somethingElse) {
          start();
        } else {
          connectionEnd();
        }
      });
  });
}

function newDept() {
  console.log("new dept");
  inquirer
    .prompt([
      {
        name: "newDeptName",
        type: "input",
        message: "What is the name of the department you want to add?"
      },
      {
        name: "overhead",
        type: "input",
        message: "What are the Overhead Costs for the Department?"
      }
    ])
    .then(function(ans) {
      var dept = ans.newDeptName;
      var oh = ans.overhead;

      console.log(dept);
      console.log(oh);

      var query =
        "INSERT INTO departments (department_name, over_head_cost) VALUES (? , ?)";

      connection.query(query, [dept, oh], function(err, res) {
        if (err) throw err;
        // console.log("New department, " + dept + ", added!");
      });
      inquirer
        .prompt([
          {
            name: "somethingElse",
            type: "confirm",
            message: "Would you like to do anything else today?"
          }
        ])
        .then(function(ans) {
          if (ans.somethingElse) {
            start();
          } else {
            connectionEnd();
          }
        });
    });
}

function connectionEnd() {
  console.log("\n Have a great day!! \n");
  connection.end();
}
