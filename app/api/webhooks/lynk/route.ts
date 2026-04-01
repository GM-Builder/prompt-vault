import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Gunakan cara teraman ambil parameter dari App Router
    const receivedSignature = req.headers.get('x-lynk-signature');
    
    if (!receivedSignature) {
      return NextResponse.json({ error: 'Missing Signature' }, { status: 401 });
    }
    
    const { event, data } = body;
    
    // Verifikasi format payload minimal untuk mencegah crash
    if (!data || !data.message_data || !data.message_data.totals || !data.message_data.customer) {
        return NextResponse.json({ error: 'Invalid payload structure' }, { status: 400 });
    }

    const { refId, message_id, message_data } = data;
    const amount = message_data.totals.grandTotal.toString();
    const customerEmail = message_data.customer.email.toLowerCase().trim();
    const merchantKey = process.env.LYNK_MERCHANT_KEY || "";

    // 1. Validasi Signature
    const signatureString = amount + refId + message_id + merchantKey;
    const calculatedSignature = crypto
      .createHash('sha256')
      .update(signatureString)
      .digest('hex');

    if (calculatedSignature !== receivedSignature) {
      return NextResponse.json({ error: 'Invalid Signature' }, { status: 401 });
    }

    // 2. Jika Pembayaran Berhasil
    if (event === 'payment.received' && data.message_action === 'SUCCESS') {
      
      // 3. Update Database Prisma (gunakan updateMany agar tidak error jika user belum daftar di web)
      await prisma.user.updateMany({
        where: { email: customerEmail },
        data: { isPaid: true }
      });

      // 4. Update Clerk Metadata (Cari user berdasarkan email)
      // Dukungan kompabilitas Clerk v4/v5/v6
      const client = typeof clerkClient === "function" ? await (clerkClient as any)() : clerkClient;
      
      const response = await client.users.getUserList({ emailAddress: [customerEmail] });
      // Di versi Clerk terbaru getUserList mereturn object { data: [...] }, di versi lama mereturn langsung array
      const clerkUsers = response.data || response;

      if (Array.isArray(clerkUsers) && clerkUsers.length > 0) {
        const userId = clerkUsers[0].id;
        // Tandai isPaid true di metadata
        await client.users.updateUserMetadata(userId, {
          publicMetadata: { isPaid: true }
        });
        console.log(`[Webhook Lynk] User ${customerEmail} otomatis diaktifkan.`);
      } else {
        console.warn(`[Webhook Lynk] User dengan email ${customerEmail} belum daftar di Clerk. Harus aktivasi via KODE manual.`);
      }
    }

    return NextResponse.json({ status: 'Webhook received & processed successfully' }, { status: 200 });
  } catch (error) {
    console.error("[Webhook Lynk Error]:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
