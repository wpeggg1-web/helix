import { brand } from "@/lib/data";

export default function ComparisonTable() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-dim text-[10px] uppercase tracking-wider font-mono">standard api</span>
          <span className="text-dim text-[10px] font-mono">// unverified</span>
        </div>
        <div className="font-mono text-xs space-y-1.5 text-muted">
          <div><span className="text-dim">const</span> <span className="text-foreground">r</span> = <span className="text-dim">await</span> <span className="text-foreground">openai</span>.<span className="text-cyan">chat</span>(<span className="text-green">'gpt-4'</span>)</div>
          <div className="text-dim pl-4">// no proof of model version</div>
          <div className="text-dim pl-4">// no proof of node operator</div>
          <div className="text-dim pl-4">// no proof of input</div>
          <div className="text-dim pl-4">// closed-source weight handling</div>
          <div className="text-dim pl-4">// trust the platform. period.</div>
        </div>
      </div>
      <div className="card p-5 border-cyan/30 glow-cyan">
        <div className="flex items-center justify-between mb-4">
          <span className="text-cyan text-[10px] uppercase tracking-wider font-mono">helix-verified</span>
          <span className="text-cyan text-[10px] font-mono">// provable</span>
        </div>
        <div className="font-mono text-xs space-y-1.5">
          <div><span className="text-dim">const</span> <span className="text-foreground">r</span> = <span className="text-dim">await</span> <span className="text-foreground">helix</span>.<span className="text-magenta">infer</span>(<span className="text-green">'gpt-4-turbo'</span>)</div>
          <div className="text-cyan pl-4">// proof: 0x8a3f...e21b</div>
          <div className="text-cyan pl-4">// node: atlas-cluster-1 (8.4M staked)</div>
          <div className="text-cyan pl-4">// model: gpt-4-turbo-2024-04-09</div>
          <div className="text-cyan pl-4">// input hash: 0x7b2e...f4c1</div>
          <div className="text-cyan pl-4">// latency: 142ms · cost: $0.10</div>
        </div>
      </div>
    </div>
  );
}
