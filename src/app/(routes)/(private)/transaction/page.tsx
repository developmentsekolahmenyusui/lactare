import { TransactionListPage } from '~/feature/transaction/page/transaction-list';

export default async function Page(props: {
  searchParams?: Promise<{
    page?: string;
    q?: string;
    from?: string;
    to?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className='py-6'>
      <TransactionListPage
        page={Number(searchParams?.page || 1)}
        size={20}
        q={searchParams?.q || null}
        from={searchParams?.from ?? null}
        to={searchParams?.to ?? null}
      />
    </div>
  );
}
