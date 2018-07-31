var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');


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
                    {name: "View Product Sales By Department", value: 1},
                    {name: "Add New Department", value: 2},
                    new inquirer.Separator(),
                    {name: "Quit", value: 3}]

            }
        ).then(function (answer) {
        switch (answer.optionsType) {
            case 1:
                getProductSalesByDepartment();

                break;
            case 2:
                addDepartment();

                break;
            case 3:
                console.log(answer);
                process.exit(0);
                break;

        }
    });

}

function getProductSalesByDepartment() {
    connection.query("SELECT d.Department_id, d.Department_name, sum(p.product_sales) as product_sales, d.overhead_costs FROM products p RIGHT JOIN departments d on d.Department_name = p.department_name group  by department_name", function (err, res) {
        if (err) throw err;
        res.forEach(function (department) {

            department["total_profit"] = department.product_sales - department.overhead_costs;
        });
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


function addDepartment() {
    var questions = [
        {
            name: "Department_id",
            type: "input",
            message: "Enter Department id : ",
        },
        {
            message: "Enter Department Name : ",
            type: "input",
            name: "Department_name"
        },
        {
            message: "Overhead Costs : ",
            type: "input",
            name: "overhead_costs"
        }

    ];

    inquirer
        .prompt(questions)
        .then(function (answer) {
            connection.query(
                "INSERT INTO  departments SET ? ",
                {
                    Department_id: answer.Department_id,
                    Department_name: answer.Department_name,
                    overhead_costs: answer.overhead_costs
                }
                , function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " Department inserted!\n");
                })
            ;

            goMainMenu();
        });

}

