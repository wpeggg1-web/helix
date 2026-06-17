import { nodes } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sort = searchParams.get("sort") || "uptime";
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);

  const sorted = [...nodes].sort((a, b) => {
    if (sort === "stake") return parseInt(b.stake.replace(/,/g, "")) - parseInt(a.stake.replace(/,/g, ""));
    if (sort === "inferences") return b.inferences - a.inferences;
    if (sort === "grade") {
      const order = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"];
      return order.indexOf(a.grade) - order.indexOf(b.grade);
    }
    return b.uptime - a.uptime;
  });

  return Response.json({ total: nodes.length, sort, limit, nodes: sorted.slice(0, limit) });
}
