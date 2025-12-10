import type { ReactNode } from 'react';

import { TransactionStatusBadge } from './transaction-status-badge';
import type { Transaction } from '~/shared/db/schema';
import { currencyFmt, dateFmt } from '~/shared/lib/format';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/shared/shadcn/card';

interface TransactionDetailCardProps {
  id: string;
  transaction?: Transaction | null;
}

function formatDate(value: Date | string | null | undefined) {
  if (!value) return '-';
  const dateValue = value instanceof Date ? value : new Date(value);
  return dateFmt.format(dateValue);
}

export function TransactionDetailCard({ id, transaction }: TransactionDetailCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-3 text-base sm:text-lg'>
          <span>Transaction Detail</span>
          {transaction ? <TransactionStatusBadge status={transaction.paymentStatus} /> : null}
        </CardTitle>
        <CardDescription className='text-xs sm:text-sm'>Transaction ID: {id}</CardDescription>
        <CardDescription className='text-xs sm:text-sm'>Invoice Number: INV-{id}</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className='grid gap-4 text-sm sm:grid-cols-2'>
          <DetailItem label='Full Name' value={transaction?.fullName ?? '-'} />
          <DetailItem label='Certificate Name' value={transaction?.certificateName ?? '-'} />
          <DetailItem label='Email' value={transaction?.email ?? '-'} />
          <DetailItem label='Phone Number' value={transaction?.phoneNumber ?? '-'} />
          <DetailItem label='Mother Age' value={transaction?.motherAge ?? '-'} />
          <DetailItem label='Pregnancy Age' value={transaction?.pregnancyAge ?? '-'} />
          <DetailItem label='Child Age' value={transaction?.childAge ?? '-'} />
          <DetailItem label='Last Education' value={transaction?.lastEducation ?? '-'} />
          <DetailItem label='Address' value={transaction?.address ?? '-'} />
          <DetailItem label='Amount' value={transaction ? currencyFmt.format(transaction.amount) : '-'} />
          <DetailItem label='Payment Link' value={transaction?.paymentLink ?? '-'} />
          <DetailItem label='Payment Date' value={formatDate(transaction?.paymentAt)} />
          <DetailItem label='Created At' value={formatDate(transaction?.createdAt)} />
          <DetailItem label='Updated At' value={formatDate(transaction?.updatedAt)} />
        </dl>
      </CardContent>
    </Card>
  );
}

function DetailItem({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className='flex flex-col gap-1 rounded-lg border p-4'>
      <dt className='text-muted-foreground text-xs tracking-wide uppercase'>{label}</dt>
      <dd className='font-medium'>{value}</dd>
    </div>
  );
}
