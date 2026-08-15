"use client";

import scss from "./pagination.module.scss";

interface IPaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onChange }: IPaginationProps) => {
  return (
    <div className={scss.pagination}>
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>
        ← Prev
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;

        return (
          <button
            key={pageNumber}
            className={page === pageNumber ? scss.active : ""}
            onClick={() => onChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}

      <button disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        Next →
      </button>
    </div>
  );
};

export default Pagination;
