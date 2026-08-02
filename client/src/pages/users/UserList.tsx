import { Link } from "react-router-dom";
import { UserPlus, Search } from "lucide-react";
import UserTable from "../../components/users/UserTable";
import Pagination from "../../components/common/Pagination";
import useUsers from "../../hooks/useUsers";
import useDepartments from "../../hooks/useDepartments";

// User management dashboard page (Principal level access)
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
    updateStatus,
  } = useUsers();

  // Dynamically load department list from backend API
  const { departments } = useDepartments();

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
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Employee Management</h1>
          <p className="text-sm text-slate-500">Manage user accounts, roles, and status across departments</p>
        </div>

        <Link
          to="/users/add"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
        >
          <UserPlus size={18} />
          Add New Employee
        </Link>
      </div>

      {/* Search & Dynamic Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search employees by name or email..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Role Filter */}
        <select
          value={role}
          onChange={(e) => {
            setPage(1);
            setRole(e.target.value);
          }}
          className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none"
        >
          <option value="">All Roles</option>
          <option value="teacher">Teacher</option>
          <option value="hod">HOD</option>
          <option value="admission_staff">Admission Staff</option>
        </select>

        {/* Dynamic Department Filter */}
        <select
          value={department}
          onChange={(e) => {
            setPage(1);
            setDepartment(e.target.value);
          }}
          className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.department_name}
            </option>
          ))}
        </select>
      </div>

      {/* Employee Data Table */}
      <UserTable
        users={users}
        deletingId={deletingId}
        onDelete={deleteUser}
        onStatusChange={updateStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
      />

      {/* Pagination Controls */}
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

export default UserList;
