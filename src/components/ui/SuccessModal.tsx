import { CheckCircle } from "lucide-react";
import Modal from "./Modal";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const SuccessModal = ({
  isOpen,
  onClose,
  title = "전송 완료",
  message = "신고가 성공적으로 전송되었습니다.",
}: SuccessModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className="text-center">
        {/* 성공 아이콘 */}
        <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>

        {/* 제목 */}
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>

        {/* 메시지 */}
        <p className="text-sm text-gray-500 mb-6">{message}</p>

        {/* 확인 버튼 */}
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          확인
        </button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
