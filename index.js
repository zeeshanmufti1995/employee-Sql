const inquirer = require("inquirer");
const db = require("./db/connection");


// menu options
// const mainMenu = () => {
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
//   };
    
    const queryDepartments = () => {
        const sql = `SELECT *
        FROM department
        `;
      
        db.query(sql, (err, res) => {
          if (err) {
            console.log(err);
            return;
          }
          console.table(res);
          mainMenu();
        });
      };
      
// WHEN I choose to view all departments
const queryRoles = () => {
    const sql = `SELECT title, salary, department.name
    FROM role
    JOIN department
    ON department_id = department.id;
    `;
  
    db.query(sql, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      console.table(res);
      mainMenu();
    });
  };
  
  // WHEN I choose to view all roles
  const queryRoles = () => {
    const sql = `SELECT title, salary, department.name
    FROM role
    JOIN department
    ON department_id = department.id;
    `;
  
    db.query(sql, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      console.table(res);
      mainMenu();
    });
  };
  // WHEN I choose to view all employees
const queryEmployees = () => {
    const sql = `SELECT employee.id, first_name, last_name, role.title, role.salary, department.name AS department, manager_id AS manager FROM employee 
    JOIN role ON role.id = employee.role_id
    JOIN department ON department.id = role.department_id;
    `;
  
    db.query(sql, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      console.table(res);
      mainMenu();
    });
  };
  const newDepartment = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "department",
          message: (`Please provide new department name.`),
        },
      ])
      .then((data) => {
        db.query(
          `INSERT INTO department (name) VALUES (?)`,
          data.department,
          (err) => {
            if (err) {
              console.log(err);
            }
            console.log(`System has been updated with new department.`)
    
            mainMenu();
          }
        );
      });
  };

  const newDepartment = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "department",
          message: `Please provide new department name.`,
        },
      ])
      .then((data) => {
        db.query(
          `INSERT INTO department (name) VALUES (?)`,
          data.department,
          (err) => {
            if (err) {
              console.log(err);
            }
            console.log(
              chalk.red(`System has been updated with new department.`)
            );
            mainMenu();
          }
        );
      });
  };