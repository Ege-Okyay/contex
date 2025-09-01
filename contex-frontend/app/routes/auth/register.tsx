import { Form, redirect, useFetcher, useNavigate } from "react-router";
import { api } from "~/api/http";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Route } from "./+types/register";
import { registerSchema } from "~/schemas/auth";
import { useEffect } from "react";
import { Loader2Icon } from "lucide-react";

export async function loader() {
  const status = await api<{ completed: boolean }>("/setup/status");
  if (status.completed) return redirect("/auth/login");

  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  const result = registerSchema.safeParse(values);
  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors
    };
  }

  const { username, password } = result.data;

  try {
    const data = await api<{ access_token: string }>("/auth/register", {
      method: "POST",
      body: { username, password }
    });

    return { success: true, access_token: data.access_token };
  } catch (error) {
    return { success: false, formError: (error as Error).message };
  }
}

export default function RegisterForm() {
  const fetcher = useFetcher<typeof action>();
  const { data: fetcherData, state } = fetcher;
  const navigate = useNavigate();
  const isSubmitting = state === "submitting";

  useEffect(() => {
    if (fetcherData?.success) {
      const timer = setTimeout(() => {
        navigate("/auth/login", { replace: true });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [fetcherData?.success, navigate]);

  return (
    <fetcher.Form method="post" className="grid gap-3">
      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        name="username"
        placeholder="john_doe"
        required
      />
      {fetcherData?.fieldErrors?.username && (
        <p className="text-sm text-red-500">
          {fetcherData.fieldErrors.username}
        </p>
      )}

      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="**********"
        required
      />
      {fetcherData?.fieldErrors?.password && (
        <p className="text-sm text-red-500">
          {fetcherData.fieldErrors.password}
        </p>
      )}

      <Label htmlFor="passwordConfirm">Confirm Password</Label>
      <Input
        id="passwordConfirm"
        name="passwordConfirm"
        type="password"
        placeholder="**********"
        required
      />
      {fetcherData?.fieldErrors?.passwordConfirm && (
        <p className="text-sm text-red-500">
          {fetcherData.fieldErrors.passwordConfirm}
        </p>
      )}

      {fetcherData?.formError && (
        <p className="text-sm text-red-500">{fetcherData.formError}</p>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2Icon className="animate-spin mr-1" />}
        Finish Setup
      </Button>
    </fetcher.Form>
  );
}
