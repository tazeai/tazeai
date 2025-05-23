"use client";

import { cn } from "@tazeai/ui/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@tazeai/ui/components/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@tazeai/ui/components/form";
import { Button } from "@tazeai/ui/components/button";
import { useTranslation } from "react-i18next";
import { signIn } from "@tazeai/auth/client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@tazeai/ui/components/input";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { Label } from "@tazeai/ui/components/label";
import Link from "next/link";
import { authConfig } from "config/auth";
import { Social } from "./social";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { t } = useTranslation("auth");
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSocialLogin = async (provider: "github" | "google") => {
    try {
      setIsLoading(true);
      const res = await signIn.social({
        provider,
        callbackURL: window.location.href,
      });
      if (res.error) {
        toast.error(res.error.message);
      } else {
        if (res.data.redirect && res.data.url) {
          window.location.href = res.data.url;
        } else {
          toast.success("Sign in successful");
          window.location.href = params.get("redirect") || window.location.href;
        }
      }
    } catch (error) {
      toast.error("Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const res = await signIn.email({
        email: values.email,
        password: values.password,
      });
      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success("Sign in successful");
        window.location.href = params.get("redirect") || "/";
      }
    } catch (error) {
      toast.error("Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome Back</CardTitle>
          <CardDescription>
            Login with your Social or Email account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <Social onClick={onSocialLogin} isLoading={isLoading} />
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
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link
                              href="/forgot-password"
                              className="ml-auto text-sm underline-offset-4 hover:underline"
                            >
                              Forgot your password?
                            </Link>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="********"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && (
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    )}
                    {t("signIn")}
                  </Button>
                </div>
              </form>
            </Form>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href={authConfig.pages.signUp}
                className="underline underline-offset-4"
              >
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
