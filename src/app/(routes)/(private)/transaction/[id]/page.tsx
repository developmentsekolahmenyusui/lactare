import { notFound } from 'next/navigation';
import { getTransactionById } from '~/feature/transaction/action';
import { TransactionDetailPage } from '~/feature/transaction/page/transaction-detail';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const transaction = await getTransactionById(params.id);

  if (!transaction) {
    notFound();
  }

  return (
    <div className='py-6'>
      <TransactionDetailPage id={params.id} initialTransaction={transaction} />
    </div>
  );
}
