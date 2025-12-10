import { Badge } from '~/shared/shadcn/badge';
import { statusConfig } from '../constant';
import { cn } from '~/shared/lib/shadcn';

interface Props {
  status: string;
}

export function TransactionStatusBadge({ status }: Props) {
  const config = statusConfig[status];
  return (
    <Badge variant='outline' className={cn('border-0', config.className)}>
      {config.label}
    </Badge>
  );
}
