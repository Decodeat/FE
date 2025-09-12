import { useState } from "react";
import type { ReactNode } from "react";

interface MessageModalState {
  isOpen: boolean;
  title?: string;
  message: string | ReactNode;
  type: "success" | "error" | "warning" | "info";
  buttons?: Array<{
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "danger";
  }>;
  icon?: ReactNode;
}

export const useMessageModal = () => {
  const [modalState, setModalState] = useState<MessageModalState>({
    isOpen: false,
    message: "",
    type: "info",
  });

  const showModal = (options: Omit<MessageModalState, "isOpen">) => {
    setModalState({
      ...options,
      isOpen: true,
    });
  };

  const hideModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  // 편의 메서드들
  const showSuccess = (
    message: string | ReactNode,
    title?: string,
    buttons?: MessageModalState["buttons"],
  ) => {
    showModal({ message, title, type: "success", buttons });
  };

  const showError = (
    message: string | ReactNode,
    title?: string,
    buttons?: MessageModalState["buttons"],
  ) => {
    showModal({ message, title, type: "error", buttons });
  };

  const showWarning = (
    message: string | ReactNode,
    title?: string,
    buttons?: MessageModalState["buttons"],
  ) => {
    showModal({ message, title, type: "warning", buttons });
  };

  const showInfo = (
    message: string | ReactNode,
    title?: string,
    buttons?: MessageModalState["buttons"],
  ) => {
    showModal({ message, title, type: "info", buttons });
  };

  // 확인/취소 모달
  const showConfirm = (
    message: string | ReactNode,
    onConfirm: () => void,
    title?: string,
    confirmLabel = "확인",
    cancelLabel = "취소",
  ) => {
    showModal({
      message,
      title,
      type: "warning",
      buttons: [
        { label: cancelLabel, onClick: hideModal, variant: "secondary" },
        {
          label: confirmLabel,
          onClick: () => {
            onConfirm();
            hideModal();
          },
          variant: "primary",
        },
      ],
    });
  };

  return {
    modalState,
    showModal,
    hideModal,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
  };
};
