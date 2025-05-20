import { loginRequest } from "../api/auth";
import { userAuthStore } from "../store/auth";

function LoginPage() {
  const setToken = userAuthStore((state) => state.setToken);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e?.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e?.currentTarget.elements[1] as HTMLInputElement).value;
    const resLogin = await loginRequest(email, password);

    setToken(resLogin.data.token);
    console.log(resLogin);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="email@email.com" />
      <input type="password" placeholder="******" />
      <button>Login</button>
    </form>
  );
}
export default LoginPage;
