'use client';

import { AlertCircleIcon } from 'lucide-react';
import { Activity, useActionState } from 'react';
import { login } from '~/shared/lib/session';
import { Alert, AlertTitle } from '~/shared/shadcn/alert';
import { Button } from '~/shared/shadcn/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/shared/shadcn/card';
import { FieldGroup, Field, FieldLabel, FieldDescription } from '~/shared/shadcn/field';
import { Input } from '~/shared/shadcn/input';

export function AuthForm() {
  const [state, action] = useActionState<{ error: string | undefined }, FormData>(login, {
    error: undefined,
  });

  return (
    <div className='flex flex-col gap-6'>
      <Card>
        <CardHeader className='justify-center'>
          <CardTitle className='text-center'>Administrator Access</CardTitle>
          <CardDescription>Enter your admin credentials to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <FieldGroup className='gap-y-3'>
              <Field>
                <FieldLabel htmlFor='username'>Username</FieldLabel>
                <Input id='username' name='username' required />
              </Field>
              <Field>
                <FieldLabel htmlFor='password'>Password</FieldLabel>
                <Input id='password' name='password' type='password' required />
              </Field>
              <Field className='pt-4'>
                <Button className='w-full' type='submit'>
                  Sign in
                </Button>
                <FieldDescription className='text-muted-foreground text-center'>
                  Authorized personnel only
                </FieldDescription>
              </Field>
              <Activity mode={state.error ? 'visible' : 'hidden'}>
                <Field>
                  <Alert variant='destructive'>
                    <AlertCircleIcon />
                    <AlertTitle>{state.error}</AlertTitle>
                  </Alert>
                </Field>
              </Activity>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
