USE tracker;

INSERT INTO department(name)
VALUES
('Medical'),
('Customer Service'),
('Law'),
('Software Development');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Prosecuter', 200000, 3),
('Cardiac Surgeon', 400000, 1),
('Sales Manager', 50000, 2),
('Front end developer', 70000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Michael', 'Phan', 1, 5),
('Kevin', 'Phan', 2, 5),
('Duan', 'Phan', 2, 10),
('Jenny', 'Hoang', 1, 5),
('Kim', 'Nguyen', 1, 10),
('Tracey', 'Phuong', 2, 10),
('Regis', 'Kibler', 1, 5),
('Krip', 'Sec', 2, 10),
('Cote', 'Kei', 2, 5),
('Cote', 'Ayanokoji', 1, 10);