import Reveal from "@/components/Reveal";
import ReceiptLog from "@/components/ReceiptLog";
import { sampleReceipts, stats, threatTypes } from "@/lib/data";

export const metadata = { title: "Receipts — AEGIS" };

export default function ReceiptsPage() {
  // counts by verdict
  const pass = sampleReceipts.filter(r => r.verdict === "PASS").length;
  const pause = sampleReceipts.filter(r => r.verdict === "PAUSE").length;
  const deny = sampleReceipts.filter(r => r.verdict === "DENY").length;

  return (
    <div className="relative">
      <section className="border-b border-border py-12 sm:py-16 bg-[#080808]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-wider text-amber mb-3">/ receipt lab</div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Live receipt stream.</h1>
            <p className="text-muted max-w-2xl mb-8">
              Every Aegis-gated action writes a receipt. Every receipt has a verdict, a rule, a tamper-evident hash, and a timestamp. Aggregated into reputation.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="card p-4">
                <div className="text-[10px] uppercase tracking-wider text-dim mb-1 font-mono">total logged</div>
                <div className="text-2xl font-bold font-mono">{stats.receiptsLogged.toLocaleString()}</div>
              </div>
              <div className="card p-4 border-green/30">
                <div className="text-[10px] uppercase tracking-wider text-dim mb-1 font-mono">pass</div>
                <div className="text-2xl font-bold font-mono text-green">{pass}/{sampleReceipts.length}</div>
              </div>
              <div className="card p-4 border-amber/30">
                <div className="text-[10px] uppercase tracking-wider text-dim mb-1 font-mono">pause</div>
                <div className="text-2xl font-bold font-mono text-amber">{pause}/{sampleReceipts.length}</div>
              </div>
              <div className="card p-4 border-red/30">
                <div className="text-[10px] uppercase tracking-wider text-dim mb-1 font-mono">deny</div>
                <div className="text-2xl font-bold font-mono text-red">{deny}/{sampleReceipts.length}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-bold mb-6">Recent receipts</h2>
          </Reveal>
          <Reveal delay={100}>
            <ReceiptLog />
          </Reveal>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-[#080808]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-2xl font-bold mb-2">Receipt schema</h2>
            <p className="text-muted text-sm mb-6">Every receipt follows <code className="text-cyan font-mono">aegis.receipt.v1</code></p>
          </Reveal>
          <Reveal delay={100}>
            <div className="card p-6 font-mono text-xs sm:text-sm space-y-2">
              <div className="grid grid-cols-[120px_1fr] gap-2 sm:gap-4 pb-2 border-b border-border">
                <span className="text-dim">id</span><span>req_0042</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-2 sm:gap-4 pb-2 border-b border-border">
                <span className="text-dim">agent</span><span>codex-shell</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-2 sm:gap-4 pb-2 border-b border-border">
                <span className="text-dim">tool</span><span className="text-amber">shell.run</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-2 sm:gap-4 pb-2 border-b border-border">
                <span className="text-dim">resource</span><span>npm test</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-2 sm:gap-4 pb-2 border-b border-border">
                <span className="text-dim">verdict</span><span className="text-green font-bold">PASS</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-2 sm:gap-4 pb-2 border-b border-border">
                <span className="text-dim">rule</span><span>default.pass</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-2 sm:gap-4 pb-2 border-b border-border">
                <span className="text-dim">launched</span><span className="text-green">true</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-2 sm:gap-4 pb-2 border-b border-border">
                <span className="text-dim">receipt</span><span className="text-dim text-[10px]">ch:sha256:a1b2c3d4e5f6a7b8...</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-2 sm:gap-4 pb-2 border-b border-border">
                <span className="text-dim">policy</span><span className="text-dim text-[10px]">ph:sha256:03f7a1c2b4d5e6f8...</span>
              </div>
              <div className="grid grid-cols-[120px_1fr] gap-2 sm:gap-4">
                <span className="text-dim">time</span><span>14:32:01.247</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
