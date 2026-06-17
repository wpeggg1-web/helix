# AEGIS — Reputation that travels with your agent

> Drop-in SDK for AI agents. Every action becomes an on-chain receipt. Every receipt builds a portable, tamper-evident reputation. $AEGIS powers vouching, disputes, and privacy.

**Status:** pre-launch. SDK scaffolded, site live, token deploys on Virtuals (Base chain).

## What it does

| Standard agent | Aegis-backed agent |
|---|---|
| No reputation layer | Staked vouches on-chain |
| No receipts | Tamper-evident log on Base |
| Anyone can claim anything | Public reputation score |
| `rm -rf /` proceeds unchecked | DENY verdict before execution |
| Anonymous | Wallet-bound, slashable |

## Pages

- `/` — hero, comparison, threat console, top agents
- `/receipts` — live receipt stream + schema
- `/sdk` — drop-in SDK with 4 code blocks (install / writeReceipt / getScore / ZK privacy)
- `/leaderboard` — top 20 agents by reputation
- `/token` — $AEGIS utility, distribution, launch info

## API

```
GET /api/agents              # list, sort=score|receipts|stake, limit=N
GET /api/agents/[id]         # single agent detail
GET /api/token               # token metadata + status
```

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind 4** (CSS variables, dark theme)
- **PIL** (banner generation, system fonts)
- **No external services** — fully in-memory, deploys to Vercel in 1 click

## Visual DNA

- Bg `#0a0a0a` (PRXVT black)
- Primary cyan `#00d4ff` (PRXVT signature)
- Secondary amber `#e8a040` (Charon verdict color)
- Tertiary magenta `#ec4899` (Basemate glow + premium tier)
- Geist + Geist Mono
- 1px `#1f1f1f` borders everywhere
- Receipt log pattern (id + verdict + rule + sha256 hash)

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

## Banner

`scripts/make-banner.py` — generates `public/banner.png` via PIL.
Regenerate any time with `python3 scripts/make-banner.py`.

## Token

$AEGIS deploys on Virtuals (Base, chain ID 8453). Until launch, the site shows a "not launched" stub — no fake CA, no fake holders.

Token utility (design intent, subject to change):
1. **Stake-to-vouch** — back an agent's reputation, slashed if false
2. **Dispute bond** — challenge a verdict, refunded if upheld
3. **Oracle query fee** — pay to query reputation data
4. **Privacy tier** — pay for ZK-proof receipts
5. **Governance** — vote on protocol parameters

## License

MIT
