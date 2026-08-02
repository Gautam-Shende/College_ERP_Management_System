export interface User {
  id: number;

  name: string;

  email: string;

  password?: string;

  role: "principal" | "hod" | "teacher" | "admission_staff";

  department_id: number | null;

  department_name?: string | null;

  designation: string;

  phone: string;

  status: "active" | "inactive";

  created_at?: string;

  updated_at?: string;
}
