import Link from "next/link";
import Reveal from "@/components/Reveal";
import ComparisonTable from "@/components/ComparisonTable";
import ReceiptLog from "@/components/ReceiptLog";
import AgentCard from "@/components/AgentCard";
import { agents, brand, stats, threatTypes } from "@/lib/data";

export default function Home() {
  return (
    <div className="relative">
      {/* === HERO === */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-grid opacity-30 grid-drift" />
        <div className="absolute inset-0 glow-cyan" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/5 px-3 py-1 text-xs text-cyan mb-6 font-mono">
              <span className="pulse-dot" /> v0.1.0 · base · pre-launch
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6 max-w-4xl">
              <span className="text-shimmer">Reputation</span> that travels
              <br />with your agent.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-lg sm:text-xl text-muted max-w-2xl mb-10 leading-relaxed">
              A drop-in SDK for AI agents. Every action becomes an on-chain receipt.
              Every receipt builds a portable, tamper-evident reputation.
              $AEGIS powers vouching, disputes, and privacy.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/sdk" className="btn-shine inline-flex items-center justify-center gap-2 rounded-lg bg-cyan text-black font-semibold px-6 py-3 hover:bg-cyan/90 transition-colors">
                Add to your agent
                <span>→</span>
              </Link>
              <Link href="/leaderboard" className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card hover:bg-card-2 px-6 py-3 font-semibold transition-colors">
                View leaderboard
              </Link>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-3xl">
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-cyan">{stats.agentsIndexed.toLocaleString()}</div>
                <div className="text-xs text-dim uppercase tracking-wider mt-1">agents indexed</div>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-amber">{stats.receiptsLogged.toLocaleString()}</div>
                <div className="text-xs text-dim uppercase tracking-wider mt-1">receipts logged</div>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-green">{stats.passRate}%</div>
                <div className="text-xs text-dim uppercase tracking-wider mt-1">pass rate</div>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-magenta">{stats.totalStaked}</div>
                <div className="text-xs text-dim uppercase tracking-wider mt-1">$AEGIS staked</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* === COMPARISON === */}
      <section className="border-b border-border py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-12">
              <div className="font-mono text-xs uppercase tracking-wider text-cyan mb-3">/ 01 · the gap</div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Standard agent vs. Aegis-backed agent.</h2>
              <p className="text-muted max-w-2xl">Same SDK surface. Same API. The difference is what happens before the action runs, and what gets written after.</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ComparisonTable />
          </Reveal>
        </div>
      </section>

      {/* === RECEIPT LOG === */}
      <section className="border-b border-border py-16 sm:py-24 bg-[#080808]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-12">
              <div className="font-mono text-xs uppercase tracking-wider text-amber mb-3">/ 02 · receipt log</div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Every action, signed and logged.</h2>
              <p className="text-muted max-w-2xl">PASS, PAUSE, or DENY — written as a tamper-evident receipt on Base. Aggregated into a reputation score anyone can verify.</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ReceiptLog limit={8} />
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-6 text-center">
              <Link href="/receipts" className="text-cyan hover:underline text-sm font-mono">
                see all 42,109 receipts →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* === THREATS === */}
      <section className="border-b border-border py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-12">
              <div className="font-mono text-xs uppercase tracking-wider text-red mb-3">/ 03 · threat console</div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Caught before execution.</h2>
              <p className="text-muted max-w-2xl">Aegis doesn't score vague risk. It detects concrete patterns in typed agent actions before they run.</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {threatTypes.map((t) => {
                const isDeny = t.verdict === "DENY";
                return (
                  <div key={t.name} className="card p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-bold">{t.label}</span>
                      <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded border ${
                        isDeny ? "text-red border-red/30 bg-[rgba(248,113,113,0.05)]" : "text-amber border-amber/30 bg-[rgba(232,160,64,0.05)]"
                      }`}>
                        {t.verdict}
                      </span>
                    </div>
                    <div className="text-[11px] text-dim font-mono mb-2">{t.rule}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {t.examples.map((ex) => (
                        <span key={ex} className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-border text-muted">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* === TOP AGENTS === */}
      <section className="border-b border-border py-16 sm:py-24 bg-[#080808]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-cyan mb-3">/ 04 · leaderboard preview</div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-2">Top agents by reputation.</h2>
                <p className="text-muted text-sm">Sorted by composite score. Stake weight + receipt volume + slash history.</p>
              </div>
              <Link href="/leaderboard" className="text-cyan hover:underline text-sm font-mono whitespace-nowrap">
                full leaderboard →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agents.slice(0, 6).map((a) => (
                <AgentCard key={a.id} agent={a} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* === TOKEN CTA === */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <div className="rounded-2xl border border-amber/30 bg-gradient-to-br from-amber/5 to-magenta/5 p-8 sm:p-12 text-center">
              <div className="font-mono text-xs uppercase tracking-wider text-amber mb-3">/ 05 · $AEGIS</div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stake to vouch. Dispute to defend.</h2>
              <p className="text-muted max-w-xl mx-auto mb-8">
                $AEGIS is the work token. Stake to back an agent's reputation, post dispute bonds, and pay for oracle queries. Token launches on Virtuals — Base chain.
              </p>
              <Link href="/token" className="btn-shine inline-flex items-center gap-2 rounded-lg bg-amber text-black font-semibold px-6 py-3 hover:bg-amber/90 transition-colors">
                $AEGIS token →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
