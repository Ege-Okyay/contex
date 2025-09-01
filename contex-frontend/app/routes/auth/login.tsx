import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Form, useActionData, useNavigation } from "react-router";
import type { Route } from "../../+types/root";
import { api } from "~/api/http";
import { Loader2Icon } from "lucide-react";
import { loginSchema } from "~/schemas/auth";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  const result = loginSchema.safeParse(values);
  if (!result.success) {
    return {
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const { username, password } = result.data;

  try {
    const data = await api<{ access_token: string }>("/auth/login", {
      method: "POST",
      body: { username, password }
    });

    console.log("Access Token: ", data.access_token);

    return { success: true, access_token: data.access_token };
  } catch (error) {
    console.error("Login failed:", error);
    return {
      success: false,
      formError: (error as Error).message
    };
  }
}

export default function LoginForm() {
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" className="grid gap-3">
      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        name="username"
        placeholder="john_doe"
        required
      />
      {actionData?.fieldErrors?.username && (
        <p className="text-sm text-red-500">
          {actionData.fieldErrors.username}
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
      {actionData?.fieldErrors?.password && (
        <p className="text-sm text-red-500">
          {actionData.fieldErrors.password}
        </p>
      )}

      {actionData?.formError && (
        <p className="text-sm text-red-500">{actionData.formError}</p>
      )}
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          "Login"
        )}
      </Button>
    </Form>
  );
}
