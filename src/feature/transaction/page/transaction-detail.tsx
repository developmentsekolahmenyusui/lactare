'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Transaction } from '~/shared/db/schema';
import { TransactionDetailCard } from '../components/transaction-detail-card';
import { TransactionDetailLogs } from '../components/transaction-detail-logs';
import { useTransactionDetail, useTransactionLogs } from '../hooks/use-transaction-query';
import { Button } from '~/shared/shadcn/button';

interface Props {
  id: string;
  initialTransaction: Transaction;
}

export function TransactionDetailPage({ id, initialTransaction }: Props) {
  const router = useRouter();
  const { data: transaction } = useTransactionDetail(id, { initialData: initialTransaction });
  const { data: logs = [], isFetching: isFetchingLogs } = useTransactionLogs(id);

  return (
    <div className='mx-auto flex max-w-5xl flex-col gap-6'>
      <Button
        type='button'
        variant='ghost'
        size='sm'
        className='w-fit gap-2 pl-0 text-muted-foreground hover:text-foreground hover:bg-transparent'
        onClick={() => router.back()}
      >
        <ArrowLeft className='h-4 w-4' />
        Back
      </Button>
      <TransactionDetailCard id={id} transaction={transaction ?? initialTransaction} />
      <TransactionDetailLogs logs={logs} isFetching={isFetchingLogs} />
    </div>
  );
}
