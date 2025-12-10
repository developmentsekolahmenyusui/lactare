'use server';

import { and, between, count, desc, eq, ilike, or, SQL, sql } from 'drizzle-orm';
import { db } from '~/shared/db';
import { transactionLogs, transactions } from '~/shared/db/schema';
import moment from 'moment-timezone';

interface Params {
  page: number;
  size: number;
  to?: string;
  from?: string;
  query?: string;
  status?: string;
}

function getConditions(params: Params) {
  const conditions: (SQL<unknown> | undefined)[] = [];
  if (params.query) {
    conditions.push(
      or(
        ilike(transactions.fullName, `${params.query}%`),
        ilike(transactions.email, `${params.query}%`),
        ilike(transactions.phoneNumber, `${params.query}%`),
      ),
    );
  }
  if (params.from && params.to) {
    const tzFrom = moment.tz(params.from, 'Asia/Jakarta');
    const tzTo = moment.tz(params.to, 'Asia/Jakarta');
    const start = tzFrom.clone().startOf('day').utc();
    const end = tzTo.clone().endOf('day').utc();
    conditions.push(
      between(transactions.createdAt, start.toDate(), end.toDate()),
    );
  } else if (params.from) {
    const tzFrom = moment.tz(params.from, 'Asia/Jakarta');
    const start = tzFrom.clone().startOf('day').utc();
    const end = tzFrom.clone().endOf('day').utc();
    conditions.push(
      between(transactions.createdAt, start.toDate(), end.toDate()),
    );
  }
  if (params.status) {
    conditions.push(eq(transactions.paymentStatus, params.status));
  }

  return conditions;
}

export async function getTransactions(params: Params) {
  const conditions = getConditions(params);
  return await db
    .select()
    .from(transactions)
    .where(and(...conditions))
    .orderBy(desc(transactions.createdAt))
    .limit(params.size)
    .offset((params.page - 1) * params.size);
}

export async function getTransactionCount(params: Params) {
  const conditions = getConditions(params);
  const result = await db
    .select({ count: count(transactions.id) })
    .from(transactions)
    .where(and(...conditions));
  return result[0]?.count ?? 0;
}

type LogType =
  | 'payment_request'
  | 'payment_response'
  | 'payment_response_error'
  | 'callback_request'
  | 'callback_response'
  | (string & {});

interface CreateTransactionLogParams {
  transactionId: string;
  type: LogType;
  payload: unknown;
}

export async function createTransactionLog({ transactionId, type, payload }: CreateTransactionLogParams) {
  await db.insert(transactionLogs).values({
    transactionId,
    type,
    payload,
  });
}
