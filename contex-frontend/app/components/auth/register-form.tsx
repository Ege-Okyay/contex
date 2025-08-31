import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function RegisterForm() {
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
      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input
        id="confirmPassword"
        type="password"
        placeholder="**********"
        required
      />
      <Button type="submit" className="w-full">
        Finish Setup
      </Button>
    </form>
  );
}
