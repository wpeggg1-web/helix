import { NextResponse } from "next/server";
import { token, stats } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    stats,
    token: {
      status: token.status,
      network: "Base",
      chainId: 8453,
      ca: token.ca,
      virtuals: token.virtuals,
      basescan: token.basescan,
    },
  });
}
