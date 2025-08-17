import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Cart from "./pages/Cart";
import Pizza from "./pages/Pizza";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeProvider";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthOnlyRedirect from "./components/AuthOnlyRedirect";

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("bg-dark", "text-white");
      document.body.classList.remove("bg-light", "text-dark");
    } else {
      document.body.classList.add("bg-light", "text-dark");
      document.body.classList.remove("bg-dark", "text-white");
    }
  }, [theme]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Bloquear login/register si YA hay sesión */}
        <Route path="/login" element={<AuthOnlyRedirect><LoginPage /></AuthOnlyRedirect>}/>
        <Route path="/register" element={<AuthOnlyRedirect><RegisterPage /></AuthOnlyRedirect>}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:idpizza" element={<Pizza />} />
        {/* Proteger /profile: si no hay sesión -> /login */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
