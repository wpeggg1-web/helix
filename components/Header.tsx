import Link from "next/link";
import { brand } from "@/lib/data";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-3 h-3 rounded-sm bg-cyan shadow-[0_0_8px_rgba(0,212,255,0.5)]" />
          <span className="font-bold tracking-tight text-sm">{brand.name}</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
          <Link href="/receipts" className="px-2.5 py-1.5 text-muted hover:text-foreground transition-colors">Receipts</Link>
          <Link href="/sdk" className="px-2.5 py-1.5 text-muted hover:text-foreground transition-colors">SDK</Link>
          <Link href="/leaderboard" className="px-2.5 py-1.5 text-muted hover:text-foreground transition-colors">Leaderboard</Link>
          <Link href="/token" className="px-2.5 py-1.5 text-amber hover:text-amber transition-colors">$AEGIS</Link>
        </nav>
      </div>
    </header>
  );
}
