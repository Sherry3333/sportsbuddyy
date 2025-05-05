import { Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import NotFound from "./pages/404";
import {seedToken} from '@/assets/seedToken';
function App() {
  return (
    <>
      <ConfigProvider theme={{token:{...seedToken}}}>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </ConfigProvider>
    </>
  );
}

export default App;
