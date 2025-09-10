export function FieldError({ error }: { error?: string[] }) {
  if (!error || error.length === 0) return null;
  return <p className="text-sm text-red-500">{error[0]}</p>;
}
