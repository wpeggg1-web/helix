import Link from "next/link";
import Reveal from "@/components/Reveal";
import { brand, token } from "@/lib/data";

export const metadata = { title: "$HELIX Token" };

export default function TokenPage() {
  const live = token.status === "live";
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Reveal>
        <div className="text-dim text-xs font-mono mb-3">/ $HELIX</div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          {live ? "$HELIX is live." : "$HELIX is launching soon."}
        </h1>
        <p className="text-muted max-w-2xl mb-12">
          {live
            ? `Contract address: ${token.ca}. Trade on Virtuals. Stake to run a node, pay per inference, govern the protocol.`
            : "Token deploys on Virtuals (Base). Until launch, no fake CA, no fake holders. Connect with the team below to be notified at launch."}
        </p>
      </Reveal>

      {live ? (
        <Reveal delay={150}>
          <div className="card p-6 mb-12 border-cyan/30 glow-cyan">
            <div className="flex items-center justify-between mb-4">
              <div className="text-cyan text-xs font-mono">status · live</div>
              <div className="text-dim text-xs font-mono">chain · Base (8453)</div>
            </div>
            <div className="mb-4">
              <div className="text-dim text-xs font-mono mb-1">contract address</div>
              <a
                href={token.basescan}
                target="_blank"
                rel="noreferrer"
                className="text-cyan font-mono text-sm hover:underline break-all"
              >
                {token.ca}
              </a>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href={token.virtuals} target="_blank" rel="noreferrer" className="btn-primary">Buy on Virtuals →</a>
              <a href={token.basescan} target="_blank" rel="noreferrer" className="btn-secondary">Basescan ↗</a>
            </div>
          </div>
        </Reveal>
      ) : (
        <Reveal delay={150}>
          <div className="card p-6 mb-12 border-amber/30">
            <div className="text-amber text-xs font-mono mb-2">status · not launched</div>
            <p className="text-muted text-sm mb-4">
              Token has not been deployed yet. When it launches on Virtuals, this page will show:
            </p>
            <ul className="space-y-1 text-sm font-mono">
              <li>· Contract address (CA)</li>
              <li>· Basescan + Virtuals links</li>
              <li>· Live holder count + LP depth</li>
              <li>· Distribution breakdown</li>
            </ul>
          </div>
        </Reveal>
      )}

      <Reveal delay={200}>
        <h2 className="text-2xl font-bold mb-6">Utility (5 functions)</h2>
        <div className="grid md:grid-cols-2 gap-3 mb-12">
          {token.utility.map((u, i) => (
            <div key={u.name} className="card p-5">
              <div className="flex items-start gap-3">
                <span className="text-magenta font-mono text-xs pt-0.5">0{i + 1}</span>
                <div>
                  <div className="font-semibold text-foreground mb-1">{u.name}</div>
                  <div className="text-muted text-sm">{u.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={300}>
        <h2 className="text-2xl font-bold mb-6">Distribution</h2>
        <div className="card p-6 mb-12">
          <div className="space-y-3">
            {token.distribution.map((d) => (
              <div key={d.label} className="flex items-center gap-3">
                <div className="w-32 text-sm text-muted">{d.label}</div>
                <div className="flex-1 h-6 bg-border/30 rounded overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan to-magenta"
                    style={{ width: `${d.pct * 2}%` }}
                  />
                </div>
                <div className="w-12 text-right font-mono text-sm text-cyan">{d.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={400}>
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-3">
            {live ? "Run a node. Earn $HELIX." : "Get notified at launch"}
          </h2>
          <p className="text-muted text-sm mb-4">
            {live ? (
              <>
                Token is live on Virtuals (Base). Buy $HELIX to pay per inference or stake to run a node.
                Follow <a href={`https://x.com/${brand.x}`} className="text-cyan hover:underline" target="_blank" rel="noreferrer">@{brand.x}</a> on X for ecosystem updates.
                Star <a href={`https://github.com/${brand.github}`} className="text-cyan hover:underline" target="_blank" rel="noreferrer">the GitHub repo</a> for SDK updates.
              </>
            ) : (
              <>
                Follow <a href={`https://x.com/${brand.x}`} className="text-cyan hover:underline" target="_blank" rel="noreferrer">@{brand.x.replace("_", "")}</a> on X for the announcement.
                Or <a href={`https://github.com/${brand.github}`} className="text-cyan hover:underline" target="_blank" rel="noreferrer">star the GitHub repo</a> for SDK updates.
              </>
            )}
          </p>
          <div className="flex gap-2 flex-wrap">
            <Link href="/sdk" className="btn-primary">SDK overview</Link>
            <Link href="/inference" className="btn-secondary">Live feed</Link>
            {live && <a href={token.virtuals} target="_blank" rel="noreferrer" className="btn-secondary">Trade $HELIX →</a>}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
