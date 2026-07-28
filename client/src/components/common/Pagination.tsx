interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded border px-4 py-2 disabled:opacity-50"
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded px-4 py-2 border transition

          ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-gray-100"
          }
          `}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded border px-4 py-2 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
