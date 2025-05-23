import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  HomePage,
  ProfilePage,
  RegisterPage,
  LoginPage,
  Navbar,
} from "./pages/index";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuthStore } from "./store/auth";

function App() {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute isAllowed={isAuth} />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
