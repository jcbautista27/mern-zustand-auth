import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
export function ProfilePage() {
  const logout = useAuthStore((state) => state.logout);
  const profile = useAuthStore((state) => state.profile);
  const navigate = useNavigate();

  return (
    <>
      <div>{JSON.stringify(profile)}</div>
      <div>ProfilePage</div>
      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </>
  );
}
