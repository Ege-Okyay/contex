import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function LoginForm() {
  return (
    <form className="grid gap-3">
      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        placeholder="john_doe"
        required
      />
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type="password"
        placeholder="**********"
        required
      />
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}
