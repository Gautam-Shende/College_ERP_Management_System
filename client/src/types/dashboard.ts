export interface Summary {
  totalStudents: number;
  totalUsers: number;
  totalCourses: number;
  totalCities: number;
}

export interface CourseStat {
  course: string;
  total: number;
}

export interface CityStat {
  city: string;
  total: number;
}

export interface RecentStudent {
  id: number;
  name: string;
  email: string;
  course: string;
  city: string;
}

export interface DashboardData {
  summary: Summary;
  courseStats: CourseStat[];
  cityStats: CityStat[];
  recentStudents: RecentStudent[];
}
