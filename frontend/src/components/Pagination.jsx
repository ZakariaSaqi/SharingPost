import React from "react";
import { Link } from "react-router-dom";

function Pagination({ pages, currentPage, setCurrentPage }) {
  const generatedPages = [];
  for (let i = 1; i <= pages; i++) {
    generatedPages.push(i);
  }
  return (
    <nav aria-label="" className="mt-2">
      <ul className="pagination">
        <li className="page-item">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="page-link"
            href="#"
            aria-label="Previous"
            disabled={currentPage === 1}
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </button>
        </li>
        {generatedPages.map((page) => (
          <li
          key={page}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <Link
              onClick={() => setCurrentPage(page)}
              className="page-link"
              href="#"
            >
              {page}
            </Link>
          </li>
        ))}
        <li className="page-item">
          <button
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={() => setCurrentPage((next) => next + 1)}
            disabled={currentPage === pages}
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
