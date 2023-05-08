const inquirer = require("inquirer");
const mysql = require("mysql2");
const cfonts = require('cfonts');
require("console.table")


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root_root",
    database: "employee_tracker"
})

function mainMenu() {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                "view all departments",
                "view all roles",
                "view all employees",
                "add a department",
                "add a role",
                "add an employee",
                "update an employee role"
            ]
        }
    ])
        .then(answer => {
            if (answer.action == "view all departments") {
                viewAllDepartments()
            }
            if (answer.action == "view all roles") {
                viewAllRoles()
            }
            if (answer.action == "view all employees") {
                viewAllEmployees()
            }
            if (answer.action == "add a department") {
                createDepartment()
            }
            if (answer.action == "add a role") {
                createRole()
            }
            if (answer.action == "add an employee") {
                createEmployee()
            }
            if (answer.action == "update an employee role") {
                updateEmployeeRole()
            }
        })
}


function viewAllDepartments() {
    // show all departments
    db.query("SELECT * FROM department", (err, data) => {
        if (err) console.log(err)

        console.table(data)
        mainMenu()
    })
}

function viewAllRoles() {
    // show all roles
    db.query("SELECT * FROM role", (err, data) => {
        if (err) console.log(err)

        console.table(data)
        mainMenu()
    })
}

function viewAllEmployees() {
    // show all employees
    db.query("SELECT * FROM employee", (err, data) => {
        if (err) console.log(err)

        console.table(data)
        mainMenu()
    })
}

function createDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "department_name",
            message: "What is the name of the new department?"
        }
    ])
        .then(answers => {
            db.query("INSERT INTO department (name) VALUES (?);", [answers.department_name], (err, data) => {
                if (err) console.log(err)

                console.log("Department has been added!")
                mainMenu()
            })
        })

}

function createRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of the new role?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the new role?",
        },
        {
            type: "input",
            name: "department_id",
            message: "What is the department_id number of the new role?",
        },
    ])
        .then(answers => {
            db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);",
                [answers.title, answers.salary, answers.department_id], (err, data) => {
                    if (err) console.log(err)

                    console.log("Role has been added!")
                    mainMenu()
                })
        })
}

function createEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the first name of the new employee?",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the last name of the new employee?",
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the role_id number of the new employee?",
        },
        {
            type: "input",
            name: "manager_id",
            message: "What is the manager_id number of the new employee?",
        },
    ])
        .then(answers => {
            db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id ) VALUES (?, ?, ?, NULL);",
                [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], (err, data) => {
                    if (err) console.log(err)

                    console.log("Employee has been added!")
                    mainMenu()
                })
        })
}

function updateEmployeeRole() {
    const employees = [
        { first_name: "Mary", last_name: "Smith", role_id: 3 },
        { first_name: "John", last_name: "Smith", role_id: 4 },
        { first_name: "Mike", last_name: "Chan", role_id: 1 },
    ];

    inquirer.prompt([
        {
            type: "list",
            name: "employee_role",
            message: "Select the employee to update?",
            choices: resEmplyees.map((employee) => {
                employees.map(getEmployeeRole);
                function getEmployeeRole(employee) {
                    return [employee.first_name, employee.last_name, employee.role_id].join("");
                }
            }),
            //
        },
        {
            type: "input",
            name: "new_role",
            message: "Enter the name of the employee's new role."
        },
    ])
}
// db.query("UPDATE employee SET employee.role,REPLACE () WHERE  ) employee.last_name, employee.role_id FROM employee WHERE",
//     [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], (err, data) => {
//         if (err) console.log(err)

//         console.log("Employee has been added!")
//         mainMenu()
//     }


mainMenu()