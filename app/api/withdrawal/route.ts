import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const MIN_WITHDRAWAL = 25000;

// POST: Request a withdrawal
export async function POST(req: Request) {
  try {
    const session = await auth();
    const { userId: clerkId } = session;
    if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await (prisma.user as any).findUnique({
      where: { clerkId } as any,
      select: { id: true } as any,
    });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // 1. Check payout details exist
    const payoutDetails = await (prisma as any).payoutDetails.findUnique({
      where: { userId: user.id },
    });
    if (!payoutDetails) {
      return NextResponse.json({ error: "Lengkapi info rekening di menu Settings terlebih dahulu." }, { status: 400 });
    }

    // 2. Calculate available balance (SETTLED rewards - already WITHDRAWN)
    const totalEarned = await (prisma as any).referralReward.aggregate({
      where: { referrerId: user.id, status: "SETTLED" },
      _sum: { amount: true },
    });

    const totalWithdrawn = await (prisma as any).withdrawalRequest.aggregate({
      where: { userId: user.id, status: { not: "REJECTED" } },
      _sum: { amount: true },
    });

    const earned = totalEarned._sum.amount || 0;
    const withdrawn = totalWithdrawn._sum.amount || 0;
    const available = earned - withdrawn;

    if (available < MIN_WITHDRAWAL) {
      return NextResponse.json({
        error: `Saldo minimum untuk pencairan adalah Rp ${MIN_WITHDRAWAL.toLocaleString("id-ID")}. Saldo tersedia Anda: Rp ${available.toLocaleString("id-ID")}.`
      }, { status: 400 });
    }

    // 3. Create withdrawal request with snapshot of payout info
    const withdrawal = await (prisma as any).withdrawalRequest.create({
      data: {
        userId: user.id,
        amount: available, // Withdraw all available
        bankName: payoutDetails.bankName,
        accountNumber: payoutDetails.accountNumber,
        accountName: payoutDetails.accountName,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, withdrawal });
  } catch (error) {
    console.error("[WITHDRAWAL_REQUEST_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// GET: Get withdrawal history for current user
export async function GET() {
  try {
    const session = await auth();
    const { userId: clerkId } = session;
    if (!clerkId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await (prisma.user as any).findUnique({
      where: { clerkId } as any,
      select: { id: true } as any,
    });
    if (!user) return NextResponse.json({ withdrawals: [] });

    const withdrawals = await (prisma as any).withdrawalRequest.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ withdrawals });
  } catch (error) {
    console.error("[WITHDRAWAL_GET_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
