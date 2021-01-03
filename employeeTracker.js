const mysql = require("mysql");
const inquirer = require("inquirer");
const util = require("util");
const consoleTable = require("console.table");
const logo = require("asciiart-logo");
const config = require("./package.json");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Alpine1036!",
  database: "employeesDB",
});
connection.query = util.promisify(connection.query);
connection.connect(function (err) {
  if (err) throw err;
  runEmployeeTracker();
});

function runEmployeeTracker() {
  console.log(
    logo({
      name: "Employee Tracker",
      font: "Speed",
      lineChars: 10,
      padding: 2,
      margin: 3,
      borderColor: "yellow",
      logoColor: "bold-yellow",
      textColor: "yellow",
    })
      .emptyLine()
      .right("version 3.7.123")
      .render()
  );
  initiatePrompt();
}
function initiatePrompt() {
  inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Add a Department",
            "Add a Role",
            "Add Empolyee",
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "View Employees By Department",
            "View Employees By Manager",
            "Update Employee Role",
            "Update Employee Manager",
            "Delete Employee",
            "Delete Department",
            "Delet Role",
            "Exit"
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
            case "Add a Department":
                addDepartment();
                break;
            case "Add a Role":
                addRole();
                break;
            case "Add Empolyee":
                addEmployee();
                break;
            case "View All Departments":
                departmentView();
                break;
            case "View All Roles":
                roleView();
                break;
            case "View All Employees":
                employeeView();
                break;
            case "View Employees By Department":
                employeeByDepart();
                break;
            case "View Employees By Manager":
                employeeByManager();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
            case "Delete Employee":
                deleteEmployee();
                break;
            case "Delete Department":
                deleteDepartment();
                break;
            case "Delet Role":
                deleteRole();
                break;
            case "Exit":
                connection.end();
                console.log("Thank you for using the Employee Tracker. Good Bye!")
        }
    })
};
