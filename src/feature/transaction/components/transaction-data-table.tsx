'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Transaction } from '~/shared/db/schema';
import { currencyFmt, dateFmt } from '~/shared/lib/format';
import { DataTable } from '~/shared/shadcn/data-table';
import { TransactionStatusBadge } from './transaction-status-badge';
import { ExternalLinkIcon } from 'lucide-react';

interface Props {
  page: number;
  size: number;
  count: number;
  entries: Transaction[];
}

type TransactionRow = Transaction;

const columns: ColumnDef<TransactionRow>[] = [
  {
    accessorKey: 'fullName',
    header: 'Full Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    cell: ({ cell }) => {
      const phoneNumber = cell.getValue<number>();
      return <span>{phoneNumber}</span>;
    },
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment Status',
    cell: ({ cell }) => {
      const status = cell.getValue<string>();
      return <TransactionStatusBadge status={status} />;
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ cell }) => {
      const amount = cell.getValue<number>();
      return <span>{currencyFmt.format(amount)}</span>;
    },
  },
  {
    accessorKey: 'paymentAt',
    header: 'Payment Date',
    cell: ({ cell }) => {
      const value = cell.getValue<Date | string | null>();
      if (!value) return <span>-</span>;
      const dateValue = value instanceof Date ? value : new Date(value);
      return <span>{dateFmt.format(dateValue)}</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created Date',
    cell: ({ cell }) => {
      const value = cell.getValue<Date | string>();
      const dateValue = value instanceof Date ? value : new Date(value);
      return <span>{dateFmt.format(dateValue)}</span>;
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated Date',
    cell: ({ cell }) => {
      const value = cell.getValue<Date | string>();
      const dateValue = value instanceof Date ? value : new Date(value);
      return <span>{dateFmt.format(dateValue)}</span>;
    },
  },
  {
    accessorKey: 'actions',
    header: 'Action',
    cell: () => {
      return <ExternalLinkIcon className='text-neutral-600' />;
    },
  },
];

export function TransactionDataTable({ page, size, entries, count }: Props) {
  const currentPage = Math.max(page, 1);
  const currentSize = Math.max(size, 1);

  return (
    <DataTable
      columns={columns}
      data={entries}
      pagination={{ pageIndex: currentPage, pageSize: currentSize }}
      rowCount={count}
      totalItems={count}
    />
  );
}
