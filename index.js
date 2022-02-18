const inquirer = require("inquirer");

const db = require("./db/connection");


// menu options

  inquirer
    .prompt({
      type: "list",
      name: "menuLIst",
      message: (`Please make a selection from below menu.`),
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Update An Employee Role",
        "Quit",
      ],
    })
    .then((selection) => {

      switch (selection.menuLIst) {
        case "View All Departments":
          queryDepartments();
          break;
        case "View All Roles":
          queryRoles();
          break;
        case "View All Employees":
          queryEmployees();
          break;
        case "Add A Department":
          newDepartment();
          break;
        case "Add A Role":
          newRole();
          break;
        case "Add An Employee":
          newEmployee();
          break;
        case "Update An Employee Role":
          updateEmployeeRole();
          break;
        case "Quit":
          quit();
          break;
        default:
          console.log("Main Menu");
      }
    });


