import { NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Midtrans Payment Webhook
 * Verifies signature and processes settlement.
 * TODO: Uncomment Prisma section after running `npx prisma db push`
 */
export async function POST(req: Request) {
  try {
    const body = await req.json() as {
      order_id: string;
      status_code: string;
      gross_amount: string;
      signature_key: string;
      transaction_status: string;
      transaction_id: string;
    };

    const { order_id, status_code, gross_amount, signature_key, transaction_status } = body;

    const serverKey = process.env.MIDTRANS_SERVER_KEY ?? '';

    // 1. Verify Midtrans Signature (SHA-512 hash of order_id + status_code + gross_amount + server_key)
    const hashPayload = `${order_id}${status_code}${gross_amount}${serverKey}`;
    const hashSignature = crypto.createHash('sha512').update(hashPayload).digest('hex');

    if (hashSignature !== signature_key) {
      return NextResponse.json({ error: 'Invalid signature. Attempt flagged.' }, { status: 403 });
    }

    // 2. Process status
    if (transaction_status === 'settlement' || transaction_status === 'capture') {
      // ─── Uncomment below once DB is configured (npx prisma db push) ───
      // const prisma = new PrismaClient();
      // await prisma.$transaction(async (tx) => {
      //   const order = await tx.order.update({ where: { orderId: order_id }, data: { status: 'SETTLED' } });
      //   await tx.user.update({ where: { id: order.userId }, data: { isPaid: true } });
      // });
      console.log(`✅ Payment settled for order: ${order_id}`);
      return NextResponse.json({ status: 'success', message: 'Payment settled.' });
    }

    if (transaction_status === 'expire' || transaction_status === 'cancel') {
      console.log(`❌ Order ${order_id} expired/cancelled.`);
      return NextResponse.json({ status: 'success', message: 'Order expired/cancelled.' });
    }

    return NextResponse.json({ status: 'ignored' });
  } catch (error: unknown) {
    console.error('Midtrans Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
