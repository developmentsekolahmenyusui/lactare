import { NextRequest, NextResponse } from 'next/server';
import { and, eq, lt } from 'drizzle-orm';

import { db } from '~/shared/db';
import { transactions } from '~/shared/db/schema';
import { createTransactionLog } from '~/feature/transaction/action';
import { Env, getEnv } from '~/shared/lib/env';

const PAYMENT_DUE_MINUTES = 60;
const API_KEY_HEADER = 'x-api-key';

export async function POST(req: NextRequest) {
  const providedApiKey = req.headers.get(API_KEY_HEADER);
  const expectedApiKey = getEnv(Env.PAYMENT_EXPIRY_API_KEY);
  if (!providedApiKey || providedApiKey !== expectedApiKey) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const expiredThreshold = new Date(now.getTime() - PAYMENT_DUE_MINUTES * 60 * 1000);

  const expiredTransactions = await db
    .update(transactions)
    .set({
      paymentStatus: 'expired',
      paymentAt: null,
      updatedAt: now,
    })
    .where(and(eq(transactions.paymentStatus, 'pending'), lt(transactions.createdAt, expiredThreshold)))
    .returning({ id: transactions.id });

  if (expiredTransactions.length > 0) {
    await Promise.all(
      expiredTransactions.map(({ id }) =>
        createTransactionLog({
          transactionId: id,
          type: 'payment_expired',
          payload: {
            reason: 'payment_due_passed',
            expiredAt: now.toISOString(),
          },
        }),
      ),
    );
  }

  return NextResponse.json(
    {
      message: 'ok',
      expiredCount: expiredTransactions.length,
      transactionIds: expiredTransactions.map((transaction) => transaction.id),
    },
    { status: 200 },
  );
}
