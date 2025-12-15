'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';

import { TransactionStatusBadge } from './transaction-status-badge';
import type { Transaction } from '~/shared/db/schema';
import { currencyFmt, dateFmt } from '~/shared/lib/format';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/shared/shadcn/card';
import { Button } from '~/shared/shadcn/button';

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
        <dl className='grid w-full gap-4 text-sm sm:grid-cols-2'>
          <DetailItem
            label='Full Name'
            value={transaction?.fullName ?? '-'}
            copyValue={transaction?.fullName ?? undefined}
          />
          <DetailItem
            label='Certificate Name'
            value={transaction?.certificateName ?? '-'}
            copyValue={transaction?.certificateName ?? undefined}
          />
          <DetailItem label='Email' value={transaction?.email ?? '-'} copyValue={transaction?.email ?? undefined} />
          <DetailItem
            label='Phone Number'
            value={transaction?.phoneNumber ?? '-'}
            copyValue={transaction?.phoneNumber ?? undefined}
          />
          <DetailItem
            label='Mother Age'
            value={transaction?.motherAge ?? '-'}
            copyValue={transaction?.motherAge != null ? transaction.motherAge : undefined}
          />
          <DetailItem
            label='Pregnancy Age'
            value={transaction?.pregnancyAge ?? '-'}
            copyValue={transaction?.pregnancyAge != null ? transaction.pregnancyAge : undefined}
          />
          <DetailItem
            label='Child Age'
            value={transaction?.childAge ?? '-'}
            copyValue={transaction?.childAge != null ? transaction.childAge : undefined}
          />
          <DetailItem
            label='Last Education'
            value={transaction?.lastEducation ?? '-'}
            copyValue={transaction?.lastEducation ?? undefined}
          />
          <DetailItem
            label='Address'
            value={transaction?.address ?? '-'}
            copyValue={transaction?.address ?? undefined}
          />
          <DetailItem
            label='Amount'
            value={transaction ? currencyFmt.format(transaction.amount) : '-'}
            copyValue={transaction ? currencyFmt.format(transaction.amount) : undefined}
          />
          <DetailItem
            label='Payment Link'
            value={transaction?.paymentLink ?? '-'}
            copyValue={transaction?.paymentLink ?? undefined}
          />
          <DetailItem label='Payment Date' value={formatDate(transaction?.paymentAt)} />
          <DetailItem label='Created At' value={formatDate(transaction?.createdAt)} />
          <DetailItem label='Updated At' value={formatDate(transaction?.updatedAt)} />
        </dl>
      </CardContent>
    </Card>
  );
}

function DetailItem({ label, value, copyValue }: { label: string; value: ReactNode; copyValue?: string | number }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timeoutId = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  const derivedCopyValue = copyValue ?? (typeof value === 'string' || typeof value === 'number' ? value : undefined);
  const textToCopy = derivedCopyValue && derivedCopyValue !== '-' ? String(derivedCopyValue) : '';

  const handleCopy = async () => {
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
    } catch (error) {
      console.error('Failed to copy transaction detail value', error);
    }
  };

  return (
    <div className='flex w-full flex-col gap-1 overflow-scroll rounded-lg border p-4'>
      <div className='flex items-start justify-between gap-2'>
        <dt className='text-muted-foreground text-xs tracking-wide uppercase'>{label}</dt>
        {textToCopy ? (
          <Button
            type='button'
            variant='ghost'
            size='icon-sm'
            className='text-muted-foreground'
            aria-label={`Copy ${label}`}
            onClick={handleCopy}
          >
            {copied ? <Check className='size-4 text-emerald-500' /> : <Copy className='size-4' />}
          </Button>
        ) : null}
      </div>
      <div className='w-full overflow-scroll'>
        <dd className='text-sm font-medium sm:text-base'>{value}</dd>
      </div>
    </div>
  );
}
