function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Cards */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="rounded-xl bg-white p-6 shadow">
            <div className="h-4 w-24 rounded bg-gray-200"></div>

            <div className="mt-5 h-8 w-16 rounded bg-gray-300"></div>
          </div>
        ))}
      </div>

      {/* Charts */}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow">
          <div className="mb-5 h-5 w-40 rounded bg-gray-200"></div>

          <div className="h-72 rounded bg-gray-100"></div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="mb-5 h-5 w-40 rounded bg-gray-200"></div>

          <div className="h-72 rounded bg-gray-100"></div>
        </div>
      </div>

      {/* Table */}

      <div className="rounded-xl bg-white p-6 shadow">
        <div className="mb-5 h-5 w-44 rounded bg-gray-200"></div>

        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="mb-4 h-6 rounded bg-gray-100" />
        ))}
      </div>
    </div>
  );
}

export default DashboardSkeleton;
