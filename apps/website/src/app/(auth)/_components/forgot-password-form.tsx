'use client';

import { cn } from '@tazeai/ui/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@tazeai/ui/components/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@tazeai/ui/components/form';
import { Button } from '@tazeai/ui/components/button';
import { useTranslation } from 'react-i18next';
import { emailOtp } from '@tazeai/auth/client';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@tazeai/ui/components/input';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.',
  }),
});

export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const { t } = useTranslation('auth');
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const res = await emailOtp.sendVerificationOtp({
        email: values.email,
        type: 'forget-password',
      });
      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success('Send email link successful');
        // window.location.href = params.get('redirect') || '/';
      }
    } catch (error) {
      toast.error('Send email link failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Social or Email account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="m@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                    {t('sendEmailLink')}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
