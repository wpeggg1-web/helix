import Link from "next/link";
import Reveal from "@/components/Reveal";
import ComparisonTable from "@/components/ComparisonTable";
import InferenceLog from "@/components/InferenceLog";
import NodeCard from "@/components/NodeCard";
import { brand, stats, nodes, liveFeed, threatTypes } from "@/lib/data";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan/[0.04] blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16">
          <Reveal>
            <div className="flex items-center gap-2 mb-6 text-xs">
              <span className="px-2 py-1 border border-border rounded text-dim font-mono">v0.1.0</span>
              <span className="text-dim">·</span>
              <span className="text-dim font-mono">{brand.network} · pre-launch</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[1.05] mb-6 max-w-4xl">
              {brand.tagline.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="gradient-cyan-magenta">{brand.tagline.split(" ").slice(-2).join(" ")}</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-muted text-lg max-w-2xl mb-8 leading-relaxed">{brand.subtitle}</p>
          </Reveal>
          <Reveal delay={300}>
            <div className="flex flex-wrap gap-3 mb-12">
              <Link href="/sdk" className="btn-primary">Run a node →</Link>
              <Link href="/inference" className="btn-secondary">See live inferences</Link>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
              {[
                { label: "nodes online", value: stats.nodesOnline.toLocaleString(), accent: "text-cyan" },
                { label: "inferences logged", value: stats.inferencesLogged.toLocaleString(), accent: "text-magenta" },
                { label: "pass rate", value: `${stats.passRate}%`, accent: "text-green" },
                { label: "$HELIX staked", value: stats.totalStaked, accent: "text-amber" },
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-border pl-4">
                  <div className={`text-2xl font-bold font-mono ${s.accent}`}>{s.value}</div>
                  <div className="text-dim text-[10px] uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-border">
        <Reveal>
          <div className="text-dim text-xs font-mono mb-3">/ 01 · the gap</div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Standard API <span className="text-dim">vs.</span> Helix-verified.</h2>
          <p className="text-muted mb-8 max-w-2xl">Same models, same APIs. The difference is what gets written to chain — and who has skin in the game when it&apos;s wrong.</p>
          <ComparisonTable />
        </Reveal>
      </section>

      {/* INFERENCE FEED PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-border">
        <Reveal>
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="text-dim text-xs font-mono mb-3">/ 02 · live feed</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Every inference, signed and provable.</h2>
              <p className="text-muted max-w-2xl">PASS / PAUSE / DENY — written to Base in real time. Anyone can verify any inference from any node.</p>
            </div>
            <Link href="/inference" className="text-cyan text-sm hover:underline hidden sm:inline">all inferences →</Link>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <InferenceLog limit={8} />
        </Reveal>
      </section>

      {/* THREATS */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-border">
        <Reveal>
          <div className="text-dim text-xs font-mono mb-3">/ 03 · threat console</div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Caught before they reach the model.</h2>
          <p className="text-muted max-w-2xl mb-8">Helix doesn&apos;t score vague risk. It detects concrete prompt patterns and blocks them at the inference edge.</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {threatTypes.map((t, i) => (
            <Reveal key={t.kind} delay={i * 50}>
              <div className="card p-4 flex items-start gap-3">
                <div className={`px-2 py-0.5 text-[10px] font-bold border rounded font-mono whitespace-nowrap ${
                  t.verdict === "DENY"  ? "text-red border-red/30 bg-red/5" :
                  "text-amber border-amber/30 bg-amber/5"
                }`}>
                  {t.verdict}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-sm text-cyan mb-1">{t.kind}</div>
                  <div className="text-muted text-xs mb-1 font-mono truncate">{t.sample}</div>
                  <div className="text-dim text-[11px]">catches: <span className="text-foreground">{t.catches}</span></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LEADERBOARD PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-border">
        <Reveal>
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="text-dim text-xs font-mono mb-3">/ 04 · node leaderboard</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Top nodes by uptime + stake.</h2>
              <p className="text-muted">Sorted by composite score: stake weight, uptime %, and inferences served.</p>
            </div>
            <Link href="/nodes" className="text-cyan text-sm hover:underline hidden sm:inline">full leaderboard →</Link>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {nodes.slice(0, 6).map((n) => <NodeCard key={n.id} node={n} />)}
          </div>
        </Reveal>
      </section>

      {/* LIVE FEED */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-border">
        <Reveal>
          <div className="text-dim text-xs font-mono mb-3">/ 05 · network pulse</div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">What just happened.</h2>
        </Reveal>
        <Reveal delay={200}>
          <div className="card p-1">
            <ul className="divide-y divide-border">
              {liveFeed.map((e, i) => (
                <li key={i} className="px-4 py-3 flex items-center gap-3 text-sm">
                  <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border ${
                    e.kind === "launch"      ? "text-cyan border-cyan/30" :
                    e.kind === "node_online" ? "text-green border-green/30" :
                    e.kind === "node_slash"  ? "text-red border-red/30" :
                    e.kind === "threat"      ? "text-amber border-amber/30" :
                    e.kind === "model_added" ? "text-magenta border-magenta/30" :
                    "text-muted border-border"
                  }`}>{e.kind}</span>
                  <span className="text-foreground flex-1">{e.text}</span>
                  <span className="text-dim text-xs font-mono">{e.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* TOKEN CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-border">
        <Reveal>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-dim text-xs font-mono mb-3">/ 06 · $HELIX</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Stake to run. Pay to call.</h2>
              <p className="text-muted mb-6">$HELIX is the work token. Operators stake to run nodes and earn per inference. Callers pay in $HELIX per token-out. Token launches on Virtuals — Base chain.</p>
              <Link href="/token" className="btn-primary">$HELIX utility →</Link>
            </div>
            <div className="card p-6 border-magenta/30 glow-magenta">
              <div className="text-magenta text-xs font-mono mb-3">utility functions</div>
              <ul className="space-y-3 text-sm">
                {[
                  ["01", "Pay per inference", "Caller → node, $HELIX per token-out"],
                  ["02", "Stake to run a node", "Operator stake, slashable for false outputs"],
                  ["03", "Vouch for model version", "Back a model, rewarded if popular"],
                  ["04", "Dispute bond", "Challenge output, refunded if upheld"],
                  ["05", "Governance", "Vote on whitelist + fee tiers"],
                ].map(([n, t, d]) => (
                  <li key={n} className="flex gap-3">
                    <span className="text-magenta font-mono text-xs pt-0.5">{n}</span>
                    <div>
                      <div className="text-foreground font-semibold">{t}</div>
                      <div className="text-muted text-xs">{d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
