import { loginRequest, profileRequest } from "../api/auth";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";
import b1 from "../assets/b1.svg";
import b2 from "../assets/b2.svg";

export function LoginPage() {
  const setToken = useAuthStore((state) => state.setToken);
  const setProfile = useAuthStore((state) => state.setProfile);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Convertimos el evento al tipo correcto
    const submitter = (e.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;
    const buttonType = submitter.name;

    console.log(buttonType);
    if (buttonType === "register") {
      navigate("/register");
      return;
    } else if (buttonType === "login") {
      const email = (e?.currentTarget.elements[0] as HTMLInputElement).value;
      const password = (e?.currentTarget.elements[1] as HTMLInputElement).value;

      const resLogin = await loginRequest(email, password);
      setToken(resLogin.data.token);

      const resProfile = await profileRequest();
      setProfile(resProfile.data.profile);

      const lastPath = localStorage.getItem("lastPath");
      localStorage.removeItem("lastPath");
      console.log("lastPath", lastPath);
      navigate(lastPath? lastPath : "", {replace: true});
      // navigate("/profile");

      console.log(resProfile);
    }
  };

  return (
    <main className="h-screen flex w-full">
      <div className="hidden md:flex bg-primary-foreground w-full h-full p-16 items-center justify-center">
        <Carousel
          className="w-full max-w-xl"
          autoplay={5500}
          // plugins={[Autoplay({ delay: 1000 })]}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            <CarouselItem>
              <div className="flex aspect-square rounded p-8">
                <img src={b1} alt="business1" />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex aspect-square rounded p-8">
                <img src={b2} alt="business2" />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <section className="flex items-center justify-center bg-background h-full max-w-3xl w-full p-4">
        <Card className="w-full max-w-md">
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

              <Button type="submit" name="login" className="mt-6 w-full">
                Entrar
              </Button>

              <div className="flex items-center gap-6 mt-4">
                <Separator />
                <span className="text-xs text-muted-foreground">or</span>
                <Separator />
              </div>
              <Button
                type="submit"
                name="register"
                variant={"outline"}
                className="mt-4 w-full"
              >
                Registrar
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-muted-foreground text-center text-sm">
              Al entrar en la plataforma usted esta de acuerdo con nuestros
              terminos de uso y politica de privacidad{" "}
            </p>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
