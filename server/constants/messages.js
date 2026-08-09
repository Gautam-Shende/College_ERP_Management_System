  const MESSAGES = {
  COMMON: {
    SERVER_ERROR: "Server Error",
    INTERNAL_SERVER_ERROR: "Internal Server Error...",
    UNAUTHORIZED: "Authentication required...",
    INVALID_TOKEN: "Invalid or expired token...",
    USER_NOT_FOUND: "User not found..",
    ACCESS_DENIED: "Access denied...",
    NOT_AUTHORIZED: "You are not authorized to perform this action....",
    ALL_FIELDS_REQUIRED: "All fields are required....",
    EMAIL_PASS_REQUIRED: "Email, and Password Required...",
  },

  STUDENT: {
    NOT_FOUND: "Student not found..",
    EMAIL_EXISTS: "Email already exists..",
    FETCHED: "Student fetched successfully....",
    CREATED: "Student added successfully....",
    UPDATED: "Student updated successfully..",
    DELETED: "Student deleted successfully..",
  },

  COURSE: {
    NOT_FOUND: "Course not found",
    CREATED: "Course created successfully",
    UPDATED: "Course updated successfully",
    DELETED: "Course deleted successfully",
    ALREADY_EXISTS: "Course already exists in this department",
    COURSE_REQ: "Course name and department are required",
  },

  DEPARTMENT: {
    NOT_FOUND: "Department not found",
    CREATED: "Department created successfully",
    UPDATED: "Department updated successfully",
    DELETED: "Department deleted successfully",
    ALREADY_EXISTS: "Department already exists",
    DEPARTMENT_REQUI: "Dpartment is Required...",
  },

  USER: {
    EMAIL_EXISTS: "Email already exists...",
    NOT_FOUND: "User not found...",
    CREATED: "Employee created successfully..",
    REGISTERED: "Registration successful...",
    LOGIN: "Login SuccessFull...",
    FETCHED: "User Fetched successfully..",
    UPDATED: "Employee updated successfully...",
    FAILED: "Failed to fetch user...",
    DELETED: "Employee deleted successfully..",
    INVALID_CREDENTIALS: "Invalid credentials..",
    INACTIVE: "Your account is inactive...",
    INVALID_ROLE: "This is invalid Role..."

  },
};

module.exports = MESSAGES;