import styles from './Pagination.module.css';

interface Props {
  total: number;
  page: number;
  onChange: (page: number) => void;
}

export default function Pagination({ total, page, onChange }: Props) {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  const maxPagesToShow = 5;
  let visiblePages = pages;
  if (total > maxPagesToShow) {
    const start = Math.max(0, page - Math.ceil(maxPagesToShow / 2));
    const end = start + maxPagesToShow;
    visiblePages = pages.slice(start, end);
  }

  return (
    <div className={styles.pagination}>
      {visiblePages.map((p) => (
        <button
          key={p}
          className={p === page ? styles.active : ''}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
