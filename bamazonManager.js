var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');

var program = require('commander');

var products = [];


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;

    start();
});


function start() {
    inquirer
        .prompt(
            {
                type: "list",
                name: "optionsType",
                message: "Choose operation Type",
                choices: [
                    {name: "View All Products for Sale", value: 1},
                    {name: "View Low Inventory Products", value: 2},
                    new inquirer.Separator(),
                    {name: "Add to Inventory", value: 3},
                    {name: "Add New Product", value: 4},
                    new inquirer.Separator(),
                    {name: "Quit", value: 5}]

            }
        ).then(function (answer) {
        switch (answer.optionsType) {
            case 1:
                getAllAvailableProducts();

                break;
            case 2:
                getLowInventoryProducts();

                break;
            case 3:
                addInventory();
                break;
            case 4:
                addProduct();
                break;
            case 5:
                console.log(answer);
                process.exit(0);
                break;

        }
        });

}

function getAllAvailableProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.log(cTable.getTable(res));
        goMainMenu();
    });
}

function goMainMenu() {
    inquirer
        .prompt([
            {
                name: "continue",
                type: "list",
                message: "Would you like to continue ?",
                choices: [{name: "Yes", value: "y"}, {name: "No", value: "n"}]
            }

        ])
        .then(function (answer) {
            switch (answer.continue) {
                case "y":
                    start();

                    break;
                case "n":
                    process.exit(0);
            }

        });
}

function getLowInventoryProducts() {
    connection.query("SELECT * FROM products  where Stock_quantity < 5", function (err, res) {
        if (err) throw err;

        console.log(cTable.getTable(res));

        goMainMenu();

    });
}

function addInventory() {
    var questions = [
        {
            name: "Item_id",
            type: "list",
            message: "Choose product to increase inventory",
            choices: []

        },
        {
            message: "Add inventory for the product : ",
            type: "input",
            name: "Stock_quantity"
        }];

    connection.query("SELECT * FROM products  where Stock_quantity < 5", function (err, res) {
        if (err) throw err;
        res.forEach(function (prd1) {
          questions[0]["choices"].push({
                name: prd1.Item_id + " : " + prd1.Product_name,
                value: prd1.Item_id
            });

        });
        inquirer
            .prompt(questions)
            .then(function (answer) {
                connection.query(
                    "Update  products Set ? where ?", [
                        {
                            Stock_quantity: answer.Stock_quantity
                        },
                        {
                            Item_id: answer.Item_id
                        }
                    ], function (err, res) {
                        if (err) throw err;
                    })
                ;

                goMainMenu();
            });   //     console.log(questions);


    });
}

function addProduct(){
    var questions = [
        {
            name: "Item_id",
            type: "input",
            message: "Enter product id : ",


        },
        {
            message: "Enter Product Name: ",
            type: "input",
            name: "Product_name"
        },
        {
            message: "Enter Department Name : ",
            type: "input",
            name: "Department_name"
        },
        {
            message: "Product Price : ",
            type: "input",
            name: "Price"
        },  {
            message: "Enter product stock : ",
            type: "input",
            name: "Stock_quantity"
        }

    ];

    inquirer
        .prompt(questions)
        .then(function (answer) {
            connection.query(
                "INSERT INTO  products SET ? ",
                    {
                        Item_id: answer.Item_id,
                        Product_name: answer.Product_name,
                        Department_name: answer.Department_name,
                        Price: answer.Price,
                        Stock_quantity: answer.Stock_quantity
                    }
                , function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " product inserted!\n");
                })
            ;

            goMainMenu();
        });

}

