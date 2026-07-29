import UserTable from "../../components/users/UserTable";
import Pagination from "../../components/common/Pagination";
import useUsers from "../../hooks/useUsers";

function UserList() {
  const {
    users,
    loading,
    error,

    deleteUser,
    deletingId,

    page,
    setPage,

    totalPages,

    search,
    setSearch,

    role,
    setRole,

    department,
    setDepartment,

    sortBy,
    setSortBy,

    order,
    setOrder,
  } = useUsers();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <h2 className="text-lg text-red-500">{error}</h2>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Employees</h1>

      <div className="mb-5 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search Employee..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="rounded border px-3 py-2"
        />

        <select
          value={role}
          onChange={(e) => {
            setPage(1);
            setRole(e.target.value);
          }}
          className="rounded border px-3 py-2"
        >
          <option value="">All Roles</option>

          <option value="teacher">Teacher</option>

          <option value="hod">HOD</option>

          <option value="admission_staff">Admission Staff</option>
        </select>

        <select
          value={department}
          onChange={(e) => {
            setPage(1);
            setDepartment(e.target.value);
          }}
          className="rounded border px-3 py-2"
        >
          <option value="">All Departments</option>

          <option value="1">Computer Science</option>

          <option value="2">Information Technology</option>

          <option value="3">Commerce</option>

          <option value="4">Arts</option>

          <option value="5">Science</option>

          <option value="6">Education</option>

          <option value="7">Engineering</option>

          <option value="8">Management</option>
        </select>
      </div>

      <UserTable
        users={users}
        deletingId={deletingId}
        onDelete={deleteUser}
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
      />

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

export default UserList;
