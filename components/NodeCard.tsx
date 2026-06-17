import Link from "next/link";
import { nodes } from "@/lib/data";

function gradeColor(g: string) {
  if (g.startsWith("A+")) return "text-green border-green/40 bg-[rgba(74,222,128,0.06)]";
  if (g.startsWith("A"))  return "text-green border-green/30 bg-[rgba(74,222,128,0.04)]";
  if (g.startsWith("B"))  return "text-cyan border-cyan/30 bg-[rgba(0,212,255,0.04)]";
  if (g.startsWith("C"))  return "text-amber border-amber/30 bg-[rgba(232,160,64,0.04)]";
  return "text-red border-red/30 bg-[rgba(248,113,113,0.04)]";
}

function statusDot(s: string) {
  if (s === "online") return "bg-green";
  if (s === "degraded") return "bg-amber";
  return "bg-red";
}

export default function NodeCard({ node }: { node: typeof nodes[0] }) {
  return (
    <Link href={`/nodes#${node.id}`} className="card p-5 block group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${statusDot(node.status)} ${node.status === "online" ? "pulse-cyan" : ""}`} />
            <span className="font-mono text-sm font-semibold text-foreground group-hover:text-cyan transition">{node.id}</span>
          </div>
          <div className="text-dim text-xs mt-1 font-mono">{node.loc}</div>
        </div>
        <span className={`px-2 py-0.5 text-xs font-bold border rounded ${gradeColor(node.grade)}`}>{node.grade}</span>
      </div>
      <div className="text-muted text-xs mb-4">{node.model}</div>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <div className="text-dim text-[10px] uppercase tracking-wider">Uptime</div>
          <div className="text-foreground font-mono mt-0.5">{node.uptime}%</div>
        </div>
        <div>
          <div className="text-dim text-[10px] uppercase tracking-wider">Stake</div>
          <div className="text-foreground font-mono mt-0.5">{node.stake}</div>
        </div>
        <div>
          <div className="text-dim text-[10px] uppercase tracking-wider">Calls</div>
          <div className="text-foreground font-mono mt-0.5">{node.inferences.toLocaleString()}</div>
        </div>
      </div>
    </Link>
  );
}
