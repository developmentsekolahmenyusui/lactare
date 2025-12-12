'use client';

import type { Transaction } from '~/shared/db/schema';
import { TransactionDetailCard } from '../components/transaction-detail-card';
import { TransactionDetailLogs } from '../components/transaction-detail-logs';
import { useTransactionDetail, useTransactionLogs } from '../hooks/use-transaction-query';

interface Props {
  id: string;
  initialTransaction: Transaction;
}

export function TransactionDetailPage({ id, initialTransaction }: Props) {
  const { data: transaction } = useTransactionDetail(id, { initialData: initialTransaction });
  const { data: logs = [], isFetching: isFetchingLogs } = useTransactionLogs(id);

  return (
    <div className='mx-auto flex max-w-5xl flex-col gap-6'>
      <TransactionDetailCard id={id} transaction={transaction ?? initialTransaction} />
      <TransactionDetailLogs logs={logs} isFetching={isFetchingLogs} />
    </div>
  );
}
