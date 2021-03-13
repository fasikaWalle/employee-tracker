
# Employee Tracker
[![License](https://img.shields.io/badge/License-Apache%202.0-yellow.svg)](https://opensource.org/licenses/Apache-2.0)
## Description

This command line application is used to manages company's employee database which enables to view and manage the departments, roles, and employees in the company so that it will be easy to organize and access data based on their catagory addition to that it helps to add and update datas based on user requirement. 
## Table of Content
* [Installation](#Installation)
* [Usage](#Usage)
* [Licence](#Licence)
* [contributing](#contributing)


## Installation
First you have to make sure that you have node js in your system if you don't have you can install it from https://nodejs.org/en/  and make sure you install mysql if not just click the following link and download it https://dev.mysql.com/downloads/mysql/ then you open your terminal and type npm install to install all the necessary dependencies which are used for this application.
```npm install```  
## Usage
- Clone the code from the repository to local computer
- Open the terminal
- write npm install in the terminal and hit enter to install all the neccesary dependencies that this application uses
- Write mysql -u (database user name) -p then enter, please insert password window will display then you have to insert your database password.
- Inorder to use the database you have to create it by writing source db/schema.sql then enter this will create the table structure then there is already a data on seeds.sql file so write source db/seeds.sql this will fill your tables with pre defined data after that just write quit and back to the terminal.
- Inorder to start the application write npm start.
- Choose whatever you want to do.
- Please make sure when you delete the tables and try to insert data's you have to insert department,roles and employee respectively because they are related to one another. 
- Walkthrough video link (https://drive.google.com/file/d/1remHHEO099pIyw3TA7qUWT9am6NKZbAA/view?usp=sharing)
![project image](./Assets/images/employee-tracker.png)


 ## Licence
This Licence belongs to Apache!

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update the code as appropriate.

## Questions
If you have any question about the repo, open an issue or contact me directly at [fasikaWalle](https://github.com/fasikaWalle/)

If you want to reach me for further questions please contact me through fasikabini12@gmail.com
    
