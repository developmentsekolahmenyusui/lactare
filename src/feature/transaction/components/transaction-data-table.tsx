'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Transaction } from '~/shared/db/schema';
import { currencyFmt, dateFmt } from '~/shared/lib/format';
import { DataTable } from '~/shared/shadcn/data-table';

interface Props {
  page: number;
  size: number;
  count: number;
  entries: Transaction[];
}

type TransactionRow = Omit<Transaction, 'searchVector'>;

const columns: ColumnDef<TransactionRow>[] = [
  {
    accessorKey: 'fullName',
    header: 'Full Name',
  },
  {
    accessorKey: 'certificateName',
    header: 'Certificate Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
  },
  {
    accessorKey: 'lastEducation',
    header: 'Last Education',
  },
  {
    accessorKey: 'motherAge',
    header: 'Mother Age',
  },
  {
    accessorKey: 'pregnancyAge',
    header: 'Pregnancy Age',
    cell: ({ cell }) => {
      const value = cell.getValue<number | null>();
      return <span>{value ?? '-'}</span>;
    },
  },
  {
    accessorKey: 'childAge',
    header: 'Child Age',
    cell: ({ cell }) => {
      const value = cell.getValue<number | null>();
      return <span>{value ?? '-'}</span>;
    },
  },
  {
    accessorKey: 'address',
    header: 'Address',
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
    accessorKey: 'paymentStatus',
    header: 'Payment Status',
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
    header: 'Created',
    cell: ({ cell }) => {
      const value = cell.getValue<Date | string>();
      const dateValue = value instanceof Date ? value : new Date(value);
      return <span>{dateFmt.format(dateValue)}</span>;
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated',
    cell: ({ cell }) => {
      const value = cell.getValue<Date | string>();
      const dateValue = value instanceof Date ? value : new Date(value);
      return <span>{dateFmt.format(dateValue)}</span>;
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
