'use client';
import { useQuery } from '@tanstack/react-query';
import { getTransactionCount, getTransactions } from '~/feature/transaction/action';
import { TransactionDataTable } from '../components/transaction-data-table';
import TransactionDataTableFilter from '../components/transaction-data-filter';

interface Props {
  page: number;
  size: number;
  q: string | null;
  from: string | null;
  to: string | null;
  status: string | null;
}

export function TransactionListPage(props: Props) {
  const { data: entries = [] } = useQuery({
    queryKey: ['transactions', props],
    queryFn: () =>
      getTransactions({
        page: props.page,
        size: props.size,
        to: props.to || undefined,
        from: props.from || undefined,
        query: props.q || undefined,
        status: props.status || undefined,
      }),
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
  });

  const { data: count = 0 } = useQuery({
    queryKey: ['transactions', 'pagination', props],
    queryFn: () =>
      getTransactionCount({
        page: props.page,
        size: props.size,
        to: props.to || undefined,
        from: props.from || undefined,
        query: props.q || undefined,
        status: props.status || undefined,
      }),
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: false,
  });

  return (
    <div className='mx-auto max-w-7xl space-y-4 rounded-lg border bg-white p-6'>
      <TransactionDataTableFilter />
      <TransactionDataTable page={props.page} size={props.size} entries={entries} count={count} />
    </div>
  );
}
