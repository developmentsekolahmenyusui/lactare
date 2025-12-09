'use server';

import { and, count, eq, SQL, sql } from 'drizzle-orm';
import { db } from '~/shared/db';
import { transactions } from '~/shared/db/schema';

interface Params {
  page: number;
  size: number;
  query?: string;
  status?: string;
}

function getConditions(params: Params) {
  const conditions: SQL[] = [];
  if (params.query) {
    conditions.push(sql`search_vector @@ plainto_tsquery('english', ${params.query})`);
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
