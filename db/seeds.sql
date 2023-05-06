USE employee_tracker;

INSERT INTO department (name) VALUES
    ("Sales Department"),
    ("Engineering Department");

INSERT INTO role (title, salary, department_id) VALUES
    ("Sales Manager", 100000, 1),
    ("Senior Engineer", 100000, 2),
    ("Salesperson", 70000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id ) VALUES
    ("John", "Smith", 1, NULL),
    ("Mary", "Smith", 3, 1);