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
    //Check user choice
    checkChoice(type){
      switch(type){
         case 'View all departments':
         this.viewAllDepartments();
         break;
         case 'View all roles':
          this.viewAllRoles()
          break;
          case 'View all employees':
             this.viewAllEmployees()
          break;
          case 'Add a department':
             this.addDepartment()
          break;
          case 'Add a role':
              this.addRole()
          break;
          case 'Add an employee':
             this.addEmployee()
          break;
          case 'Update an employee role':
          this.updateEmployeeRole()
          break;
          case 'Update employee manager':
            this.updateEmployeeManager()
            break;
            case 'View employee by manager':
            this.viewEmployeeByManager()
            break;
            case 'View employee by department':
               this.viewEmployeesByDepartment()
               break;
            case 'Delete tables records':
               this.deleteTablesRecords()
               break;
            case 'Total budget of a department':
               this.totalBudgetOfDepartment()
               break;
      }
    } 
   
 //View all departments
 viewAllDepartments(){
   con.promise().query('SELECT departments.id,departments.name FROM departments').then( ([rows,fields]) => {
      console.table(cTable.getTable(rows))
     }).then(()=>{ this.userChoice()}).catch(console.log);
   }
   //Vew all roles
   viewAllRoles(){
      con.promise().query('SELECT roles.id,roles.title,roles.salary,departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id=departments.id').then( ([rows,fields]) => {
         //  console.table(rows);
          console.table(cTable.getTable(rows))
        }).then(()=>{ this.userChoice()}).catch(console.log);
  
      }
        
      // checkDeapartmentExsistance(name){
      //    if(name==="Sales"){
      //       console.log("exsist")
      //    }
      // }
      //View all employees
      viewAllEmployees(){
         con.promise().query("SELECT employee.id,employee.first_name,employee.last_name,roles.title,departments.name AS departments,roles.salary, concat(mgr.first_name,' ',mgr.last_name) AS Manager FROM employee LEFT JOIN roles ON employee.role_id=roles.id LEFT JOIN departments ON roles.department_id=departments.id  LEFT JOIN employee mgr ON employee.manager_id=mgr.id").then( ([rows,fields]) => {
         console.table(cTable.getTable(rows))}).then(()=>{this.userChoice()}).catch(console.log);
         }
   
         //Add department
         addDepartment(){
            inquirer.prompt([{
               type:"input",
               name:"name",
               message:"Please insert department name",
               validate: function (input) {return (input? true :false)}
            }]).then(({name})=>{
               // let checkDepartment= this.checkDeapartmentExsistance(name);
               // if(checkDepartment){
               //    return;
               // }
               con.promise().query('INSERT INTO departments(name) VALUES(?)',[name])
               .then( ([rows,fields]) => {
               console.log("Department succesfully added!!".green)
               }).then(()=>{this.userChoice()}).catch(console.log)
            }).catch((error) => {
               throw error;
             });
         } 
    
    
    
    
    
    
    
    
    
   
   
   
 }
 