import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const CONFIG_KEY = "ACTIVATION_PASSWORD";

function isAuthorized(req: Request): boolean {
  const adminSecret = process.env.ADMIN_SECRET;
  const authHeader = req.headers.get("x-admin-secret");
  return !!adminSecret && authHeader === adminSecret;
}

// GET /api/admin/password → Return current activation password
export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const row = await prisma.config.findUnique({ where: { key: CONFIG_KEY } });
  const password = row?.value ?? process.env.ACTIVATION_PASSWORD ?? "PROMPTVAULT8K";

  return NextResponse.json({ password });
}

// PUT /api/admin/password → Update activation password
export async function PUT(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { password } = body;

  if (!password || typeof password !== "string" || password.trim().length < 4) {
    return NextResponse.json(
      { error: "Password baru minimal 4 karakter." },
      { status: 400 }
    );
  }

  const newPassword = password.trim().toUpperCase();

  await prisma.config.upsert({
    where: { key: CONFIG_KEY },
    update: { value: newPassword },
    create: { key: CONFIG_KEY, value: newPassword },
  });

  return NextResponse.json({ success: true, password: newPassword });
}
