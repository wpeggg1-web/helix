import { sdkSamples } from "@/lib/data";

function CodeBlock({ label, code, accent = "cyan" }: { label: string; code: string; accent?: "cyan" | "magenta" }) {
  const accentClass = accent === "cyan" ? "border-cyan/30 bg-cyan/[0.03]" : "border-magenta/30 bg-magenta/[0.03]";
  const labelColor = accent === "cyan" ? "text-cyan" : "text-magenta";
  return (
    <div className={`terminal ${accentClass}`}>
      <div className="terminal-bar">
        <span className="dot bg-red/60" />
        <span className="dot bg-amber/60" />
        <span className="dot bg-green/60" />
        <span className={`ml-2 text-[10px] uppercase tracking-wider font-bold ${labelColor}`}>{label}</span>
      </div>
      <pre className="p-4 overflow-x-auto text-foreground text-[12.5px] leading-relaxed"><code>{code}</code></pre>
    </div>
  );
}

export default function CodeSamples() {
  return (
    <div className="space-y-4">
      {sdkSamples.map((s) => (
        <CodeBlock key={s.label} label={s.label} code={s.code} accent={s.accent as "cyan" | "magenta"} />
      ))}
    </div>
  );
}
