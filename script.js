const inquirer=require('inquirer');
const mysql = require('mysql2');

const cTable = require('console.table');
const figlet = require('figlet');
const colors=require('colors');
const emoji = require('node-emoji');

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
      if(rows.length===0){
         console.log("Oops there is no data to display" + emoji.get('cry'))
         }else{console.table(cTable.getTable(rows))}
     }).then(()=>{ this.userChoice()}).catch(console.log);
   }
   //Vew all roles
   viewAllRoles(){
      con.promise().query('SELECT roles.id,roles.title,roles.salary,departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id=departments.id').then( ([rows,fields]) => {
         //  console.table(rows);
         if(rows.length===0){
            console.log("Oops there is no data to display" + emoji.get('cry'))
            }else{console.table(cTable.getTable(rows))}
        }).then(()=>{ this.userChoice()}).catch(console.log);
  
      }
      //View all employees
      viewAllEmployees(){
         con.promise().query("SELECT employee.id,employee.first_name,employee.last_name,roles.title,departments.name AS departments,roles.salary, concat(mgr.first_name,' ',mgr.last_name) AS Manager FROM employee LEFT JOIN roles ON employee.role_id=roles.id LEFT JOIN departments ON roles.department_id=departments.id  LEFT JOIN employee mgr ON employee.manager_id=mgr.id").then( ([rows,fields]) => {
            if(rows.length===0){
            console.log("Oops there is no data to display" + emoji.get('cry'))
            }else{console.table(cTable.getTable(rows)) }
         }).then(()=>{this.userChoice()}).catch(console.log);
         }
   
         //Add department
               addDepartment(){
              inquirer.prompt([{
               type:"input",
               name:"name",
               message:"Please insert department name",
               validate: function (input) {return (input? true :false)}
            }]).then(({name})=>{
               let count= 0;
               con.promise().query('SELECT departments.name FROM departments').then(([rows,fields]) => {
                  rows.map(list=>{
                  if(list.name.toLowerCase()===name.toLowerCase()){count++}})
                  if(count>0){console.log("Department already exist".red)
                     this.userChoice()
                  }else{
                     con.promise().query('INSERT INTO departments(name) VALUES(?)',[name])
                     .then( ([rows,fields]) => {
                     console.log("Department succesfully added!!".green)
                     }).then(()=>{this.userChoice()}).catch(console.log)
                    }
            }).catch(console.log)
            }).catch((error) => {
               throw error;
             });
         } 
        //Add role
        addRole(){
         let departments=[]
         con.promise().query('SELECT departments.name AS department FROM departments').then( ([rows,fields]) => {
         rows.map((data)=>{departments.push(data.department)})
         if(!departments.length){
            console.log("Please enter a department first".red)
            this.userChoice()
            return;
         }
         inquirer.prompt([{
            type:"input",
            name:"name",
            message:"Please insert title",
            validate:function (input) {return (input? true :false)}
         },
         {
            type:"number",
            name:"salary",
            message:"Please insert salary",
            validate:function (input) {return (input? true :false)}
         },
         {
            type:"list",
            name:"department",
            message:"Please select department name",
            choices:departments
         }]).then(({name,salary,department})=>{
            let count = 0;
            let departmentId;
            con.promise().query('SELECT roles.title FROM roles').then(([rows,fields]) => {
               rows.map(list=>{
               if(list.title.toLowerCase()===name.toLowerCase()){count++}})
               if(count>0){console.log("Role already exist".red)
               this.userChoice()
               }else{
            con.promise().query('SELECT id FROM departments WHERE name =?',[department]).then(([rows,fields]) => {
            departmentId=rows[0].id;
             con.promise().query(`INSERT INTO roles(title,salary,department_id) VALUES(?,?,?)`,[name,salary,departmentId])
              .then( ([rows,fields]) => { 
               console.log("Role succesfully added!!".green)
              }).then(()=>{this.userChoice()}).catch(console.log) 
            }).catch(console.log)
                 }
         }).catch(console.log)
    
         }).catch((error) => {
            throw error});
         }).catch(console.log);
      }  
      //check the role if it is already in database 
      checkRoleTitle(name){
         let count=0;
         con.promise().query("SELECT roles.title FROM roles").then( ([rows,fields]) => {
         let roleTitle=[]
         rows.map(role=>{roleTitle.push(role.title)})
         roleTitle.map(role=>{ if(role===name){count++}})
          if(count>0){console.log("true")}
         }).catch(console.log)      
      }
  //Add an employee
  addEmployee(){
   con.promise().query('SELECT roles.title AS roles FROM roles').then( ([rows,fields]) => {
      let role=[]
      rows.map((data)=>{role.push(data.roles)})
     con.promise().query("SELECT  concat(employee.first_name,' ',employee.last_name) AS name FROM employee").then( ([rows,fields]) => {
        let managers=["none"]
      rows.map((data)=>{managers.push(data.name)})

      inquirer.prompt([{
         type:"input",
         name:"firstName",
         message:"Please insert first name",
         validate: function (input) {return (input? true :false)}
      },
      {
         type:"input",
         name:"lastName",
         message:"Please insert employee's last name",
         validate: function (input) {return (input? true :false)}
      },
      {
         type:"list",
         name:"role",
         message:"Please insert employee's role",
        choices:role
      },
      {
         type:"list",
         name:"manager",
         message:"Please insert employee's manager name",
         choices:managers
      }]).then(({firstName,lastName,role,manager})=>{
      //   this.setEmployee(firstName,lastName,role,manager)
      let managerId;
      let roleId;
      manager=manager.split(" ")
      if(manager.length==1)manager[1]="none";
        con.promise().query("SELECT employee.id FROM employee WHERE first_name =? && last_name=?",[manager[0],manager[1]]).then( ([rows,fields]) => {
        if(rows[0]){
         managerId=rows[0].id;
        } else{
        managerId=null;
        }
         con.promise().query('SELECT id FROM roles WHERE title =?',[role]).then(([rows,fields])=>{
         roleId=rows[0].id;
        con.promise().query('INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)',[firstName,lastName,roleId,managerId]).then(([rows,fields])=>{
         console.log('employee successfully added'.green);
        
      }).then(()=>{this.userChoice()}).catch(console.log)
      }).catch(console.log)
      }).catch(console.log)
      }).catch((error) => {
         throw error;
       });
    }).catch(console.log)
   }).catch(console.log);
  }
   
  //update employee role 
  updateEmployeeRole(){
   let data=[]
   let role=[]
   let employeeName;
   con.promise().query('SELECT employee.first_name,employee.last_name FROM employee').then( ([rows,fields]) => {
      rows.map((list)=>{data.push(list.first_name + ' ' + list.last_name)})
      con.promise().query('SELECT * FROM roles').then(([rows,fields])=>{
         rows.map((roleList)=>{
            role.push(roleList.title)
         }) 
         inquirer.prompt([  
            {
               type:'list',
               name:'name',
               message:'select an employee to update and their new role',
               choices:data
            }
         ]).then(({name})=>{
            employeeName=name;
            inquirer.prompt([  
               {
                  type:'list',
                  name:'role',
                  message:'Select the role for the selected employee',
                  choices:role
               }
            ]).then(({role})=>{
               employeeName=employeeName.split(" ")
               con.promise().query('SELECT id  FROM roles WHERE title=?',[role]).then(([rows,fields])=>{
               role=rows[0].id
               con.promise().query('UPDATE employee SET role_id=? WHERE first_name=? && last_name=?',[role,employeeName[0],employeeName[1]]).then(([rows,fields])=>{
               console.log("1 employee succesfully updated".green)
            }).then(()=>{this.userChoice()}).catch(console.log)
            }).catch(console.log)
           }) 
         }).catch((error) => {
            throw error;
          });
        }).catch(console.log)
      }).catch(console.log)
   }
      //Update employee manager 
      updateEmployeeManager(){
         let employeeName=[];  
         con.promise().query('SELECT employee.first_name,employee.last_name FROM employee').then( ([rows,fields]) => {
            rows.map((list)=>{employeeName.push(list.first_name + ' ' + list.last_name)})         
            inquirer.prompt([  
               {
                  type:'list',
                  name:'name',
                  message:'select an employee to update and their manager',
                  choices:employeeName
               },{
                  type:'list',
                  name:'manager',
                  message:'select a manager',
                  choices:employeeName  
               }
            ]).then(({name,manager})=>{
         let managerId;
         name=name.split(' ')
         manager=manager.split(' ')
            con.promise().query('SELECT id  FROM employee WHERE first_name=? && last_name=?',[manager[0],manager[1]]).then(([rows,fields])=>{
            managerId=rows[0].id
            con.promise().query('UPDATE employee SET manager_id=? WHERE first_name=? && last_name=?',[managerId,name[0],name[1]]).then(([rows,fields])=>{
            console.log("1 employee manager succesfully updated!!".green)}).then(()=>{this.userChoice()}).catch(console.log)  
         }).catch(console.log)  
            })
         }).catch(console.log)  
      }
    
       //View employee by manager
       viewEmployeeByManager(){
         con.promise().query("SELECT concat(employee.first_name,' ',employee.last_name) AS employee, concat(mgr.first_name,' ',mgr.last_name) AS Manager FROM employee INNER JOIN employee mgr  ON employee.manager_id=mgr.id").then( ([rows,fields]) => {
            if(rows.length===0){
               console.log("Oops there is no data to display" + emoji.get('cry'))
               }else{console.table(cTable.getTable(rows)) } 
         }).then(()=>{ this.userChoice()}).catch(console.log); 
      }
    
      //View employee by department
      viewEmployeesByDepartment(){
         con.promise().query("SELECT concat(employee.first_name,' ',employee.last_name) AS employee,departments.name AS department FROM employee LEFT JOIN roles ON employee.role_id =roles.id LEFT JOIN departments ON roles.department_id =departments.id ORDER BY department_id").then( ([rows,fields]) => {
            if(rows.length===0){
               console.log("Oops there is no data to display" + emoji.get('cry'))
               }else{console.table(cTable.getTable(rows))}
           }).then(()=>{ this.userChoice()}).catch(console.log); 
      }
      // delete table records
      deleteTablesRecords(){
         con.promise().query("DELETE e1,r1,d1  FROM departments AS d1 LEFT JOIN roles r1 ON r1.department_id=d1.id LEFT JOIN employee e1 ON e1.role_id=r1.id").then( ([rows,fields]) => {
            console.table("Tables succesfully deleted".green)
            this.resetId();
           }).then(()=>{ this.userChoice()}).catch(console.log); 
      }
     //reset id  after deleting all the table records when we add data's it will start with 1
      resetId(){
      con.promise().query('ALTER TABLE employee AUTO_INCREMENT = 0').then(([rows,fields])=>{
         con.promise().query('ALTER TABLE roles AUTO_INCREMENT = 0').then(([rows,fields])=>{
            con.promise().query('ALTER TABLE departments AUTO_INCREMENT = 0').then(([rows,fields])=>{
            }).catch(console.log)
         }).catch(console.log)
      }).catch(console.log)    
      }
       // Show total budgets of departments
      totalBudgetOfDepartment(){
         con.promise().query("SELECT departments.name as department, sum(salary) AS salary FROM roles LEFT JOIN departments ON roles.department_id = departments.id GROUP BY name").then( ([rows,fields]) => {
            if(rows.length===0){
               console.log("Oops there is no data to display" + emoji.get('cry'))
               }else{console.table(cTable.getTable(rows)) }
           }).then(()=>{ this.userChoice()}).catch(console.log);    
      }
 }
 new employees().userChoice()

