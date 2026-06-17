import { brand, token } from "@/lib/data";

export default function Footer() {
  const live = token.status === "live";
  return (
    <footer className="border-t border-border bg-background/60">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-cyan font-bold text-base">{brand.name}</span>
            <span className="text-dim text-xs">·</span>
            <span className="text-muted text-xs">v0.1.0</span>
          </div>
          <p className="text-muted text-xs leading-relaxed">{brand.subtitle}</p>
        </div>
        <div>
          <div className="text-dim text-xs uppercase tracking-wider mb-3">Product</div>
          <ul className="space-y-1.5 text-muted">
            <li><a href="/sdk" className="hover:text-foreground">SDK</a></li>
            <li><a href="/inference" className="hover:text-foreground">Live feed</a></li>
            <li><a href="/nodes" className="hover:text-foreground">Node leaderboard</a></li>
          </ul>
        </div>
        <div>
          <div className="text-dim text-xs uppercase tracking-wider mb-3">Token</div>
          <ul className="space-y-1.5 text-muted">
            <li><a href="/token" className="hover:text-foreground">$HELIX utility</a></li>
            <li>
              {live && token.basescan ? (
                <a href={token.basescan} className="hover:text-foreground" target="_blank" rel="noreferrer">Basescan ↗</a>
              ) : (
                <span className="text-dim">not launched</span>
              )}
            </li>
            {live && token.virtuals ? (
              <li><a href={token.virtuals} className="hover:text-foreground" target="_blank" rel="noreferrer">Virtuals ↗</a></li>
            ) : null}
          </ul>
        </div>
        <div>
          <div className="text-dim text-xs uppercase tracking-wider mb-3">Social</div>
          <ul className="space-y-1.5 text-muted">
            <li><a href={brand.githubUrl} className="hover:text-foreground" target="_blank" rel="noreferrer">GitHub ↗</a></li>
            <li><a href={brand.xUrl} className="hover:text-foreground" target="_blank" rel="noreferrer">X ↗</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between gap-2 text-xs text-dim">
          <div>© 2026 {brand.name}. Open source. MIT.</div>
          <div className="font-mono">base · {brand.network} · {live ? token.ca : "pre-launch"}</div>
        </div>
      </div>
    </footer>
  );
}
