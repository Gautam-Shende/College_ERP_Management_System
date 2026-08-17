export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
  department_id?: number | null;
  designation?: string;
  phone?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: "principal" | "hod" | "teacher" | "admission_staff";
    department_id?: number | null;
    designation?: string | null;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}