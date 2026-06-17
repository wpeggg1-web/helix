# HELIX — AI inference you can verify.

[![X: @helix_oracle](https://img.shields.io/badge/X-@helix_oracle-00d4ff?style=flat-square&logo=x&logoColor=white)](https://x.com/helix_oracle)
[![GitHub: wpeggg1-web/helix](https://img.shields.io/badge/GitHub-wpeggg1__web%2Fhelix-ec4899?style=flat-square&logo=github)](https://github.com/wpeggg1-web/helix)
[![Base](https://img.shields.io/badge/Base-mainnet-0052ff?style=flat-square)](https://basescan.org)
[![Status: pre-launch](https://img.shields.io/badge/status-pre--launch-e8a040?style=flat-square)](#token)

> Decentralized inference network on Base. Every output is provable. Every node is staked. Pay per call in $HELIX.

**Status:** pre-launch. SDK scaffolded, site live, token deploys on Virtuals (Base, chain 8453).

**Follow:** [@helix_oracle](https://x.com/helix_oracle) on X for launch updates.

## What it does

| Standard API | Helix-verified |
|---|---|
| Trust the platform | Trust math + stake |
| No proof of model version | Hash of weights + version |
| No proof of node | Staked operator ID |
| No proof of input | sha256 prompt hash |
| Closed-source weight handling | Verifiable on-chain receipt |
| One price tier | Pay per token-out in $HELIX |

## Pages

- `/` — hero, comparison, live feed preview, threats, top nodes, network pulse, token CTA
- `/inference` — live inference stream + receipt schema
- `/sdk` — 4 code blocks (install / infer / verify / runNode) + pricing tiers
- `/nodes` — full 20-node leaderboard ranked by uptime/stake/grade
- `/token` — $HELIX utility (5 functions) + distribution + "not launched" stub

## API

```
GET /api/nodes              # list, sort=uptime|stake|inferences|grade
GET /api/nodes/[id]         # single node detail
GET /api/token              # token metadata + status
```

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind 4** (CSS variables, dark theme)
- **PIL** (logo + banner generation, system fonts)
- **No external services** — fully in-memory, deploys to Vercel in 1 command

## Visual DNA

- Bg `#0a0a0a` (PRXVT black)
- Primary cyan `#00d4ff` (PRXVT signature) — DNA strand 1
- Secondary magenta `#ec4899` (Basemate glow) — DNA strand 2
- Tertiary amber `#e8a040` (Charon verdict color)
- Geist + Geist Mono
- 1px `#1f1f1f` borders everywhere
- DNA double-helix mark: two interweaving sine waves

## Develop

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Deploy

```bash
vercel --prod
```

## Brand assets

```bash
python3 scripts/make-logo.py   # logo-1024/512/256/128, favicon.ico multi-size, apple-touch, og-image
python3 scripts/make-banner.py # banner.png 1500x500
```

## Token

$HELIX deploys on Virtuals (Base, chain 8453). Until launch, the site shows a "not launched" stub — no fake CA, no fake holders.

Token utility (design intent, subject to change):
1. **Pay per inference** — caller → node, $HELIX per token-out
2. **Stake to run a node** — operator stake, slashable for false outputs
3. **Vouch for model version** — back a model, rewarded if popular
4. **Dispute bond** — challenge output, refunded if upheld
5. **Governance** — vote on whitelist + fee tiers

## Links

- **Website:** https://helix-iota-eosin.vercel.app
- **X (Twitter):** [@helix_oracle](https://x.com/helix_oracle)
- **GitHub:** https://github.com/wpeggg1-web/helix
- **Virtuals (post-launch):** TBA

## License

MIT
