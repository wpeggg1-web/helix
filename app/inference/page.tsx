import Reveal from "@/components/Reveal";
import InferenceLog from "@/components/InferenceLog";
import { sampleInferences, stats } from "@/lib/data";

export const metadata = { title: "Live Inferences" };

export default function InferencesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <Reveal>
        <div className="text-dim text-xs font-mono mb-3">/ live feed</div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">Every inference, live.</h1>
        <p className="text-muted max-w-2xl mb-12">
          A real-time stream of every inference run on the Helix network. Each row includes the
          node operator, model, latency, cost, and on-chain proof. Anyone can verify any row.
        </p>
      </Reveal>

      <Reveal delay={200}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "last 1h", value: sampleInferences.length, accent: "text-cyan" },
            { label: "avg latency", value: `${stats.avgLatencyMs}ms`, accent: "text-magenta" },
            { label: "avg cost", value: stats.costPerCall, accent: "text-amber" },
            { label: "pass rate", value: `${stats.passRate}%`, accent: "text-green" },
          ].map((s) => (
            <div key={s.label} className="card p-4">
              <div className={`text-2xl font-bold font-mono ${s.accent}`}>{s.value}</div>
              <div className="text-dim text-[10px] uppercase tracking-wider mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={300}>
        <InferenceLog limit={10} />
      </Reveal>

      <Reveal delay={400}>
        <div className="mt-12 card p-6">
          <h2 className="text-lg font-bold mb-3">Receipt schema</h2>
          <p className="text-muted text-sm mb-4">Each row above corresponds to one on-chain receipt with the following structure:</p>
          <pre className="bg-background/60 border border-border rounded p-4 overflow-x-auto text-xs font-mono text-cyan">
{`{
  "id":            "inf_a3f9",        // unique inference id
  "node":          "atlas-cluster-1", // operator + region
  "model":         "gpt-4-turbo",     // model + version hash
  "prompt_hash":   "0x7b2e...f4c1",   // sha256 of input
  "output_hash":   "0xa41d...8e20",   // sha256 of output
  "verdict":       "PASS",            // PASS | PAUSE | DENY
  "tokens_in":     412,
  "tokens_out":    128,
  "cost_helix":    "0.10",
  "latency_ms":    142,
  "proof":         "0x8a3f...e21b",   // on-chain tx hash
  "timestamp":     1718640000
}`}
          </pre>
        </div>
      </Reveal>
    </div>
  );
}
