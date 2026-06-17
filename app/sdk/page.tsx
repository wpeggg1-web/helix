import Link from "next/link";
import Reveal from "@/components/Reveal";
import CodeSamples from "@/components/CodeSamples";

export const metadata = { title: "SDK" };

export default function SdkPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Reveal>
        <div className="text-dim text-xs font-mono mb-3">/ sdk</div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">Drop-in inference, provable output.</h1>
        <p className="text-muted max-w-2xl mb-12">
          Replace one line of your agent&apos;s code. Get model output + on-chain proof.
          No infrastructure to run. No accounts to manage.
        </p>
      </Reveal>

      <Reveal delay={200}>
        <CodeSamples />
      </Reveal>

      <Reveal delay={300}>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {[
            { title: "Free tier", price: "0", desc: "1,000 inferences/day, basic models" },
            { title: "Pro",       price: "$49", desc: "100K inferences/day, all models, no rate limit" },
            { title: "Enterprise",price: "Custom", desc: "Dedicated nodes, SLAs, custom models" },
          ].map((p) => (
            <div key={p.title} className="card p-5">
              <div className="text-cyan text-xs font-mono mb-2">{p.title}</div>
              <div className="text-3xl font-bold mb-1">{p.price}{p.price !== "Custom" && <span className="text-sm text-muted">/mo</span>}</div>
              <div className="text-muted text-xs">{p.desc}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={400}>
        <div className="mt-12 text-center">
          <p className="text-muted text-sm mb-4">SDK is in private alpha. Open-source repo:</p>
          <Link href="https://github.com/caSSano22/helix" className="btn-secondary">github.com/caSSano22/helix ↗</Link>
        </div>
      </Reveal>
    </div>
  );
}
