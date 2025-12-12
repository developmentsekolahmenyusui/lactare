import type { TransactionLog } from '~/shared/db/schema';
import { dateFmt } from '~/shared/lib/format';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/shared/shadcn/card';
import { logsConfig } from '../constant';

interface TransactionDetailLogsProps {
  logs: TransactionLog[];
  isFetching: boolean;
}

function formatDate(value: Date | string | null | undefined) {
  if (!value) return '-';
  const dateValue = value instanceof Date ? value : new Date(value);
  return dateFmt.format(dateValue);
}

export function TransactionDetailLogs({ logs, isFetching }: TransactionDetailLogsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base sm:text-lg'>Transaction Logs</CardTitle>
        <CardDescription className='text-xs sm:text-sm'>
          {isFetching ? 'Refreshing logs…' : 'Latest activity for this transaction with DOKU'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <p className='text-muted-foreground text-sm'>No logs have been recorded for this transaction yet.</p>
        ) : (
          <div className='relative'>
            {logs.map((log) => {
              const date = new Date(log.createdAt);
              const formattedDate = formatDate(date);

              return (
                <div key={log.id} className='relative'>
                  <div className='flex flex-col gap-y-2 md:flex-row md:gap-y-6'>
                    <div className='shrink-0 md:w-36'>
                      <div className='md:sticky md:top-8'>
                        <time className='text-muted-foreground mb-3 block text-sm font-medium'>{formattedDate}</time>
                      </div>
                    </div>
                    <div className='relative flex-1 pb-10 md:pl-8'>
                      <div className='bg-border absolute top-2 left-0 hidden h-full w-px md:block'>
                        <div className='bg-primary absolute z-10 hidden size-3 -translate-x-1/2 rounded-full md:block' />
                      </div>

                      <div className='space-y-6'>
                        <div className='relative z-10 flex flex-col gap-2'>
                          <h2 className='text-xl font-semibold tracking-tight text-balance'>{logsConfig[log.type]}</h2>
                        </div>
                        <div className='prose dark:prose-invert prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance max-w-none'>
                          <pre className='mt-3 overflow-auto rounded-md bg-neutral-50 p-3 text-xs text-neutral-800'>
                            {JSON.stringify(log.payload, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
