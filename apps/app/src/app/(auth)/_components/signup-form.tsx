"use client";

import { cn } from "@tazeai/ui/lib/utils";
import { Button } from "@tazeai/ui/components/button";
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
import Link from "next/link";
import { Input } from "@tazeai/ui/components/input";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { signUp, signIn } from "@tazeai/auth/client";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { env } from "@/env";
import { authConfig } from "@/config/auth";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function SignUpForm({
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
      password: "",
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
          toast.success("Sign up successful");
          window.location.href = params.get("redirect") || "/";
        }
      }
    } catch (error) {
      toast.error("Sign up failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const res = await signUp.email({
        email: values.email,
        password: values.password,
        name: "",
        image: "",
      });
      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success("Sign up successful");
        window.location.href = params.get("redirect") || "/";
      }
    } catch (error) {
      toast.error("Sign up failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Get Started</CardTitle>
          <CardDescription>
            Create an account with your email and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  {env.NEXT_PUBLIC_AUTH_GITHUB_ENABLED && (
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      disabled={isLoading}
                      onClick={() => onSocialLogin("github")}
                    >
                      <FaGithub className="size-4" />
                      Sign up with Github
                    </Button>
                  )}
                  {env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED && (
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      disabled={isLoading}
                      onClick={() => onSocialLogin("google")}
                    >
                      <FaGoogle className="size-4" />
                      Sign up with Google
                    </Button>
                  )}
                </div>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
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
                        <FormLabel>Password</FormLabel>
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
                  <Button type="submit" className="w-full">
                    {t("signUp")}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href={authConfig.pages.signIn}
                    className="underline underline-offset-4"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
