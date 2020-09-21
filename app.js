const fs = require("fs");
const path = require("path");
const inquirer = require('inquirer');
const Manager= require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "/team.html");
const render = require("./lib/htmlRenderer");

const teamAll = [];
// Manger Info
ManagerInfo();
  function ManagerInfo() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the full name of the team manager?",
          name: "name"
        },
        {
          type: "input",
          message: "What is the manager's id?",
          name: "id"
        },
        {
          type: "input",
          message: "What is the manager's email?",
          name: "email"
        },
        {
          type: "input",
          message: "What is the manager's office number?",
          name: "officeNumber"
        }
      ]).then(function(response) {
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber)
        teamAll.push(manager);
        newRole()
      });
  };
//Engineer Info
  function EngineerInfo() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the engineer's Name?",
          name: "name"
        },
        {
          type: "input",
          message: "What is the engineer's id?",
          name: "id"
        },
        {
          type: "input",
          message: "What is the engineer's email?",
          name: "email"
        },
        {
          type: "input",
          message: "What is the engineer's GitHub username?",
          name: "username"
        }
      ]).then(function(response) {
        const engineer = new Engineer(response.name, response.id, response.email, response.username)
        teamAll.push(engineer);
        newRole()
      });
  };
// Intern Info Prompt
  function InternInfo() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the intern's Name?",
          name: "name"
        },
        {
          type: "input",
          message: "What is the intern's id?",
          name: "id"
        },
        {
          type: "input",
          message: "What is the intern's email?",
          name: "email"
        },
        {
          type: "input",
          message: "What is the intern's school name?",
          name: "school"
        }
      ]).then(function(response) {
        const intern = new Intern (response.name, response.id, response.email, response.school)
        teamAll.push(intern);
        newRole()
      });
  };

  function newRole() {
      inquirer.prompt(
        {
          type: 'list',
          name: 'role',
          message: 'Would you like to add a Engineer or Intern?',
          choices: [
            'Engineer?',
            'Intern?',
            'No, I am done adding teammembers.',
          ]
        }
        ).then(function (response) {
          if (response.role === 'Engineer?') {
            EngineerInfo()
          } 
          if (response.role === 'Manager?') {
            ManagerInfo()
          } 
          else if (response.role === 'Intern?') {
            InternInfo()
          }
          else if (response.role === 'No, I am done adding employees.') {
            // init();
          }
        })        
    
        fs.writeFile("output/team.html", render(teamAll), function(err) {
          if (err) {
            return console.log("The file did not write")
          }
    });
};
    