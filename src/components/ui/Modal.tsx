import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

type Size = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  /** 프리셋 크기 (기본: md). 문자열로 직접 Tailwind 클래스 전달도 가능 */
  maxWidth?: Size | string;
  /** 내용 패딩 클래스 (기본: p-6) */
  paddingClassName?: string;
  /** 백드롭 클릭 시 닫기 (기본: true) */
  closeOnBackdrop?: boolean;
  /** 모달 외곽 클래스 확장 */
  className?: string;
}

const sizeClasses: Record<Size, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
};

const Modal = ({
  isOpen,
  onClose,
  children,
  maxWidth = "md",
  paddingClassName = "p-6",
  closeOnBackdrop = true,
  className = "",
}: ModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // 열릴 때 body 스크롤 잠금 + ESC 닫기
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    // 최초 포커스
    setTimeout(() => dialogRef.current?.focus(), 0);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWClass =
    typeof maxWidth === "string" && maxWidth in sizeClasses
      ? sizeClasses[maxWidth as Size]
      : typeof maxWidth === "string"
        ? maxWidth // 커스텀 클래스 전달 시
        : sizeClasses.md;

  const handleBackdropClick = () => {
    if (closeOnBackdrop) onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* 백드롭 */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-[1px] opacity-100 transition-opacity"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* 모달 컨테이너 */}
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            className={`relative w-full ${maxWClass} bg-white rounded-2xl shadow-xl outline-none transform transition-all
                        animate-in fade-in-0 zoom-in-95 ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              type="button"
              onClick={onClose}
              aria-label="닫기"
              className="absolute top-4 right-4 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 내용 */}
            <div className={paddingClassName}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
