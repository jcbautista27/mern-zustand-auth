import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import {
  HomePage,
  ProfilePage,
  RegisterPage,
  LoginPage,
  DashboardPage,
  Navbar,
} from "./pages/index";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import { useAuthStore } from "./store/auth";

function App() {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute isAllowed={isAuth}>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route element={<PublicRoute isAllowed={isAuth} />}>
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedRoute isAllowed={isAuth} />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
