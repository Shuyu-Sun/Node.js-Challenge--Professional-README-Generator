// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');
const util = require('util');
const license = ['None', 'MIT', 'BSD', 'GPL', 'Apache']

// TODO: Create an array of questions for user input
const questions = [
    // Project name
    {type: 'input',
    name: 'title',
    message: 'What is the title of your repository? (Required)',
    validate: titleInput => {
        if (titleInput) {
          return true;
        } else {
          console.log('Please enter your repository title.');
          return false;
        }
      }
    },
    // Description of project
    {type: 'input',
        name: 'description',
        message: 'What is the description of your repository? (Required)',
        validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log('Please enter a description of the repository.');
            return false;
          }
        }
        },
    // Installation Instructions
    {type: 'input',
    name: 'installation',
    message: 'Please list installation instructions.(Required)',
        validate: installationInput => {
        if (installationInput) {
            return true;
        } else {
            console.log('You need to provide installation info to continue!');
            return false;
            }
        }
    },
    // Usage Information
    {type: 'confirm',
    name: 'confirmUsage',
    message: 'Would you like to give instructions for using your application?'
    },
        { //if confirmed
            type: 'input',
            name: 'instructions',
            message: 'Please list instructions for using your application. It is recommended to add descriptive images later as well.',
            when: ({ confirmUsage }) => {
                if (confirmUsage) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        
    // Contribution
    {type: 'confirm',
    name: 'confirmContribution',
    message: 'May other developers contribute to your repository?'
    },
        {
            type: 'input',
            name: 'contribution',
            message: 'Please explain how other developers may contribute to your project.',
                when: ({ confirmContribution }) => {
                  if (confirmContribution) {
                    return true;
                  } else {
                    return false;
                  }
                }
        },
    // Test Instructions
        {
            type: 'confirm',
            name: 'testConfirm',
            message: 'Is testing available?'
        },
            {
                type: 'input',
                name: 'testing',
                message: 'Please explain how users may test your application.',
                when: ({ testConfirm }) => {
                  if (testConfirm) {
                    return true;
                  } else {
                    return false;
                  }
                }
            },
    //checkbox that allows license choice
        {
            type: 'checkbox',
            name: 'license',
            message: 'Please choose a license.',
            choices: ['Apache', 'MIT', 'BSD', 'GPL', 'None'],
                validate: licensingInput => {
                  if (licensingInput) {
                    return true;
                  } else {
                    console.log('Please select a license.');
                    return false;
                  }
                }
              },

    // Github Username
        {type: 'input',
        name: 'github',
        message: 'What is your GitHub username? (Required)',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub username.');
                    return false;
                }
            }
        },

    // Email Address
        {
            type: 'input',
            name: 'email',
            message: 'What is your email address? (Required)',
                validate: emailInput => {
                  if (emailInput) {
                    return true;
                  } else {
                    console.log('Please enter your email.');
                    return false;
                  }
                }
              },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err)
            throw err;
        console.log('Success! Information transferred to the README!')
    });
};

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
    .then(function (userInput) {
        console.log(userInput)
        writeToFile("README.md", generateMarkdown(userInput));
    });
};

// Function call to initialize app
init();
