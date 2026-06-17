import { brand, token } from "@/lib/data";

export default function ComparisonTable() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Standard */}
      <div className="card p-6 border-dashed">
        <div className="flex items-center justify-between mb-5">
          <span className="text-[10px] uppercase tracking-wider text-dim font-mono">standard agent</span>
          <span className="flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-md bg-red/10 text-red border border-red/20">
            <span className="w-1.5 h-1.5 rounded-full bg-red" />
            unverified
          </span>
        </div>
        <pre className="text-[12px] leading-[1.7] font-mono text-muted whitespace-pre-wrap break-words">
{`// no reputation layer
// no receipts
// no vouching
// anyone can claim
// anything

await agent.act({
  tool: 'shell.run',
  resource: 'rm -rf /',
  // ...proceeds unchecked
})`}
        </pre>
      </div>

      {/* Aegis */}
      <div className="card p-6 border-cyan/30 bg-gradient-to-br from-cyan/5 to-magenta/5 relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan/20 via-magenta/20 to-amber/20 rounded-[14px] blur-xl opacity-50 -z-10" />
        <div className="flex items-center justify-between mb-5">
          <span className="text-[10px] uppercase tracking-wider text-cyan font-mono font-bold">aegis-backed agent</span>
          <span className="flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-md bg-cyan/10 text-cyan border border-cyan/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
            verified
          </span>
        </div>
        <pre className="text-[12px] leading-[1.7] font-mono whitespace-pre-wrap break-words">
{`<span class="text-magenta">import</span> { aegis } <span class="text-magenta">from</span> <span class="text-green">'@aegis/sdk'</span>

<span class="text-magenta">const</span> result = <span class="text-magenta">await</span> aegis.<span class="text-amber">gate</span>({
  tool: <span class="text-cyan">'shell.run'</span>,
  resource: <span class="text-cyan">'rm -rf /'</span>,
})

<span class="text-dim">// verdict: DENY</span>
// <span class="text-red">stopped before execution</span>
// <span class="text-green">receipt: req_0042</span>
// <span class="text-amber">reputation: -47 slashed</span>`}
        </pre>
      </div>
    </div>
  );
}
