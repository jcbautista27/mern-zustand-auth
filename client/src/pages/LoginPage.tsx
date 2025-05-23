import { loginRequest, profileRequest } from "../api/auth";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const setToken = useAuthStore((state) => state.setToken);
  const setProfile = useAuthStore((state) => state.setProfile);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e?.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e?.currentTarget.elements[1] as HTMLInputElement).value;

    const resLogin = await loginRequest(email, password);
    setToken(resLogin.data.token);

    const resProfile = await profileRequest();
    setProfile(resProfile.data.profile);

    navigate("/profile");

    console.log(resProfile);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="email@email.com" />
      <input type="password" placeholder="******" />
      <button>Login</button>
    </form>
  );
}
