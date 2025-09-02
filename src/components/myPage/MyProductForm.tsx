import type { FC } from "react";

export interface MyProductFormProps {
  filter: string;
  onFilterChange: (value: string) => void;
}

export const MyProductForm: FC<MyProductFormProps> = ({ filter, onFilterChange }) => {
  return (
    <form className="inline-block">
      <label htmlFor="timeFilter" className="sr-only">
        기간 필터
      </label>
      <select
        id="timeFilter"
        name="timeFilter"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="
          border border-gray-300 rounded-md
          px-3 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
        "
      >
        <option value="all">전체 기간</option>
        <option value="week">지난 주</option>
        <option value="month">지난 달</option>
        <option value="year">지난 해</option>
      </select>
    </form>
  );
};
