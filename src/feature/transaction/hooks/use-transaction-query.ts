'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getLogsByTransactionId, getTransactionById } from '~/feature/transaction/action';
import type { Transaction, TransactionLog } from '~/shared/db/schema';

interface TransactionDetailOptions {
  initialData?: Transaction | null;
  enabled?: boolean;
}

export function useTransactionDetail(
  id: string | null,
  options?: TransactionDetailOptions,
): UseQueryResult<Transaction | null> {
  return useQuery({
    queryKey: ['transaction', id],
    queryFn: () => {
      if (!id) return Promise.resolve(null);
      return getTransactionById(id);
    },
    enabled: Boolean(id) && (options?.enabled ?? true),
    initialData: options?.initialData,
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
  });
}

interface TransactionLogsOptions {
  enabled?: boolean;
}

export function useTransactionLogs(
  id: string | null,
  options?: TransactionLogsOptions,
): UseQueryResult<TransactionLog[]> {
  return useQuery({
    queryKey: ['transaction', id, 'logs'],
    queryFn: () => {
      if (!id) return Promise.resolve([]);
      return getLogsByTransactionId(id);
    },
    enabled: Boolean(id) && (options?.enabled ?? true),
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
  });
}
