import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Protect with admin secret
function isAdmin(req: NextRequest) {
  return req.headers.get("x-admin-secret") === process.env.ADMIN_SECRET;
}

// GET: List all withdrawal requests
export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const withdrawals = await (prisma as any).withdrawalRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { email: true, name: true, referralCode: true },
        },
      },
    });

    return NextResponse.json({ withdrawals });
  } catch (error) {
    console.error("[ADMIN_WD_LIST_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH: Approve or Reject a withdrawal request
export async function PATCH(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, status, adminNote } = await req.json();

    if (!id || !["PAID", "REJECTED"].includes(status)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const updated = await (prisma as any).withdrawalRequest.update({
      where: { id },
      data: { status, adminNote: adminNote || null },
    });

    return NextResponse.json({ success: true, withdrawal: updated });
  } catch (error) {
    console.error("[ADMIN_WD_PATCH_ERROR]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
