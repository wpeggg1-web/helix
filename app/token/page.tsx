import Link from "next/link";
import Reveal from "@/components/Reveal";
import { brand, token } from "@/lib/data";

export const metadata = { title: "$AEGIS — Token" };

export default function TokenPage() {
  const live = token.status === "live";
  return (
    <div className="relative">
      <section className="border-b border-border py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-wider text-amber mb-3">/ ${brand.ticker}</div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{brand.ticker} — the work token.</h1>
            <p className="text-muted max-w-2xl mb-8">
              Stake to vouch for an agent. Post dispute bonds. Pay for oracle queries. Launching on Virtuals — Base chain.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="card p-6 mb-8">
              {live ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="pulse-dot" />
                    <span className="text-xs uppercase tracking-wider font-mono text-green">live</span>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-dim mb-1 font-mono">contract</div>
                    <div className="font-mono text-sm break-all text-cyan">{token.ca}</div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a href={token.virtuals || "#"} target="_blank" rel="noopener noreferrer" className="btn-shine inline-flex items-center gap-2 rounded-lg bg-amber text-black font-semibold px-5 py-2.5 hover:bg-amber/90 transition-colors">
                      trade on virtuals →
                    </a>
                    <a href={token.basescan || "#"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card hover:bg-card-2 px-5 py-2.5 font-semibold transition-colors">
                      basescan ↗
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/5 px-4 py-1.5 text-xs text-amber mb-4 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
                    not launched yet
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Token launch coming.</h2>
                  <p className="text-muted max-w-md mx-auto mb-6 text-sm">
                    $AEGIS deploys on Virtuals (Base chain). When the contract goes live, the CA appears here. No fake metrics until then.
                  </p>
                  <div className="font-mono text-xs text-dim">
                    network: {brand.network} ({brand.networkId}) · 18 decimals
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border py-12 sm:py-16 bg-[#080808]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-bold mb-6">Token utility (5 functions)</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-3">
              {[
                { num: "01", title: "Stake-to-vouch", desc: "Back an agent's reputation. Slashed if your vouch turns out wrong.", color: "cyan" },
                { num: "02", title: "Dispute bond", desc: "Challenge a verdict. Refunded if dispute is upheld by community vote.", color: "amber" },
                { num: "03", title: "Oracle query fee", desc: "Pay $AEGIS to query reputation data, agent stats, receipt proofs.", color: "magenta" },
                { num: "04", title: "Privacy tier", desc: "Pay for ZK-proof receipts. Resource + verdict hidden, receipt itself verifiable.", color: "cyan" },
                { num: "05", title: "Governance", desc: "Vote on protocol parameters: scoring weights, slash thresholds, threat lists.", color: "amber" },
              ].map((u) => {
                const c = u.color === "cyan" ? "border-cyan/30 text-cyan bg-cyan/5" : u.color === "amber" ? "border-amber/30 text-amber bg-amber/5" : "border-magenta/30 text-magenta bg-magenta/5";
                return (
                  <div key={u.num} className="card p-4 flex items-start gap-4">
                    <div className={`w-10 h-10 rounded border flex items-center justify-center font-mono font-bold text-sm flex-shrink-0 ${c}`}>
                      {u.num}
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{u.title}</h3>
                      <p className="text-sm text-muted">{u.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-bold mb-6">Distribution</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-2.5">
              {token.distribution.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>{d.label}</span>
                    <span className="font-mono text-cyan">{d.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-card rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan to-magenta rounded-full"
                      style={{ width: `${d.pct * 2}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-xs text-dim font-mono text-center">
              Distribution design intent — subject to change before mainnet launch.
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
