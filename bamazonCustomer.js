var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');

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
    console.log("connected as id " + connection.threadId);
    afterConnection();
});


function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        start();
        //connection.end();
    });
}

function start() {
    // prompt for info about the item being put up for auction
    inquirer
        .prompt([
            {
                name: "product_Id",
                type: "input",
                message: "What is the item you would like to buy?"
            },
            {
                name: "product_Qty",
                type: "input",
                message: "How many of them would you like to buy?"
            }

        ])
        .then(function (answer) {

            //Find if the product is in stock(If the stock goes below zero return "Insufficient Qty")

            //Update the table with remaining qty

            //Log the total price


            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "Select Stock_quantity, Price, product_sales from products where ?", [
                    {
                        Item_id: answer.product_Id
                    }
                ], function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    if (res[0].Stock_quantity < answer.product_Qty) {
                        console.log("Insufficient Quantity for given Product - " + answer.product_Id);
                        afterConnection();
                    }
                    else {
                        addToCart(answer.product_Id, answer.product_Qty, res[0].Stock_quantity,res[0].product_sales, res[0].Price);
                    }
                })
            ;
        });
}

function update(product_Id, product_Qty, Stock_quantity, product_sales) {

    Stock_quantity = Stock_quantity - product_Qty;

    connection.query(
        "Update  products Set ?,? where ?", [
            {
                Stock_quantity: Stock_quantity
            },
            {
                product_sales: product_sales
            },

            {
                Item_id: product_Id
            }
        ], function (err, res) {
            if (err) throw err;
         //   console.log("Your total cost for this Order is : " + (product_Qty * Price));

        })
    ;
}

function addToCart(product_Id, product_Qty, Stock_quantity, product_sales, Price) {

    var prd = {
        id:product_Id,
        qty:product_Qty,
        stkQty:Stock_quantity,
        product_sales: product_sales + (Price * product_Qty),
        price:Price,
        totalPrice: (Price * product_Qty)
    };

    products.push(prd);
    inquirer
        .prompt([
            {
                name: "continueShopping",
                type: "input",
                message: "Continue Shopping ?(y/Y) "
            }

        ])
        .then(function (answer) {
            if (answer.continueShopping === "y" || answer.continueShopping === "Y") {
                afterConnection();
            }
            else {

                var totalPrice = 0;


                products.forEach(function(prd) {

                    totalPrice = totalPrice + prd.totalPrice;
                    update(prd.id, prd.qty, prd.stkQty, prd.totalPrice, prd.product_sales);

                });
                console.log(cTable.getTable("Order Details ", products));
                console.log("Order Total : " + totalPrice);
                process.exit(0);
            }


        })

}