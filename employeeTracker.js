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
function addDepartment() {
    inquirer
        .prompt({
            type: "input",
            name: "department",
            message: "Enter a department name: "
        }).then((response) => {
            connection.query("INSERT INTO department Set ?", { name: response.department}, (err, res) => {
                if (err) throw err;
                console.log("New deparment added successfully!");
                initiatePrompt();
            });
        });
};
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "Eneter the new role title: "
            },
            {
                type: "number",
                name: "salary",
                message: "Enter the salary for new role: "
            },
            {
                type: "number",
                name: "departmentID",
                message: "Enter department ID: "
            }
        ]).then((response) => {
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)", [response.title, response.salary, response.departmentID], (err, res) => {
                if (err) throw err;
                console.log("New Role successfully added!")
                initiatePrompt();
            });
        });
}
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "first",
                message: "Enter new employee's first name: "
            },
            {
                type: "input",
                name: "last",
                message: "Enter new employee's last name: "
            },
            {
                type: "number",
                name: "roleID",
                message: "What is this new employee's role ID?",
            },
            {
                type: "number",
                name: "managerID",
                message: "Who is this new employee's manager ID? ",
            },
        ]).then((response) => {
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.first, response.last, response.roleID, response.managerID],(err, res) => {
                if (err) throw err;
                console.log("New Employee added successfully!")
                initiatePrompt();
            });
        });
}
function departmentView() {
    connection.query("SELECT name FROM department",(err,res) => {
        if (err) throw err;
        console.table(res);
        initiatePrompt();
    });
}
function roleView() {
    connection.query("SELECT title FROM role",(err,res) => {
        if (err) throw err;
        console.table(res);
        initiatePrompt();
    });
}
function employeeView() {
    connection.query("SELECT * FROM employee",(err,res) => {
        if (err) throw err;
        console.table(res);
        initiatePrompt();
    });
}
function employeeByManager() {
     inquirer
        .prompt({
            type: "number",
            name: "managerID",
            message: "Enter manager's ID: "
        }).then((response)=> {
            connection.query("SELECT * FROM employee WHERE manager_id = ?", [response.managerID], (err, res) => {
                if (err) throw err;
                console.table(res);
                initiatePrompt();
            });
        });
}
function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: "number",
                name: "employeeID",
                message: "Please enter the emploee ID of the employee that you wish to update: "
            },
            {
                type: "number",
                name: "roleID",
                message: "Please enter new Role ID: "
            }
        ]).then((response) => {
            connection.query("UPDATE employee SET role_id = ? where id = ?", [response.roleID, response.employeeID], (err, res) => {
                if(err) throw err;
                console.log("Employee's role successfully updated!");
                initiatePrompt();
            });
        });
}
function updateEmployeeManager() {
    inquirer
    .prompt([
        {
            type: "number",
            name: "employeeID",
            message: "Please enter the emploee ID of the employee that you wish to update: "
        },
        {
            type: "number",
            name: "managerID",
            message: "Please enter new manager ID: "
        }
    ]).then((response) => {
        connection.query("UPDATE employee SET manager_id = ? where id = ?", [response.managerID, response.employeeID], (err, res) => {
            if(err) throw err;
            console.log("Employee's manager is successfully updated!");
            initiatePrompt();
        });
    });
}
function deleteEmployee() {
    inquirer
        .prompt({
            type: "number",
            name: "employeeID",
            message: "Enter the employeeID that you wish to remove: "
        }).then((response) => {
            connection.query("DELETE FROM employee WHERE id = ?", [response.employeeID],(err, res) => {
                if(err) throw err;
                console.log("Employee has been successfully removed!")
                initiatePrompt();
            });
        });
}
function deleteDepartment() {
    inquirer
        .prompt({
            type: "number",
            name: "departmentID",
            message: "Enter the departmentID that you wish to remove: "
        }).then((response) => {
            connection.query("DELETE FROM department WHERE id = ?", [response.departmentID],(err, res) => {
                if(err) throw err;
                console.log("Department has been successfully removed!")
                initiatePrompt();
            });
        });
}
function deleteRole() {
    inquirer
        .prompt({
            type: "number",
            name: "roleID",
            message: "Enter the roleID that you wish to remove: "
        }).then((response) => {
            connection.query("DELETE FROM role WHERE id = ?", [response.roleID],(err, res) => {
                if(err) throw err;
                console.log("Role has been successfully removed!")
                initiatePrompt();
            });
        });
}