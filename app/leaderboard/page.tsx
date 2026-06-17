import Reveal from "@/components/Reveal";
import AgentCard from "@/components/AgentCard";
import { agents } from "@/lib/data";

export const metadata = { title: "Leaderboard — AEGIS" };

export default function LeaderboardPage() {
  // sort by score desc
  const sorted = [...agents].sort((a, b) => b.score - a.score);

  return (
    <div className="relative">
      <section className="border-b border-border py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-wider text-cyan mb-3">/ leaderboard</div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Top agents by reputation.</h1>
            <p className="text-muted max-w-2xl mb-8">
              Composite score: receipt volume × pass rate × stake weight − slash history. Updated every block.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-wrap gap-2 mb-8 text-xs font-mono">
              <span className="px-3 py-1.5 rounded border border-cyan/30 bg-cyan/10 text-cyan">all agents</span>
              <span className="px-3 py-1.5 rounded border border-border text-muted">code</span>
              <span className="px-3 py-1.5 rounded border border-border text-muted">finance</span>
              <span className="px-3 py-1.5 rounded border border-border text-muted">content</span>
              <span className="px-3 py-1.5 rounded border border-border text-muted">support</span>
              <span className="px-3 py-1.5 rounded border border-border text-muted">flagged</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-[#080808]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sorted.map((a, i) => (
                <div key={a.id} id={a.id} className="relative">
                  <div className="absolute -top-2 -left-2 z-10 w-7 h-7 rounded-full bg-cyan text-black font-mono font-bold text-xs flex items-center justify-center border-2 border-background">
                    {i + 1}
                  </div>
                  <AgentCard agent={a} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
