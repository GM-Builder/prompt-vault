import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// In-memory Rate Limiting Store
const rateLimits = new Map<string, { lockUntil: number; count: number }>();

export async function POST(req: Request) {
  try {
    // 1. Cek autentikasi Clerk
    const authObj = await auth();
    const userId = authObj.userId;
    if (!userId) {
      return NextResponse.json(
        { error: "Anda harus login terlebih dahulu" },
        { status: 401 }
      );
    }

    // 2. Rate limiting (brute force protection — 5 percobaan max)
    const record = rateLimits.get(userId);
    const now = Date.now();
    if (record && record.lockUntil > now) {
      const minutesLeft = Math.ceil((record.lockUntil - now) / 60000);
      return NextResponse.json(
        {
          error: `Terlalu banyak percobaan. Akun dikunci sementara. Coba lagi dalam ${minutesLeft} menit.`,
        },
        { status: 429 }
      );
    }

    // 3. Baca password dari body request
    const body = await req.json();
    const { password } = body;
    if (!password) {
      return NextResponse.json({ error: "Password tidak boleh kosong." }, { status: 400 });
    }

    // 4. Ambil password aktif dari database (fallback ke env jika belum ada di DB)
    const configRow = await prisma.config.findUnique({
      where: { key: "ACTIVATION_PASSWORD" },
    });
    const activePassword =
      configRow?.value ?? process.env.ACTIVATION_PASSWORD ?? "PROMPTVAULT8K";

    // 5. Validasi password
    if (password.trim().toUpperCase() !== activePassword.toUpperCase()) {
      const wasLocked = record && record.lockUntil < now;
      const newCount = wasLocked ? 1 : (record?.count ?? 0) + 1;

      if (newCount >= 5) {
        rateLimits.set(userId, { lockUntil: now + 30 * 60000, count: newCount });
        return NextResponse.json(
          { error: "Terlalu banyak percobaan salah. Terkunci 30 menit." },
          { status: 429 }
        );
      } else {
        rateLimits.set(userId, { lockUntil: 0, count: newCount });
        const attemptsLeft = 5 - newCount;
        return NextResponse.json(
          { error: `Password salah. Sisa percobaan: ${attemptsLeft}` },
          { status: 400 }
        );
      }
    }

    // Password cocok — hapus record brute force
    rateLimits.delete(userId);

    // 6. Ambil profil lengkap dari Clerk
    const client =
      typeof clerkClient === "function"
        ? await (clerkClient as any)()
        : clerkClient;
    const user = await client.users.getUser(userId);
    const email =
      user.emailAddresses[0]?.emailAddress ?? "no-email@example.com";
    const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

    // 7. Tandai isPaid di database Prisma
    await prisma.user.upsert({
      where: { clerkId: userId },
      update: { isPaid: true, email, name },
      create: { clerkId: userId, email, name, isPaid: true },
    });

    // 8. Update Clerk Public Metadata — ini yang memberi akses selamanya via middleware
    await client.users.updateUserMetadata(userId, {
      publicMetadata: { isPaid: true },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[Redeem API Error]", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server. Coba lagi." },
      { status: 500 }
    );
  }
}
