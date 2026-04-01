import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Matikan sepenuhnya fitur kode redeem manual:
  return NextResponse.json(
    { error: "Fitur kode aktivasi manual telah ditutup permanen untuk keamanan. Pembayaran kini diproses 100% otomatis via Webhook Lynk. Hubungi admin jika ada kendala akses." },
    { status: 403 }
  );
}
