type paginationProps = {
  page: number;
  setPage: (n: number) => void;
};

const Pagination = ({ page, setPage }: paginationProps) => {
  return (
    <div>
      <button
        onClick={() => setPage(page - 1)}
        disabled={page <= 1}
        className="rounded-md bg-gray-600 px-2 mx-2 hover:bg-gray-700 disabled:opacity-40 disabled:pointer-events-none"
      >
        Prev
      </button>
      {page}
      <button
        onClick={() => setPage(page + 1)}
        className="rounded-md bg-gray-600 px-2 mx-2 hover:bg-gray-700"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
