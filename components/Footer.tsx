import { brand, token } from "@/lib/data";

export default function Footer() {
  const live = token.status === "live";
  return (
    <footer className="border-t border-border bg-background/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-mono text-xs">
          {brand.name} · {brand.tagline}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
          <a href="https://github.com" className="hover:text-foreground transition-colors">GitHub</a>
          <a href="https://x.com/aegisagent" className="hover:text-foreground transition-colors">X</a>
          {live && token.virtuals && (
            <a href={token.virtuals} target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors">Virtuals</a>
          )}
          <a href="https://github.com/quivermcp" className="hover:text-foreground transition-colors">Quiver ↗</a>
        </div>
      </div>
    </footer>
  );
}
