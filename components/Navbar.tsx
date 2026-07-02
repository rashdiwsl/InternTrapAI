import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-white/5 border border-border">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4c8cf2"
              strokeWidth="2"
            >
              <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3z" />
            </svg>
          </span>
          <span className="font-semibold tracking-tight">InternTrap AI</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          <Link href="/how-it-works" className="hover:text-white transition-colors">
            How it works
          </Link>
          <Link href="/#analyze" className="hover:text-white transition-colors">
            Analyze
          </Link>
          <Link
            href="/dashboard"
            className="bg-white text-black text-sm font-medium px-4 py-2 rounded-md hover:bg-white/90 transition-colors"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
