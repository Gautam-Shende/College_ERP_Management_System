-- PostgreSQL Seed Data for College ERP Management System

-- 1. SEED DEPARTMENTS (7 Departments)
INSERT INTO departments (id, department_name) VALUES
(1, 'Computer Science & Engineering'),
(2, 'Information Technology'),
(3, 'Electronics & Communication Engineering'),
(4, 'Electrical Engineering'),
(5, 'Mechanical Engineering'),
(6, 'Civil Engineering'),
(7, 'Management Studies')
ON CONFLICT (id) DO NOTHING;

-- Reset sequence for departments identity
SELECT setval(pg_get_serial_sequence('departments', 'id'), (SELECT MAX(id) FROM departments));

-- 2. SEED COURSES (10 Courses)
INSERT INTO courses (id, course_name, department_id) VALUES
(1, 'B.Tech Computer Science', 1),
(2, 'M.Tech Computer Science', 1),
(3, 'B.Tech Information Technology', 2),
(4, 'B.Tech Electronics & Communication', 3),
(5, 'M.Tech Electronics', 3),
(6, 'B.Tech Electrical Engineering', 4),
(7, 'B.Tech Mechanical Engineering', 5),
(8, 'M.Tech Mechanical Engineering', 5),
(9, 'B.Tech Civil Engineering', 6),
(10, 'Master of Business Administration (MBA)', 7)
ON CONFLICT (id) DO NOTHING;

-- Reset sequence for courses identity
SELECT setval(pg_get_serial_sequence('courses', 'id'), (SELECT MAX(id) FROM courses));

-- 3. SEED STUDENTS (100 Students)
INSERT INTO students (id, name, email, course_id, city) VALUES
(1, 'Aarav Sharma', 'aarav.sharma@example.com', 1, 'Mumbai'),
(2, 'Vivaan Patel', 'vivaan.patel@example.com', 1, 'Pune'),
(3, 'Aditya Verma', 'aditya.verma@example.com', 2, 'Delhi'),
(4, 'Vihaan Gupta', 'vihaan.gupta@example.com', 2, 'Bangalore'),
(5, 'Arjun Reddy', 'arjun.reddy@example.com', 3, 'Hyderabad'),
(6, 'Sai Kumar', 'sai.kumar@example.com', 3, 'Chennai'),
(7, 'Reyansh Joshi', 'reyansh.joshi@example.com', 4, 'Ahmedabad'),
(8, 'Ayaan Mehta', 'ayaan.mehta@example.com', 4, 'Surat'),
(9, 'Krishna Nair', 'krishna.nair@example.com', 5, 'Kochi'),
(10, 'Ishaan Bhat', 'ishaan.bhat@example.com', 5, 'Jaipur'),
(11, 'Dhruv Singh', 'dhruv.singh@example.com', 6, 'Lucknow'),
(12, 'Kabir Kapoor', 'kabir.kapoor@example.com', 6, 'Chandigarh'),
(13, 'Ritvik Shah', 'ritvik.shah@example.com', 7, 'Vadodara'),
(14, 'Ananya Mishra', 'ananya.mishra@example.com', 7, 'Bhopal'),
(15, 'Diya Agarwal', 'diya.agarwal@example.com', 8, 'Indore'),
(16, 'Myra Deshmukh', 'myra.deshmukh@example.com', 8, 'Nagpur'),
(17, 'Aadhya Kulkarni', 'aadhya.kulkarni@example.com', 9, 'Nashik'),
(18, 'Pari Saxena', 'pari.saxena@example.com', 9, 'Kanpur'),
(19, 'Saisha Rao', 'saisha.rao@example.com', 10, 'Visakhapatnam'),
(20, 'Avani Trivedi', 'avani.trivedi@example.com', 10, 'Rajkot'),
(21, 'Rohan Das', 'rohan.das@example.com', 1, 'Kolkata'),
(22, 'Kavya Pandey', 'kavya.pandey@example.com', 1, 'Varanasi'),
(23, 'Siddharth Iyer', 'siddharth.iyer@example.com', 2, 'Coimbatore'),
(24, 'Pranav Menno', 'pranav.menon@example.com', 2, 'Thiruvananthapuram'),
(25, 'Gaurav Roy', 'gaurav.roy@example.com', 3, 'Patna'),
(26, 'Meera Sen', 'meera.sen@example.com', 3, 'Kolkata'),
(27, 'Devansh Thakur', 'devansh.thakur@example.com', 4, 'Shimla'),
(28, 'Nikhil Malhotra', 'nikhil.malhotra@example.com', 4, 'Dehradun'),
(29, 'Tanvi Bansal', 'tanvi.bansal@example.com', 5, 'Ludhiana'),
(30, 'Yash Vardhan', 'yash.vardhan@example.com', 5, 'Agra'),
(31, 'Isha Singhal', 'isha.singhal@example.com', 6, 'Meerut'),
(32, 'Rudra Pratap', 'rudra.pratap@example.com', 6, 'Gorakhpur'),
(33, 'Kartik Chaudhari', 'kartik.chaudhari@example.com', 7, 'Nashik'),
(34, 'Shruti Shinde', 'shruti.shinde@example.com', 7, 'Kolhapur'),
(35, 'Varun More', 'varun.more@example.com', 8, 'Aurangabad'),
(36, 'Neha Jadhav', 'neha.jadhav@example.com', 8, 'Solapur'),
(37, 'Abhinav Patil', 'abhinav.patil@example.com', 9, 'Sangli'),
(38, 'Pooja Pawar', 'pooja.pawar@example.com', 9, 'Satara'),
(39, 'Deepak Sutar', 'deepak.sutar@example.com', 10, 'Ratnagiri'),
(40, 'Riya Salunkhe', 'riya.salunkhe@example.com', 10, 'Thane'),
(41, 'Sameer Khan', 'sameer.khan@example.com', 1, 'Mumbai'),
(42, 'Zoya Shaikh', 'zoya.shaikh@example.com', 1, 'Pune'),
(43, 'Arman Syed', 'arman.syed@example.com', 2, 'Hyderabad'),
(44, 'Sanya Merchant', 'sanya.merchant@example.com', 2, 'Mumbai'),
(45, 'Kunal Hegde', 'kunal.hegde@example.com', 3, 'Mangalore'),
(46, 'Nidhi Shenoy', 'nidhi.shenoy@example.com', 3, 'Udupi'),
(47, 'Rahul Shetty', 'rahul.shetty@example.com', 4, 'Bangalore'),
(48, 'Sneha Naidu', 'sneha.naidu@example.com', 4, 'Vijayawada'),
(49, 'Venkatesh Raju', 'venkatesh.raju@example.com', 5, 'Guntur'),
(50, 'Bhavana Chawla', 'bhavana.chawla@example.com', 5, 'Amritsar'),
(51, 'Manish Ahuja', 'manish.ahuja@example.com', 6, 'Jalandhar'),
(52, 'Preeti Juneja', 'preeti.juneja@example.com', 6, 'Ambala'),
(53, 'Alok Bhattacharya', 'alok.bhattacharya@example.com', 7, 'Durgapur'),
(54, 'Snehal Mukhopadhyay', 'snehal.mukhopadhyay@example.com', 7, 'Asansol'),
(55, 'Tushar Ganguly', 'tushar.ganguly@example.com', 8, 'Siliguri'),
(56, 'Monika Bose', 'monika.bose@example.com', 8, 'Howrah'),
(57, 'Chirag Parekh', 'chirag.parekh@example.com', 9, 'Bhavnagar'),
(58, 'Jalpa Vora', 'jalpa.vora@example.com', 9, 'Jamnagar'),
(59, 'Hardik Solanki', 'hardik.solanki@example.com', 10, 'Gandhinagar'),
(60, 'Kiran Gohil', 'kiran.gohil@example.com', 10, 'Anand'),
(61, 'Amitabha Dutta', 'amitabha.dutta@example.com', 1, 'Kolkata'),
(62, 'Swati Ghosh', 'swati.ghosh@example.com', 1, 'Ranchi'),
(63, 'Pankaj Sahay', 'pankaj.sahay@example.com', 2, 'Jamshedpur'),
(64, 'Rashmi Sinha', 'rashmi.sinha@example.com', 2, 'Dhanbad'),
(65, 'Sanjeev Kumar', 'sanjeev.kumar@example.com', 3, 'Gaya'),
(66, 'Naveen Tyagi', 'naveen.tyagi@example.com', 3, 'Noida'),
(67, 'Archana Pal', 'archana.pal@example.com', 4, 'Ghaziabad'),
(68, 'Vikas Somani', 'vikas.somani@example.com', 4, 'Faridabad'),
(69, 'Divya Shrestha', 'divya.shrestha@example.com', 5, 'Gurgaon'),
(70, 'Gautam Rawat', 'gautam.rawat@example.com', 5, 'Dehradun'),
(71, 'Harish Negi', 'harish.negi@example.com', 6, 'Nainital'),
(72, 'Komal Bisht', 'komal.bisht@example.com', 6, 'Haldwani'),
(73, 'Lokesh Sharma', 'lokesh.sharma@example.com', 7, 'Jaipur'),
(74, 'Mamta Rathore', 'mamta.rathore@example.com', 7, 'Jodhpur'),
(75, 'Narendra Gehlot', 'narendra.gehlot@example.com', 8, 'Udaipur'),
(76, 'Payal Chouhan', 'payal.chouhan@example.com', 8, 'Kota'),
(77, 'Rajesh Solanki', 'rajesh.solanki@example.com', 9, 'Bikaner'),
(78, 'Sarita Meena', 'sarita.meena@example.com', 9, 'Ajmer'),
(79, 'Tarun Baghel', 'tarun.baghel@example.com', 10, 'Gwalior'),
(80, 'Uma Scindia', 'uma.scindia@example.com', 10, 'Jabalpur'),
(81, 'Vijay Tomar', 'vijay.tomar@example.com', 1, 'Ujjain'),
(82, 'Wasim Akram', 'wasim.akram@example.com', 1, 'Hyderabad'),
(83, 'Xavier Dsouza', 'xavier.dsouza@example.com', 2, 'Goa'),
(84, 'Yogesh Sawant', 'yogesh.sawant@example.com', 2, 'Panaji'),
(85, 'Zaheer Merchant', 'zaheer.merchant@example.com', 3, 'Mumbai'),
(86, 'Anuradha Som', 'anuradha.som@example.com', 3, 'Pune'),
(87, 'Bhavesh Chheda', 'bhavesh.chheda@example.com', 4, 'Thane'),
(88, 'Chetan Shah', 'chetan.shah@example.com', 4, 'Navi Mumbai'),
(89, 'Dharmesh Savla', 'dharmesh.savla@example.com', 5, 'Kalyan'),
(90, 'Esha Gada', 'esha.gada@example.com', 5, 'Dombivli'),
(91, 'Farhan Qureshi', 'farhan.qureshi@example.com', 6, 'Lucknow'),
(92, 'Gita Sundaram', 'gita.sundaram@example.com', 6, 'Chennai'),
(93, 'Hemant Pillai', 'hemant.pillai@example.com', 7, 'Madurai'),
(94, 'Indu Nambiar', 'indu.nambiar@example.com', 7, 'Kozhikode'),
(95, 'Jayesh Kurup', 'jayesh.kurup@example.com', 8, 'Thrissur'),
(96, 'Kavita Menon', 'kavita.menon@example.com', 8, 'Palakkad'),
(97, 'Lata Subramanian', 'lata.subramanian@example.com', 9, 'Salem'),
(98, 'Manoj Raman', 'manoj.raman@example.com', 9, 'Tiruchirappalli'),
(99, 'Nirmal Chari', 'nirmal.chari@example.com', 10, 'Puducherry'),
(100, 'Omkar Paranjape', 'omkar.paranjape@example.com', 10, 'Pune')
ON CONFLICT (id) DO NOTHING;

-- Reset sequence for students identity
SELECT setval(pg_get_serial_sequence('students', 'id'), (SELECT MAX(id) FROM students));

-- Note on `users` table:
-- No hard-coded user passwords or dummy secret keys are seeded.
-- Users can register directly via the registration functionality on the frontend (/register),
-- or be created by an active Principal user.
