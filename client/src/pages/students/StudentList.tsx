import { Link } from "react-router-dom";
import { UserPlus, Search } from "lucide-react";
import StudentTable from "../../components/students/StudentTable";
import Pagination from "../../components/common/Pagination";
import useStudents from "../../hooks/useStudents";
import useCourses from "../../hooks/useCourses";

// Student directory page supporting search, filters, pagination, and actions
function StudentList() {
  const {
    students,
    loading,
    error,
    deleteStudent,
    deletingId,
    page,
    setPage,
    fetching,
    totalPages,
    search,
    setSearch,
    course,
    setCourse,
    city,
    setCity,
    sortBy,
    setSortBy,
    order,
    setOrder,
  } = useStudents();

  // Load courses dynamically from backend API
  const { courses } = useCourses();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <h2 className="rounded-lg bg-rose-50 p-4 text-center text-rose-600">{error}</h2>;
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Student Directory</h1>
          <p className="text-sm text-slate-500">Manage enrolled student records, courses, and details</p>
        </div>

        <Link
          to="/students/add"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
        >
          <UserPlus size={18} />
          Add New Student
        </Link>
      </div>

      {/* Search & Dynamic Course Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search students by name, email, course or city..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Dynamic Course Select */}
        <select
          value={course}
          onChange={(e) => {
            setPage(1);
            setCourse(e.target.value);
          }}
          className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none"
        >
          <option value="">All Courses</option>
          {courses.map((c) => (
            <option key={c.id} value={c.course_name}>
              {c.course_name}
            </option>
          ))}
        </select>

        {/* City Filter Input */}
        <input
          type="text"
          placeholder="Filter by City..."
          value={city}
          onChange={(e) => {
            setPage(1);
            setCity(e.target.value);
          }}
          className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Table */}
      <StudentTable
        students={students}
        onDelete={deleteStudent}
        deletingId={deletingId}
        sortBy={sortBy}
        order={order}
        setSortBy={setSortBy}
        setOrder={setOrder}
      />

      {fetching && (
        <p className="text-center text-xs font-medium text-blue-600">
          Refreshing data...
        </p>
      )}

      {/* Pagination */}
      <div className="flex justify-center pt-2">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default StudentList;
