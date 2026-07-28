import useDashboard from "../../hooks/useDashboard";
import SummaryCards from "../../components/dashboard/StatCard";
import CourseChart from "../../components/dashboard/CourseChart";
import CityChart from "../../components/dashboard/Citychart";
import RecentStudents from "../../components/dashboard/RecentStudentsTable";
import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton";


function Dashboard() {
  const { dashboard, loading, error } = useDashboard();

  if (loading) {
    return <DashboardSkeleton />
  }

  if (error) {
    return <h2 className="text-red-500 text-lg">{error}</h2>;
  }

  if (!dashboard) return null;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <SummaryCards summary={dashboard.summary} />
      <div className="grid gap-6 lg:grid-cols-2">
        <CourseChart data={dashboard.courseStats} />

        <CityChart data={dashboard.cityStats} />
        <RecentStudents students={dashboard.recentStudents} />
      </div>
    </div>
  );
}

export default Dashboard;
