const db = require("./db/connection.js");
const inquirer = require("inquirer");
require("console.table");

const systemStart = function() {
    inquirer
        .prompt({
            type: "list",
            name: "systemStart",
            message: "How would you like to proceed?",
            choices: [
                "view all employees",
                "view all roles",
                "view all departments",
                "add employee",
                "add department",
                "add role",
                "update employee role",
            ]
        })
        .then(function(answer) {
            console.log(answer);

            switch(answer.systemStart) {
                case "view all employees":
                viewAllEmployees();
                break;
                
                case "view all roles":
                viewAllRoles();
                break;

                case "view all departments":
                viewAllDepartments();
                break;

                case "add employee":
                addEmployee();
                break;

                case "add department":
                addDepartment();
                break;

                case "add role":
                addRole();
                break;

                case "update employee role":
                updateEmployeeRole();
                break;
            }
        });
};

function viewAllEmployees() {
    console.log("retrieving all employee information");
    db.query("SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department on roles.department_id = department.id;", function(err, answer) {
        console.log("\n Employees retrieved \n");
        console.table(answer);
    });
    systemStart();
}

function viewAllRoles() {
    db.query("SELECT * FROM  roles", function(err, answer) {
        console.log("\n Roles Retrieved \n");
        console.table(answer);
    });
    systemStart();
}

function viewAllDepartments() {
    db.query("SELECT * FROM  department", function(err, answer) {
        console.log("\n Departments Retrieved \n");
        console.table(answer);
    });
    systemStart();
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter employee first name",
                name: "firstName",
            },
            {
                type: "input",
                message: "Enter employee last name",
                name: "lastName",
            }
        ])
        .then(function(answer) {
            db.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: null,
                    manager_id: null
                },
                function(err , answer) {
                    if(err) {
                        throw err;
                    }
                    console.table(answer);
                }
            );
            systemStart();
        });
};


function updateEmployeeRole() {
    var allEmployees = [];
    db.query("SELECT * FROM employee", function(err, answer) {
        for (var i = 0; i < answer.length; i++) {
            var allEmployeeString =
            answer[i] = " " + answer[i].first_name + " " + answer[i].last_name;
            allEmployeeString.push(allEmployeeString);
        }

    inquirer
        .prompt([
            {
                type: "list",
                name: "updateEmployeeRole",
                message: "Please select employee to update role",
                choices: allEmployees
            },
            {
                type:"list",
                message: "Select new role",
                choices: ["manager","employee"],
                name: "newRole"
            }
        ])
        .then(function(answer) {
            console.log("update", answer);
            const idToUpdate = {};
            idToUpdate.employeeId = parseInt(answer.updateEmployeeRole.split(" ")[0]);
            if (answer.newRole === "manager") {
                idToUpdate.role_id = 1;
            } else if (answer.newRole ==="employee") {
                idToUpdate.role_id = 2;
            }
            db.query(
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [idToUpdate.role_id, idToUpdate.employeeId],
                function(err, data) {
                    systemStart();
                }
            );
        });
    });
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                messgae: "Enter department name",
                name: "department"
            }
        ])
        .then(function(answer) {
            db.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.department
                },
                function(err, answer) {
                    if(err) {
                        throw err;
                    }
                }
            ),
            console.table(answer);
            systemStart();
        });
}

function addRole() {
    db.query("SELECT * FROM department", (err, res) => {
        const RoleInfoArr = []
        for(let i = 0; i< res.length; i++) {
            const newRole = {
                name: res[1].name,
                value: res[1].id
            }
            RoleInfoArr.push(newRole)
        }
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Please chose your role",
                    name: "roleTitle"
                },
                {
                    type: "input",
                    message: "Please choose salary corresponding to your role",
                    name: "roleSalary"
                },
                {
                    type: "list",
                    message: "What is the department your role is in",
                    name: "roleDepartment",
                    choices: RoleInfoArr
                }
            ])
            .then((res) => {
                db.query(
                    "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
                    [res.roleTitle, res.roleSalary, res.roleDepartment],
                    (err, res) => {
                        console.log("Role added to database.")
                        systemStart();
                    })
            })
    })
}

systemStart();