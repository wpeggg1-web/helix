import Link from "next/link";
import { brand } from "@/lib/data";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-cyan font-bold text-lg tracking-tight">{brand.name}</span>
          <span className="text-dim text-xs hidden sm:inline">/ {brand.domain}</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link href="/inference" className="px-3 py-1.5 text-muted hover:text-foreground transition">Inference</Link>
          <Link href="/nodes" className="px-3 py-1.5 text-muted hover:text-foreground transition">Nodes</Link>
          <Link href="/sdk" className="px-3 py-1.5 text-muted hover:text-foreground transition">SDK</Link>
          <Link href="/token" className="px-3 py-1.5 text-magenta hover:text-magenta transition font-semibold">$HELIX</Link>
        </nav>
      </div>
    </header>
  );
}
