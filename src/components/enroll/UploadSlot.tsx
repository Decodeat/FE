import React, { useRef } from "react";
import type { ChangeEvent } from "react";
import { Camera, X } from "lucide-react";

interface UploadSlotProps {
  preview: string | null;
  onChange: (file: File | null) => void;
  onClear: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}

const UploadSlot: React.FC<UploadSlotProps> = ({
  preview,
  onChange,
  onClear,
  disabled = false,
  ariaLabel = "사진 업로드",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange(file);
  };

  const hasPreview = Boolean(preview);
  const clickable = !hasPreview && !disabled;

  return (
    <div
      className={`
        relative
        w-28 sm:w-32 md:w-[150px] lg:w-[180px]
        aspect-square
        border-2 border-dashed border-gray-300 rounded-lg bg-white
        flex items-center justify-center transition-colors
        ${clickable ? "cursor-pointer hover:border-gray-400" : "cursor-default"}
      `}
    >
      {hasPreview ? (
        <>
          <img
            src={preview!}
            alt="업로드 미리보기"
            className="object-cover w-full h-full rounded-lg"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="absolute top-2 right-2 p-1 bg-white/90 rounded-full hover:bg-white shadow"
            aria-label="사진 지우기"
            disabled={disabled}
          >
            <X className="w-4 h-4 text-gray-700" />
          </button>
        </>
      ) : (
        <div className="space-y-2 text-center text-gray-500 pointer-events-none">
          <Camera className="mx-auto w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-gray-400" />
          <p className="text-[12px] sm:text-xs md:text-sm">사진 업로드</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className={`absolute inset-0 w-full h-full opacity-0 ${
          clickable ? "cursor-pointer" : "pointer-events-none"
        }`}
        aria-label={ariaLabel}
        disabled={!clickable}
      />
    </div>
  );
};

export default UploadSlot;
