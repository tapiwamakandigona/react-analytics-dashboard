import { useState, useMemo } from "react";

type SortDirection = "asc" | "desc" | null;

interface SortState {
  column: string | null;
  direction: SortDirection;
}

/**
 * Table sorting hook. Click column header to sort.
 * Click again to reverse. Third click resets.
 * 
 * @example
 * const { sorted, sortColumn, sortDirection, handleSort } = useTableSort(data, "date");
 */
export function useTableSort<T extends Record<string, any>>(
  data: T[],
  defaultColumn?: string,
  defaultDirection: SortDirection = "desc"
) {
  const [sort, setSort] = useState<SortState>({
    column: defaultColumn || null,
    direction: defaultDirection,
  });

  const handleSort = (column: string) => {
    setSort(prev => {
      if (prev.column !== column) return { column, direction: "asc" };
      if (prev.direction === "asc") return { column, direction: "desc" };
      if (prev.direction === "desc") return { column: null, direction: null };
      return { column, direction: "asc" };
    });
  };

  const sorted = useMemo(() => {
    if (!sort.column || !sort.direction) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sort.column!];
      const bVal = b[sort.column!];

      if (aVal === bVal) return 0;

      let comparison: number;
      if (typeof aVal === "number" && typeof bVal === "number") {
        comparison = aVal - bVal;
      } else if (typeof aVal === "string" && typeof bVal === "string") {
        comparison = aVal.localeCompare(bVal);
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return sort.direction === "desc" ? -comparison : comparison;
    });
  }, [data, sort]);

  return {
    sorted,
    sortColumn: sort.column,
    sortDirection: sort.direction,
    handleSort,
  };
}
