import StudentTable from "../../components/students/StudentTable";
import Pagination from "../../components/common/Pagination";
import useStudents from "../../hooks/useStudents";

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

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <h2 className="text-red-500 text-lg">{error}</h2>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Students</h1>

      {/* Search + Filters */}

      <div className="mb-5 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="rounded border px-3 py-2"
        />

        <select
          value={course}
          onChange={(e) => {
            setPage(1);
            setCourse(e.target.value);
          }}
          className="rounded border px-3 py-2"
        >
          <option value="">All Courses</option>

          <option value="BCA">BCA</option>

          <option value="BSC">BSC</option>

          <option value="BBA">BBA</option>

          <option value="BA">BA</option>
        </select>

        <select
          value={city}
          onChange={(e) => {
            setPage(1);
            setCity(e.target.value);
          }}
          className="rounded border px-3 py-2"
        >
          <option value="">All Cities</option>

          <option value="Nagpur">Nagpur</option>

          <option value="Pune">Pune</option>

          <option value="Mumbai">Mumbai</option>

          <option value="Sakoli">Sakoli</option>
        </select>
      </div>

      <StudentTable
        students={students}
        onDelete={deleteStudent}
        deletingId={deletingId}
        sortBy={sortBy}
        order={order}
        setSortBy={setSortBy}
        setOrder={setOrder}
      />
      {fetching && <p className="mt-4 text-center text-blue-600">Loading...</p>}
      <div className="mt-6 flex justify-center">
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
