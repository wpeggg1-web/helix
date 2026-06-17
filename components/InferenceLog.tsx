import { sampleInferences } from "@/lib/data";

function verdictStyle(v: string) {
  if (v === "PASS")  return "text-green border-green/30 bg-[rgba(74,222,128,0.05)]";
  if (v === "PAUSE") return "text-amber border-amber/30 bg-[rgba(232,160,64,0.05)]";
  return "text-red border-red/30 bg-[rgba(248,113,113,0.05)]";
}

export default function InferenceLog({ limit = 10 }: { limit?: number }) {
  const rows = sampleInferences.slice(0, limit);
  return (
    <div className="card overflow-hidden">
      <div className="grid grid-cols-12 gap-2 px-4 py-2 border-b border-border text-dim text-[10px] uppercase tracking-wider font-mono bg-background/40">
        <div className="col-span-2">id</div>
        <div className="col-span-3 hidden sm:block">node</div>
        <div className="col-span-2 hidden md:block">model</div>
        <div className="col-span-2">tokens</div>
        <div className="col-span-1 text-right">cost</div>
        <div className="col-span-2 text-right">verdict</div>
      </div>
      <div className="divide-y divide-border">
        {rows.map((r) => (
          <div key={r.id} className="grid grid-cols-12 gap-2 px-4 py-3 text-xs font-mono hover:bg-cyan/[0.02] transition">
            <div className="col-span-2 text-cyan truncate">{r.id}</div>
            <div className="col-span-3 hidden sm:block text-foreground truncate">{r.node}</div>
            <div className="col-span-2 hidden md:block text-muted truncate">{r.model}</div>
            <div className="col-span-2 text-muted">
              <span className="text-dim">in </span>{r.tokens_in}
              <span className="text-dim"> · out </span>{r.tokens_out}
            </div>
            <div className="col-span-1 text-right text-foreground">${r.cost}</div>
            <div className="col-span-2 text-right">
              <span className={`inline-block px-1.5 py-0.5 border rounded text-[10px] font-bold ${verdictStyle(r.verdict)}`}>
                {r.verdict}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
