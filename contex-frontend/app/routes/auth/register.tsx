import {  useFetcher, useRevalidator } from "react-router";
import { api } from "~/api/http";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Route } from "./+types/register";
import { registerSchema } from "~/schemas/auth";
import { useEffect } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { FieldError } from "~/components/form/field-error";

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

  const res = await api("/auth/register", {
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

  return { success: true };
}

export default function RegisterForm() {
  const fetcher = useFetcher<typeof action>();
  const { data: fetcherData, state } = fetcher;
  const isSubmitting = state === "submitting";
  const revalidator = useRevalidator();

  useEffect(() => {
    if (fetcherData?.success) {
      toast.success("Setup completed successfully", {
        description: "Redirecting to login...",
      });
      
      revalidator.revalidate();
    }
  }, [fetcherData?.success, revalidator]);

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

      <Label htmlFor="passwordConfirm">Confirm Password</Label>
      <Input
        id="passwordConfirm"
        name="passwordConfirm"
        type="password"
        placeholder="**********"
        required
      />
      <FieldError error={fetcherData?.fieldErrors?.passwordConfirm} />

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
