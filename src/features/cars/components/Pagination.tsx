import { useNavigate } from "@tanstack/react-router";
import styles from "./Pagination.module.css";

type PaginationProps = {
  page: number;
  pages: number;
};

function getPageNumbers(page: number, pages: number) {
  if (pages <= 7) {
    return Array.from({ length: pages }, (_, i) => i + 1);
  }

  if (page <= 4) {
    return [1, 2, 3, 4, 5, "...", pages];
  }

  if (page >= pages - 3) {
    return [1, "...", pages - 4, pages - 3, pages - 2, pages - 1, pages];
  }

  return [1, "...", page - 1, page, page + 1, "...", pages];
}

export function Pagination({ page, pages }: PaginationProps) {
  const navigate = useNavigate();
  const pageNumbers = getPageNumbers(page, pages);

  function goToPage(nextPage: number) {
    navigate({
      search: (prev) => ({
        ...prev,
        page: nextPage,
      }),
    });
  }

  if (pages <= 1) return null;

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        className={`${styles.pageBtn} ${styles.arrowBtn}`}
        disabled={page <= 1}
        onClick={() => goToPage(page - 1)}
        aria-label="Previous page"
      >
        ‹
      </button>

      <div className={styles.pageNumbers}>
        {pageNumbers.map((number, index) =>
          number === "..." ? (
            <span className={styles.pageDots} key={`dots-${index}`}>
              …
            </span>
          ) : (
            <button
              key={number}
              className={`${styles.pageBtn} ${page === number ? styles.active : ""}`}
              aria-current={page === number ? "page" : undefined}
              onClick={() => goToPage(number)}
            >
              {number}
            </button>
          ),
        )}
      </div>

      <button
        className={`${styles.pageBtn} ${styles.arrowBtn}`}
        disabled={page >= pages}
        onClick={() => goToPage(page + 1)}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
}
