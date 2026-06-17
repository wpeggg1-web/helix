import { nodes } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const node = nodes.find((n) => n.id === id);
  if (!node) return Response.json({ error: "node not found" }, { status: 404 });
  return Response.json(node);
}
