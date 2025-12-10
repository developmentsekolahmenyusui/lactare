'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useDebounce } from '~/shared/hooks/use-debounce';
import { dateFmt } from '~/shared/lib/format';
import { Button } from '~/shared/shadcn/button';
import { Popover, PopoverContent, PopoverTrigger } from '~/shared/shadcn/popover';
import { Input } from '~/shared/shadcn/input';
import { Calendar } from '~/shared/shadcn/calendar';
import { DateRange } from 'react-day-picker';
import { CalendarIcon } from 'lucide-react';

const TransactionDataTableFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const filtered = useDebounce(`${date?.from}-${date?.to}`, 1000);
  const [query, setQuery] = React.useState(() => searchParams.get('q') ?? '');
  const debouncedQuery = useDebounce(query, 500);

  React.useEffect(() => {
    const currentQuery = searchParams.get('q') ?? '';
    setQuery((prev) => (prev === currentQuery ? prev : currentQuery));
  }, [searchParams]);

  React.useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (date && date.from) {
      if (!newSearchParams.has('from')) {
        newSearchParams.append('from', date.from.toISOString());
      } else {
        newSearchParams.set('from', date.from.toISOString());
      }
    } else {
      if (newSearchParams.has('from')) {
        newSearchParams.delete('from');
        newSearchParams.delete('to');
        router.push(`${pathname}?${newSearchParams.toString()}`);
        return;
      }
    }
    if (date && date.to) {
      if (!newSearchParams.has('to')) {
        newSearchParams.append('to', date.to.toISOString());
      } else {
        newSearchParams.set('to', date.to.toISOString());
      }
    } else {
      if (newSearchParams.has('to')) {
        newSearchParams.delete('to');
      }
    }

    const trimmedQuery = debouncedQuery.trim();
    if (trimmedQuery) {
      newSearchParams.set('q', trimmedQuery);
    } else {
      newSearchParams.delete('q');
    }

    if (newSearchParams.has('page')) {
      newSearchParams.set('page', '1');
    }

    const search = newSearchParams.toString();
    router.push(search ? `${pathname}?${search}` : pathname);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, debouncedQuery]);

  return (
    <div className='flex w-full items-center gap-x-3'>
      <Input
        placeholder='Search transactions'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className='max-w-sm'
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button id='date' variant={'outline'}>
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {dateFmt.format(date.from)} - {dateFmt.format(date.to)}
                </>
              ) : (
                dateFmt.format(date.from)
              )
            ) : (
              <span>Select Date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            ISOWeek
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TransactionDataTableFilter;
