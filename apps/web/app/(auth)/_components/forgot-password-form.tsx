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
import { client } from "@tazeai/auth/client";
import { Loader2 } from "@tazeai/ui/components/icons";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@tazeai/ui/components/input";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@tazeai/ui/components/input-otp";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

const otpFormSchema = z.object({
  otp: z.string().length(6, {
    message: "Invalid OTP.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

const otpLength = 6;

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { t } = useTranslation("auth");
  const params = useSearchParams();
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const otpForm = useForm<z.infer<typeof otpFormSchema>>({
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const res = await client.emailOtp.sendVerificationOtp({
        email: values.email,
        type: "forget-password",
      });
      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success("Send email link successful");
        setShowOtpForm(true);
        otpForm.setValue("email", values.email);
      }
    } catch (error) {
      toast.error("Send email link failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onOtpSubmit = async (values: z.infer<typeof otpFormSchema>) => {
    try {
      setIsLoading(true);
      const res = await client.emailOtp.verifyEmail({
        email: values.email,
        otp: values.otp,
      });
      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success("Verify email successful");
        setShowOtpForm(false);
      }
    } catch (error) {
      toast.error("Verify email failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        {showOtpForm ? (
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              <Button
                variant="link"
                size="sm"
                onClick={() => setShowOtpForm(false)}
              >
                Back
              </Button>
              Verification
            </CardTitle>
            <CardDescription>
              If you have an account, we have sent a code to{" "}
              <span className="font-bold">{otpForm.getValues("email")}</span>.
              Enter it below.
            </CardDescription>
          </CardHeader>
        ) : (
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              Login with your Social or Email account
            </CardDescription>
          </CardHeader>
        )}
        <CardContent>
          <div className="grid gap-6">
            {showOtpForm ? (
              <Form {...otpForm} key="otp-form">
                <form onSubmit={otpForm.handleSubmit(onOtpSubmit)}>
                  <div className="grid gap-6">
                    <FormField
                      control={otpForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputOTP
                              maxLength={otpLength}
                              {...field}
                              containerClassName="w-full justify-center"
                            >
                              {Array.from({ length: otpLength }).map(
                                (_, index) => (
                                  <InputOTPGroup key={index}>
                                    <InputOTPSlot index={index} />
                                  </InputOTPGroup>
                                ),
                              )}
                            </InputOTP>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      )}
                      {t("forgotPasswordVerify")}
                    </Button>
                  </div>
                </form>
              </Form>
            ) : (
              <Form {...form} key="form">
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
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      )}
                      {t("sendEmailLink")}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
