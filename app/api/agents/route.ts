import { agents } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sort = searchParams.get("sort") || "score";
  const limit = parseInt(searchParams.get("limit") || "20");

  let sorted = [...agents];
  if (sort === "score") sorted.sort((a, b) => b.score - a.score);
  if (sort === "receipts") sorted.sort((a, b) => b.receipts - a.receipts);
  if (sort === "stake") sorted.sort((a, b) => parseFloat(b.stake) - parseFloat(a.stake));

  return Response.json({
    total: agents.length,
    sort,
    limit,
    agents: sorted.slice(0, limit).map((a) => ({
      id: a.id,
      name: a.name,
      desc: a.desc,
      score: a.score,
      grade: a.grade,
      receipts: a.receipts,
      vouches: a.vouches,
      slashed: a.slashed,
      tags: a.tags,
    })),
  });
}
