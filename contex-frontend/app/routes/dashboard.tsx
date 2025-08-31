import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contex | Dashboard" }
  ]
}

export default function Dashboard() {
  return (
    <h1>Dashboard</h1>
  )
}
