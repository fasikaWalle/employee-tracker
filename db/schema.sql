DROP DATABASE IF EXISTS employees; 
CREATE DATABASE employees;
USE employees;

CREATE TABLE departments(id INT AUTO_INCREMENT NOT NULL,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id));

CREATE TABLE roles (id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL,
department_id INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY(department_id) REFERENCES departments(id) ON DELETE CASCADE);

CREATE TABLE employee(id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT DEFAULT NULL,
PRIMARY KEY(id),
FOREIGN KEY(role_id) REFERENCES roles(id)ON DELETE CASCADE ,
FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE
);

-- DELETE departments.*,roles.*,employee.* FROM roles  JOIN departments WHERE roles.department_id=departments.iverJOIN employee WHERE employee.role_id=roles.id
-- FROM employee as a , roles as b, departments as c
-- OUTER JOIN roles ON a.role_id = b.id OUTER JOIN departments
-- ON b.department_id = c.id DELETE employee, roles,departments FROM employee OUTER JOIN roles OUTER JOIN departments

-- TRUNCATE TABLE departments,roles,employee
-- FROM departments
-- JOIN roles
-- join employee
-- AND b.quizId = @quizId

-- DELETE e1,r1,d1  FROM employee AS e1
--  LEFT JOIN roles r1 ON e1.role_id=r1.id
--  LEFT JOIN departments d1 ON d1.id=r1.department_id


-- DELETE e1,r1,d1  FROM departments AS d1
--  LEFT JOIN roles r1 ON r1.department_id=d1.id
--  LEFT JOIN employee e1 ON e1.role_id=r1.id