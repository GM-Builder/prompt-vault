import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch payout details for current user
export async function GET() {
  try {
    const session = await auth();
    const { userId: clerkId } = session;
    if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await (prisma.user as any).findUnique({
      where: { clerkId } as any,
      select: { id: true } as any,
    });
    if (!user) return NextResponse.json({ payout: null });

    const payout = await (prisma as any).payoutDetails.findUnique({
      where: { userId: user.id },
    });

    return NextResponse.json({ payout: payout || null });
  } catch (error) {
    console.error("[PAYOUT_GET_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Save / Update payout details
export async function POST(req: Request) {
  try {
    const session = await auth();
    const { userId: clerkId } = session;
    if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { bankName, accountNumber, accountName } = await req.json();
    if (!bankName || !accountNumber || !accountName) {
      return NextResponse.json({ error: "Semua kolom wajib diisi" }, { status: 400 });
    }

    const user = await (prisma.user as any).findUnique({
      where: { clerkId } as any,
      select: { id: true } as any,
    });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const payout = await (prisma as any).payoutDetails.upsert({
      where: { userId: user.id },
      update: { bankName, accountNumber, accountName },
      create: { userId: user.id, bankName, accountNumber, accountName },
    });

    return NextResponse.json({ success: true, payout });
  } catch (error) {
    console.error("[PAYOUT_POST_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
