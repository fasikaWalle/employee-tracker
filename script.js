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
