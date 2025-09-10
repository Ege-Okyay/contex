import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useFetcher, useNavigate } from "react-router";
import { api } from "~/api/http";
import { Loader2Icon } from "lucide-react";
import { loginSchema } from "~/schemas/auth";
import type { Route } from "./+types/login";
import { useEffect } from "react";
import { toast } from "sonner";
import { FieldError } from "~/components/form/field-error";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  const result = loginSchema.safeParse(values);
  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors
    };
  }

  const { username, password } = result.data;

  const res = await api<{ access_token: string}>("/auth/login", {
    method: "POST",
    body: { username, password },
  });

  if (!res.success) {
    return {
      success: false,
      formError: res.error.message,
      statusCode: res.error.statusCode
    };
  }

  console.log(res.data);

  return { success: true, token: res.data.access_token };
}

export default function LoginForm() {
  const fetcher = useFetcher<typeof action>();
  const { data: fetcherData, state } = fetcher;
  const isSubmitting = state === "submitting";
  const navigate = useNavigate();

  useEffect(() => {
    if (fetcherData?.success) {
      toast.success("Logged in successfully", {
        description: "Redirecting to dashboard...",
      });
  
      navigate("/", { replace: true });
    }
  }, [fetcherData?.success, navigate, toast]);

  return (
    <fetcher.Form method="post" className="grid gap-3">
      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        name="username"
        placeholder="john_doe"
        required
      />
      <FieldError error={fetcherData?.fieldErrors?.username} />

      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="**********"
        required
      />
      <FieldError error={fetcherData?.fieldErrors?.password} />

      {fetcherData?.formError && (
        <p className="text-sm text-red-500">{fetcherData.formError}</p>
      )}
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2Icon className="animate-spin mr-1" />}
        Login
      </Button>
    </fetcher.Form>
  );
}
