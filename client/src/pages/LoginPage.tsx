import { loginRequest, profileRequest } from "../api/auth";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
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
  {
    /* <form onSubmit={handleSubmit}>
      <input className="font-sans" type="email" placeholder="email@email.com" />
      <input className="font-sans" type="password" placeholder="******" />
      <button className="font-sans">Login</button>
      <Button>LOGIN SHADCN</Button>
    </form> */
  }
  return (
    <main className="h-screen flex w-full">
      <div className="bg-primary-foreground w-full h-full flex p-16"></div>
      <section className="flex items-center justify-center bg-background h-full max-w-3xl w-full p-4">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tighter">
              Entrar con su contraseña
            </CardTitle>
            <CardDescription>
              Utilice su e-mail y contraseña o GitHub para entrar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  className="font-sans"
                  type="email"
                  placeholder="examplel@email.com"
                />
              </div>

              <div className="mt-4">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  className="font-sans"
                  type="password"
                  placeholder="******"
                />
              </div>

              <Button className="mt-6 w-full">Entrar</Button>

              <div className="flex items-center gap-6">
                <Separator />
                <span className="text-xs text-muted-foreground">or</span>
                <Separator />
              </div>
              <Button variant={"outline"} className="mt-6 w-full">Registrar</Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
