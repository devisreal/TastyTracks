import React from "react";
import Logo from "@/components/Logo";
import ForgotPasswordForm from "@/components/auth-forms/ForgotPasswordForm";

export const metadata = {
  title: "Password Reset | Tasty Tracks",
  description: "...",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex h-[100dvw] flex-col items-center justify-center gap-y-6 sm:h-full">
      <Logo IconColoured />

      <div className="text-center">
        <h1 className="font-clash text-3xl font-semibold sm:text-4xl">
          Forgot Password?
        </h1>
        <p className="font-geist text-sm text-neutral-600 max-md:max-w-full sm:text-base">
          Enter your email and we will send a reset link to your email
        </p>
      </div>

      <ForgotPasswordForm />
    </div>
  );
}
