const inquirer = require("inquirer");
const db = require("./db/connection");


// menu options
const mainMenu = () => {
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
   };
    
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

  


// WHEN I choose to add a role
const newRole = () => {
    db.query(`SELECT * FROM department`, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      const depList = data.map((department) => ({
        name: department.name,
        value: department.id,
      }));
  
      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: `Please add name of new role.`,
          },
          {
            type: "input",
            name: "salary",
            message:`Enter yearly salary for new role.`,
          },
          {
            type: "list",
            name: "role",
            message: `Enter department role will be apart of.`,
            choices: depList,
          },
        ])
        .then((data) => {
          db.query(
            `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
            [data.title, data.salary, data.role],
            (err) => {
              if (err) {
                console.log(err);
              }
              console.log(`System has been updated with new role`);
              mainMenu();
            }
          );
        });
    });
  };
  
  
  
  // WHEN I choose to add an employee
    const newEmployee = () => {
    db.query(
      `SELECT * FROM role
    JOIN employee ON employee.id = role.id`,
      (err, dbQuery) => {
        if (err) {
          console.log(err);
          return;
        }
        const roleData = dbQuery.map((role) => ({
          name: role.title,
          value: role.id,
        }));
        const managerList = dbQuery.map((employeeManager) => ({
          name: employeeManager.last_name,
          value: employeeManager.manager_id,
        }));
  
        inquirer
          .prompt([
            {
              type: "input",
              name: "firstName",
              message: `Please enter employee's first name.`,
              
            },
            {
              type: "input",
              name: "lastName",
              message: `Please enter employee's last name.`,
              
            },
            {
              type: "list",
              name: "title",
              message: `Please enter employee's title`,
              choices: roleData,
            },
            {
              type: "list",
              name: "manager",
              message: `Please select employee's manager.`,
              choices: managerList,
            },
          ])
          .then((newData) => {
            db.query(
              "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
              [newData.firstName, newData.lastName, newData.title, newData.manager],
              (err) => {
                if (err) {
                  console.log(err);
                }
                console.log("A new employee was added to the database")

                mainMenu();
              }
            );
          });
      }
    );
  };
  
  // WHEN I choose to update an employee role
   const updateEmployeeRole = () => {
    db.query(`SELECT * FROM employee;`, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      db.query(`SELECT * FROM role;`, (err, roles) => {
        if (err) {
          console.log(err);
          return;
        }
  
        const employeeList = data.map(
          (nameList) =>
            `${nameList.id}: ${nameList.first_name} ${nameList.last_name} `
        );
        const roleList = roles.map((list) => ({
          name: list.title,
          value: list.id,
        }));
        inquirer
          .prompt([
            {
              type: "list",
              name: "EmployeeUpdate",
              message:  `Which employee's role would you like to update?`,

              choices: employeeList,
            },
            {
              type: "list",
              name: "roleUpdate",
              message: chalk.yellow(`Please select new role.`),
              choices: roleList,
            },
          ])
  
          .then((updateResponse) => {
            db.query(
              `UPDATE employee SET role_id = ? WHERE id = ?`,
              [
                updateResponse.roleUpdate,
                updateResponse.EmployeeUpdate.split(": ")[0],
              ],
              (err) => {
                if (err) {
                  console.log(err);
                } else console.log(`Employee role update complete!`);
                mainMenu();
              }
            );
          });
      });
    });
  };
  
  const quit = () => {
    console.log("Application closed");

    process.exit();
  };
  
  mainMenu();
  