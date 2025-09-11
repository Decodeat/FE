import { AlertCircle } from "lucide-react";
import Modal from "./Modal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mb-4">
          <AlertCircle className="w-6 h-6 text-yellow-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">로그인이 필요합니다</h3>
        <p className="text-sm text-gray-500 mb-6">
          세션이 만료되었습니다. 계속 사용하려면 로그인해주세요.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            onClick={onLogin}
            className="flex-1 px-4 py-2 bg-[#2D5945] text-white rounded-md hover:bg-[#1e3a2e] transition-colors"
          >
            로그인하러 가기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
