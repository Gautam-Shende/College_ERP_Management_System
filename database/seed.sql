-- ============================================================
-- College ERP Management System
-- Seed Data for PostgreSQL
-- ============================================================

-- ============================================================
-- 1. DEPARTMENTS
-- ============================================================

INSERT INTO departments (department_name)
VALUES
    ('Computer Science'),
    ('Commerce'),
    ('Arts'),
    ('Science'),
    ('Education'),
    ('Engineering'),
    ('Management');


-- ============================================================
-- 2. COURSES
-- ============================================================

INSERT INTO courses (course_name, department_id)
VALUES
    ('BCA', 1),
    ('MCA', 1),
    ('BCom', 2),
    ('BA', 3),
    ('BSc', 4),
    ('MSc', 4),
    ('BEd', 5),
    ('BTech', 6),
    ('BBA', 7),
    ('MBA', 7);


-- ============================================================
-- 3. STUDENTS
-- ============================================================

INSERT INTO students (name, email, course_id, city)
VALUES
    ('Rahul', 'rahul1@gmail.com', 1, 'Nagpur'),
    ('Amit', 'amit2@gmail.com', 9, 'Pune'),
    ('Sneha', 'sneha3@gmail.com', 5, 'Mumbai'),
    ('Gautam', 'gautam4@gmail.com', 1, 'Sakoli'),
    ('Priya', 'priya5@gmail.com', 2, 'Nagpur'),
    ('Rohan', 'rohan6@gmail.com', 3, 'Pune'),
    ('Neha', 'neha7@gmail.com', 4, 'Mumbai'),
    ('Ajay', 'ajay8@gmail.com', 6, 'Nagpur'),
    ('Pooja', 'pooja9@gmail.com', 7, 'Pune'),
    ('Vikram', 'vikram10@gmail.com', 8, 'Mumbai'),
    ('Anjali', 'anjali11@gmail.com', 1, 'Nagpur'),
    ('Sagar', 'sagar12@gmail.com', 2, 'Pune'),
    ('Divya', 'divya13@gmail.com', 3, 'Mumbai'),
    ('Karan', 'karan14@gmail.com', 4, 'Nagpur'),
    ('Ritu', 'ritu15@gmail.com', 5, 'Pune'),
    ('Manish', 'manish16@gmail.com', 6, 'Mumbai'),
    ('Tina', 'tina17@gmail.com', 7, 'Nagpur'),
    ('Arjun', 'arjun18@gmail.com', 8, 'Pune'),
    ('Shruti', 'shruti19@gmail.com', 9, 'Mumbai'),
    ('Deepak', 'deepak20@gmail.com', 1, 'Nagpur'),
    ('Kavita', 'kavita21@gmail.com', 2, 'Pune'),
    ('Rajesh', 'rajesh22@gmail.com', 3, 'Mumbai'),
    ('Meera', 'meera23@gmail.com', 4, 'Nagpur'),
    ('Anil', 'anil24@gmail.com', 5, 'Pune'),
    ('Swati', 'swati25@gmail.com', 6, 'Mumbai'),
    ('Sanjay', 'sanjay26@gmail.com', 7, 'Nagpur'),
    ('Preeti', 'preeti27@gmail.com', 8, 'Pune'),
    ('Arun', 'arun28@gmail.com', 9, 'Mumbai'),
    ('Nisha', 'nisha29@gmail.com', 1, 'Nagpur'),
    ('Ravi', 'ravi30@gmail.com', 2, 'Pune'),
    ('Sunita', 'sunita31@gmail.com', 3, 'Mumbai'),
    ('Aakash', 'aakash32@gmail.com', 4, 'Nagpur'),
    ('Pallavi', 'pallavi33@gmail.com', 5, 'Pune'),
    ('Manoj', 'manoj34@gmail.com', 6, 'Mumbai'),
    ('Rupali', 'rupali35@gmail.com', 7, 'Nagpur'),
    ('Sandeep', 'sandeep36@gmail.com', 8, 'Pune'),
    ('Madhuri', 'madhuri37@gmail.com', 9, 'Mumbai'),
    ('Vishal', 'vishal38@gmail.com', 1, 'Nagpur'),
    ('Shweta', 'shweta39@gmail.com', 2, 'Pune'),
    ('Rajiv', 'rajiv40@gmail.com', 3, 'Mumbai'),
    ('Seema', 'seema41@gmail.com', 4, 'Nagpur'),
    ('Ashish', 'ashish42@gmail.com', 5, 'Pune'),
    ('Usha', 'usha43@gmail.com', 6, 'Mumbai'),
    ('Suresh', 'suresh44@gmail.com', 7, 'Nagpur'),
    ('Varsha', 'varsha45@gmail.com', 8, 'Pune'),
    ('Dinesh', 'dinesh46@gmail.com', 9, 'Mumbai'),
    ('Rekha', 'rekha47@gmail.com', 1, 'Nagpur'),
    ('Mukesh', 'mukesh48@gmail.com', 2, 'Pune'),
    ('Geeta', 'geeta49@gmail.com', 3, 'Mumbai'),
    ('Prakash', 'prakash50@gmail.com', 4, 'Nagpur');