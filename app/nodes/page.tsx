import Reveal from "@/components/Reveal";
import NodeCard from "@/components/NodeCard";
import { nodes, stats } from "@/lib/data";

export const metadata = { title: "Node Leaderboard" };

export default function NodesPage() {
  const online = nodes.filter((n) => n.status === "online").length;
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <Reveal>
        <div className="text-dim text-xs font-mono mb-3">/ nodes</div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">Top inference nodes.</h1>
        <p className="text-muted max-w-2xl mb-8">
          {nodes.length} nodes in the network, {online} online. Ranked by composite score: stake weight, uptime, and inferences served.
        </p>
      </Reveal>

      <Reveal delay={200}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "total nodes", value: nodes.length, accent: "text-cyan" },
            { label: "online", value: online, accent: "text-green" },
            { label: "total staked", value: stats.totalStaked, accent: "text-amber" },
            { label: "network uptime", value: "99.7%", accent: "text-magenta" },
          ].map((s) => (
            <div key={s.label} className="card p-4">
              <div className={`text-2xl font-bold font-mono ${s.accent}`}>{s.value}</div>
              <div className="text-dim text-[10px] uppercase tracking-wider mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {nodes.map((n, i) => (
          <Reveal key={n.id} delay={i * 30}><NodeCard node={n} /></Reveal>
        ))}
      </div>
    </div>
  );
}
