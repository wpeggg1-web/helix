import Link from "next/link";
import Reveal from "@/components/Reveal";
import CodeSamples from "@/components/CodeSamples";

export const metadata = { title: "SDK — AEGIS" };

export default function SdkPage() {
  return (
    <div className="relative">
      <section className="border-b border-border py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-wider text-cyan mb-3">/ drop-in sdk</div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Four lines. Reputation in.</h1>
            <p className="text-muted max-w-2xl mb-8">
              Install the package, wrap your agent's <code className="text-cyan font-mono">act()</code> call with <code className="text-cyan font-mono">aegis.gate()</code>. Every action now writes a receipt, every receipt builds your score.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <a href="https://github.com" className="btn-shine inline-flex items-center justify-center gap-2 rounded-lg bg-cyan text-black font-semibold px-6 py-3 hover:bg-cyan/90 transition-colors">
                view on github →
              </a>
              <a href="https://www.npmjs.com" className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card hover:bg-card-2 px-6 py-3 font-semibold transition-colors">
                npm install
              </a>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <CodeSamples />
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border py-12 sm:py-16 bg-[#080808]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-bold mb-6">Why it works</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card p-5">
                <div className="w-8 h-8 rounded border border-cyan/30 bg-cyan/10 flex items-center justify-center mb-3 text-cyan font-mono text-sm">01</div>
                <h3 className="font-bold mb-2">Gated before execution</h3>
                <p className="text-sm text-muted">Every action is checked against typed policy. PASS/PAUSE/DENY verdict returned before your tool runs.</p>
              </div>
              <div className="card p-5">
                <div className="w-8 h-8 rounded border border-amber/30 bg-amber/10 flex items-center justify-center mb-3 text-amber font-mono text-sm">02</div>
                <h3 className="font-bold mb-2">Receipt on Base</h3>
                <p className="text-sm text-muted">Every verdict writes a tamper-evident receipt on Base. Aggregated into a portable reputation score.</p>
              </div>
              <div className="card p-5">
                <div className="w-8 h-8 rounded border border-magenta/30 bg-magenta/10 flex items-center justify-center mb-3 text-magenta font-mono text-sm">03</div>
                <h3 className="font-bold mb-2">Privacy-preserving</h3>
                <p className="text-sm text-muted">Receipts can be ZK-private. Public can verify the verdict happened, not what specifically occurred.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <Reveal>
            <h2 className="text-2xl font-bold mb-3">Ready to add aegis?</h2>
            <p className="text-muted mb-6">One npm install. Four lines of code. Reputation that travels.</p>
            <Link href="/leaderboard" className="text-cyan hover:underline font-mono text-sm">
              see who's already on aegis →
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
