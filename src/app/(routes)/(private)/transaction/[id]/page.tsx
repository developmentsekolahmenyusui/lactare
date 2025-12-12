import { notFound } from 'next/navigation';
import { getTransactionById } from '~/feature/transaction/action';
import { TransactionDetailPage } from '~/feature/transaction/page/transaction-detail';

export default async function Page(props: PageProps<'/transaction/[id]'>) {
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
