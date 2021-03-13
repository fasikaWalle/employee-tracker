const inquirer=require('inquirer');
const mysql = require('mysql2');

const cTable = require('console.table');
const figlet = require('figlet');
const colors=require('colors');

//Connect the database
const con = mysql.createConnection(
   {host:'localhost', user: 'root',password:'root', database: 'employees'}
 );
 console.log((figlet.textSync('Employee Tracker',{horizontallayout:'full'})).bold);
 class employees {
   userChoice(){
      inquirer.prompt([
         {
          type:"list",
          name:"type",
          message:"what would you like to do?".yellow,
          choices:["View all departments","View all roles","View all employees","Add a department","Add a role","Add an employee","Update an employee role","Update employee manager","View employee by manager","View employee by department","Delete tables records","Total budget of a department"]
         }   
      ]).then(({type})=>{
         this.checkChoice(type)
      }).catch((error) => {
         throw error;
       });
   };
   
   
   
   
   
   
 }
 