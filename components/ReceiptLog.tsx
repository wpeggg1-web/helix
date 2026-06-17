import { sampleReceipts } from "@/lib/data";

function verdictStyle(v: string) {
  if (v === "PASS") return "text-green border-green/30 bg-[rgba(74,222,128,0.05)]";
  if (v === "PAUSE") return "text-amber border-amber/30 bg-[rgba(232,160,64,0.05)]";
  return "text-red border-red/30 bg-[rgba(248,113,113,0.05)]";
}

export default function ReceiptLog({ limit }: { limit?: number }) {
  const rows = limit ? sampleReceipts.slice(0, limit) : sampleReceipts;
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <div className="grid grid-cols-[60px_100px_120px_1fr_60px] sm:grid-cols-[80px_120px_140px_1fr_72px] px-3 sm:px-4 py-2.5 border-b border-border bg-[#131010] text-[10px] uppercase tracking-wider text-dim font-mono">
        <span>seq</span>
        <span>actor</span>
        <span>tool</span>
        <span>resource</span>
        <span>verdict</span>
      </div>
      <div className="divide-y divide-border max-h-[420px] overflow-y-auto">
        {rows.map((r) => (
          <div key={r.id} className="grid grid-cols-[60px_100px_120px_1fr_60px] sm:grid-cols-[80px_120px_140px_1fr_72px] items-center px-3 sm:px-4 py-2.5 text-[11px] sm:text-xs font-mono hover:bg-white/[0.02] transition-colors">
            <span className="text-dim">{r.id.replace("req_", "")}</span>
            <span className="text-muted truncate">{r.actor}</span>
            <span className="text-amber truncate">{r.tool}</span>
            <span className="truncate text-foreground/80">{r.resource}</span>
            <span className={`px-2 py-0.5 rounded border text-[9px] font-bold tracking-wider text-center ${verdictStyle(r.verdict)}`}>
              {r.verdict}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
