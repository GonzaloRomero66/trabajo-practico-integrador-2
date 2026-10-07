import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/NavBar";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
