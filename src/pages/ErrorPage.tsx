import React from "react";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import { AlertTriangle, Home, ArrowLeft, LifeBuoy } from "lucide-react";

const getErrorMessage = (err: unknown): string => {
  if (isRouteErrorResponse(err)) {
    const data = (err as { data?: unknown }).data;
    if (typeof data === "string") return data;
    if (data && typeof data === "object") return JSON.stringify(data);
    return err.statusText || "오류가 발생했습니다";
  }
  if (err instanceof Error) return err.message;
  return "잠시 후 다시 시도해 주세요.";
};

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  const status: number = isRouteErrorResponse(error) ? error.status : 500;
  const title: string = isRouteErrorResponse(error)
    ? error.statusText || "오류가 발생했습니다"
    : "오류가 발생했습니다";
  const message: string = getErrorMessage(error);
  const isDev = import.meta.env.MODE !== "production";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7 text-emerald-600" />
        </div>
        <h1 className="mt-4 text-3xl font-bold">{status}</h1>
        <p className="mt-1 text-lg font-medium text-gray-900">{title}</p>
        <p className="mt-2 text-sm text-gray-600">{message}</p>

        {/* 버튼들 */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <Home className="w-4 h-4" /> 홈으로 가기
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" /> 이전 페이지
          </button>
          <Link
            to="/support"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            <LifeBuoy className="w-4 h-4" /> 문의하기
          </Link>
        </div>

        {/* 오류 상세 (개발 환경에서만) */}
        {isDev && !!error && (
          <details className="mt-6 text-left text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
            <summary className="cursor-pointer select-none">오류 상세</summary>
            <pre className="mt-2 whitespace-pre-wrap break-words">
              {JSON.stringify(error, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
