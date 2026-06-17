import { agents } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agent = agents.find((a) => a.id === id);
  if (!agent) {
    return Response.json({ error: "agent not found" }, { status: 404 });
  }
  return Response.json(agent);
}
