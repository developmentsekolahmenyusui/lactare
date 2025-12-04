import { Button } from '~/shared/shadcn/button';

export default function Page() {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-y-3'>
      <Button variant='default'>Hello</Button>
      <Button variant='destructive'>Hello</Button>
      <Button variant='ghost'>Hello</Button>
      <Button variant='link'>Hello</Button>
      <Button variant='outline'>Hello</Button>
      <Button variant='secondary'>Hello</Button>
    </div>
  );
}
