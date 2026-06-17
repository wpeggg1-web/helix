import { sdkSamples } from "@/lib/data";

function CodeBlock({ label, code, accent = "cyan" }: { label: string; code: string; accent?: "cyan" | "amber" }) {
  const accentClass = accent === "cyan" ? "text-cyan border-cyan/20" : "text-amber border-amber/20";
  return (
    <div className="card overflow-hidden">
      <div className={`flex items-center justify-between px-4 py-2 border-b border-border bg-[#131010] ${accentClass}`}>
        <span className="text-[10px] uppercase tracking-wider font-mono font-bold">{label}</span>
        <span className="text-[10px] text-dim font-mono">copy</span>
      </div>
      <pre className="p-4 overflow-x-auto text-[12px] leading-[1.7] font-mono text-foreground/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function CodeSamples() {
  return (
    <div className="space-y-4">
      <CodeBlock label="$ install" code={sdkSamples.install} accent="cyan" />
      <CodeBlock label="write receipt" code={sdkSamples.receipt} accent="cyan" />
      <CodeBlock label="query reputation" code={sdkSamples.score} accent="amber" />
      <CodeBlock label="zk privacy mode" code={sdkSamples.privacy} accent="amber" />
    </div>
  );
}
