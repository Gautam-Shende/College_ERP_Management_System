export interface Summary {
  total_students: number;
  total_courses: number;
  total_departments: number;
}

export interface CourseStat {
  course: string;
  count: number;
}

export interface CityStat {
  city: string;
  count: number;
}

export interface RecentStudent {
  id: number;
  name: string;
  email: string;
  course: string;
  city: string;
  created_at?: string;
}

export interface DashboardData {
  summary: Summary;
  courseStats: CourseStat[];
  cityStats: CityStat[];
  recentStudents: RecentStudent[];
}
