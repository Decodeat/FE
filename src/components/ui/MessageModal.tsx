import type { ReactNode } from "react";
import Modal from "./Modal";
import { CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";

interface MessageModalButton {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
}

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string | ReactNode;
  type?: "success" | "error" | "warning" | "info";
  buttons?: MessageModalButton[];
  icon?: ReactNode;
}

const typeConfig = {
  success: {
    icon: <CheckCircle2 className="w-12 h-12 text-green-500" />,
    titleColor: "text-green-800",
    bgColor: "bg-white",
  },
  error: {
    icon: <XCircle className="w-12 h-12 text-red-500" />,
    titleColor: "text-red-800",
    bgColor: "bg-white",
  },
  warning: {
    icon: <AlertCircle className="w-12 h-12 text-yellow-500" />,
    titleColor: "text-yellow-800",
    bgColor: "bg-white",
  },
  info: {
    icon: <Info className="w-12 h-12 text-blue-500" />,
    titleColor: "text-blue-800",
    bgColor: "bg-white",
  },
};

const buttonVariants = {
  primary: "bg-[#D2EDE4] hover:bg-[#79CCB1] text-[#2D5945]",
  secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
  danger: "bg-red-100 hover:bg-red-200 text-red-700",
};

const MessageModal = ({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  buttons,
  icon,
}: MessageModalProps) => {
  const config = typeConfig[type];

  // 기본 버튼 설정
  const defaultButtons: MessageModalButton[] = [
    { label: "확인", onClick: onClose, variant: "primary" },
  ];

  const modalButtons = buttons || defaultButtons;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm" closeOnBackdrop={false}>
      <div className={`text-center p-6 ${config.bgColor} rounded-lg`}>
        {/* 아이콘 */}
        <div className="flex justify-center mb-4">{icon || config.icon}</div>

        {/* 제목 */}
        {title && <h3 className={`text-lg font-semibold mb-2 ${config.titleColor}`}>{title}</h3>}

        {/* 메시지 */}
        <div className="text-gray-700 mb-6">
          {typeof message === "string" ? <p className="whitespace-pre-wrap">{message}</p> : message}
        </div>

        {/* 버튼들 */}
        <div className={`flex gap-3 ${modalButtons.length === 1 ? "" : "justify-between"}`}>
          {modalButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                modalButtons.length === 1 ? "w-full" : "flex-1"
              } ${buttonVariants[button.variant || "primary"]}`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default MessageModal;
