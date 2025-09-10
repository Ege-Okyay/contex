import type { Route } from "../../+types/root";
import { ContexLogo } from "~/components/contex-logo";
import { Outlet, redirect } from "react-router";
import { api } from "~/api/http";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Contex | Authentication" }
  ]
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const path = url.pathname;

  const res = await api<{ completed: boolean }>("/setup/status");

  if (!res.success) {
    console.error("Failed to load setup status:", res.error);
    throw new Response("Failed to load setup status", { status: 500 });
  }

  const completed = res.data.completed;

  if (!completed && path.endsWith("/login")) return redirect("/auth/register");
  if (completed && path.endsWith("/register")) return redirect("/auth/login");

  if (path === "/auth") return redirect(completed ? "/auth/login" : "/auth/register");

  return null;
}

export default function Auth() {
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
            <h1 className="text-xl font-bold">
              Contex - AI Content Generator
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Outlet />
        </div>
        <div className="mt-6 text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          Contex is an fully open-source AI blog generator and CMS tool
          made by <a href="#">Ege Okyay</a>
        </div>
      </div>
    </div>
  );
}
