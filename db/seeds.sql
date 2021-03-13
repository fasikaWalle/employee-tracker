

INSERT INTO departments(name) VALUES ('Sales'),('Finance'),('Engineering'),('Legal'),('test');

INSERT INTO roles(title,salary,department_id ) VALUES('Sales Lead',10000,1),('Sales Person',80000,1),('Lead Engineer',90000,2),('Software Engineer',120000,2),('Accounting',95000,3),('Lawyer',110000,3),('Legal Team Lead',90000,4);

INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES 
('Jhon','Doe',1,NULL),
('Mike','Chan',1,1), 
('Asheley','Rodriguez',2,1),
('Keven','Tupik',3,2),
('Malia','Brown',3,NULL),
('Sarah','Lourd',3,3),
('Tom','Allen',4,3);

