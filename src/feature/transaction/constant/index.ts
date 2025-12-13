export const statusConfig: Record<string, { label: string; className: string }> = {
  paid: {
    label: 'Paid',
    className: 'bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  },
  pending: {
    label: 'Pending',
    className: 'bg-amber-500/15 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  },
  failed: {
    label: 'Failed',
    className: 'bg-rose-500/15 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
  },
  expired: {
    label: 'Expired',
    className: 'bg-rose-500/15 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400',
  },
} as const;

export const logsConfig: Record<string, string> = {
  payment_request: 'Payment Request to DOKU',
  payment_response: 'Payment Response from DOKU',
  callback_request: 'Payment Callback from DOKU',
  callback_response: 'Payment Callback to DOKU',
  payment_expired: 'Payment Link Expired'
} as const;
