USE employeesDB;

INSERT INTO department (name)
VALUES ('Sales'),('Finance'),('Engineer'),('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sale Lead', 100000, 1), ('Salesperson', 80000, 1), ('Lead Engineer', 250000, 3), ('Software Engineer', 200000, 3), ('Account Manager', 200000, 3), ('Accountant', 220000, 2), ('Legal Team Lead', 230000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Alice', 'Wu', 1, NULL), ('Zixuan', 'E', 2, 1), ('Christine', 'Wang', 3, NULL), ('Jolene','Chen', 4, 2);
