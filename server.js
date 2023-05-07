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
                "and update an employee role"
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
            if (answer.action ==  "add a role") {
                createRole()
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
            message: " What is the title of the new role?",
        },
        {
            type: "input",
            name: "salary",
            message: " What is the salary of the new role?",
        },
        {
            type: "input",
            name: "department_id",
            message: " What is the department_id number of the new role?",
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



mainMenu()