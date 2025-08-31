import { RegisterForm } from "~/components/auth/register-form";
import type { Route } from "../+types/root";
import { LoginForm } from "~/components/auth/login-form";
import { ContexLogo } from "~/components/contex-logo";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Contex | Authentication" }
  ]
}

export default function Auth() {
  const status = false;

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6 mb-5">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <ContexLogo width={10} height={10} />
              <span className="sr-only">Contex</span>
            </a>
            <h1 className="text-xl font-bold">Welcome back to Contex</h1>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {
            (status) ?
              <LoginForm />
              :
              <RegisterForm />
          }
        </div>
        <div className="mt-6 text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          Contex is an fully open-source AI blog generator and CMS tool
          made by <a href="#">Ege Okyay</a>
        </div>
      </div>
    </div>
  );
}
