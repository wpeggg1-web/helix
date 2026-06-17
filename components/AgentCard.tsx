import Link from "next/link";
import { agents } from "@/lib/data";

function gradeColor(g: string) {
  if (g.startsWith("A")) return "text-green bg-[rgba(74,222,128,0.1)] border-green/30";
  if (g.startsWith("B")) return "text-cyan bg-[rgba(0,212,255,0.08)] border-cyan/30";
  if (g.startsWith("C")) return "text-amber bg-[rgba(232,160,64,0.08)] border-amber/30";
  return "text-red bg-[rgba(248,113,113,0.08)] border-red/30";
}

export default function AgentCard({ agent }: { agent: typeof agents[0] }) {
  return (
    <Link href={`/leaderboard#${agent.id}`} className="card rotating-border p-5 block group">
      <div className="flex items-start justify-between mb-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-sm font-bold truncate">{agent.name}</span>
            {agent.slashed > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded border border-red/30 text-red font-mono">
                slashed ×{agent.slashed}
              </span>
            )}
          </div>
          <p className="text-xs text-muted line-clamp-2">{agent.desc}</p>
        </div>
        <div className={`ml-3 px-2.5 py-1 rounded border font-mono font-bold text-xs ${gradeColor(agent.grade)}`}>
          {agent.grade}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-border text-[11px]">
        <div>
          <div className="text-dim font-mono uppercase tracking-wider mb-0.5">Score</div>
          <div className="font-bold text-cyan">{agent.score}</div>
        </div>
        <div>
          <div className="text-dim font-mono uppercase tracking-wider mb-0.5">Receipts</div>
          <div className="font-bold font-mono">{agent.receipts.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-dim font-mono uppercase tracking-wider mb-0.5">Stake</div>
          <div className="font-bold font-mono text-amber">{agent.stake}</div>
        </div>
      </div>
    </Link>
  );
}
