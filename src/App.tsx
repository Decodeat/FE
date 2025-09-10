import router from "./routes/router";
import { RouterProvider } from "react-router-dom";
import { useUser } from "./hooks/useAuth";

function App() {
  // 앱 시작 시 사용자 정보 자동 로드
  useUser();

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
