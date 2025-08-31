interface Props {
  width: number;
  height: number;
}

export function ContexLogo({ width, height }: Props) {
  return (
    <div className="p-2 rounded-xl bg-gradient-to-br from-zinc-800 to-black border border-zinc-800 shadow-lg">
      <svg
        className={`w-${width} h-${height} text-zinc-200`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.5 0 4.77 1.02 6.42 2.67" />
      </svg>
    </div>
  );
}
