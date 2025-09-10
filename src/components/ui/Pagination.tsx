import leftIcon from "../../assets/icon/ic_Left_28.svg";
import leftIconDisabled from "../../assets/icon/ic_Left_disabled_28.svg";
import rightIcon from "../../assets/icon/ic_Right_28.svg";
import rightIconDisabled from "../../assets/icon/ic_Right_disabled_28.svg";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // 페이지 이동 시 1 ~ totalPages 범위로 클램프
  const goTo = (p: number) => {
    const clamped = Math.min(Math.max(1, p), Math.max(1, totalPages || 1));
    if (clamped !== currentPage) onPageChange(clamped);
  };

  // 페이지 번호 목록 (최대 5개, 실제 totalPages보다 넘지 않음)
  const getPageNumbers = () => {
    const maxButtons = 5;
    if (!totalPages || totalPages <= 0) return [1];

    let start = Math.max(1, currentPage - 2);
    let end = start + maxButtons - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxButtons + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pages = getPageNumbers();
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <div className="flex items-center gap-4">
      {/* 이전 */}
      <button
        onClick={() => goTo(currentPage - 1)}
        disabled={isFirst}
        className="w-11 h-11 flex items-center justify-center rounded-full border-[2px] border-[#D9DADD] cursor-pointer disabled:cursor-not-allowed"
        aria-label="이전 페이지"
      >
        <img src={isFirst ? leftIconDisabled : leftIcon} alt="이전" />
      </button>

      {/* 페이지 번호들 */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => goTo(p)}
          className={`w-11 h-11 flex items-center justify-center rounded-full border-[2px] text-2xl font-medium cursor-pointer ${
            p === currentPage
              ? "border-[#3A3ADB] bg-[#3A3ADB] text-white"
              : "border-[#93959D] text-[#93959D]"
          }`}
          aria-current={p === currentPage ? "page" : undefined}
        >
          {p}
        </button>
      ))}

      {/* 다음 */}
      <button
        onClick={() => goTo(currentPage + 1)}
        disabled={isLast}
        className="w-11 h-11 flex items-center justify-center rounded-full border-[2px] border-[#D9DADD] cursor-pointer disabled:cursor-not-allowed"
        aria-label="다음 페이지"
      >
        <img src={isLast ? rightIconDisabled : rightIcon} alt="다음" />
      </button>
    </div>
  );
};

export default Pagination;
