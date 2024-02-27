import React from "react";
import Logo from "@/components/Logo";
import VerifyEmailForm from "@/components/auth-forms/VerifyEmailForm";

export const metadata = {
  title: "Verify Email | Tasty Tracks",
  description: "...",
};

export default function VerifyEmailPage() {
  return (
    <div className="flex h-[100dvw] flex-col items-center justify-center gap-y-6 sm:h-full">
      <Logo IconColoured />

      <div className="text-center">
        <h1 className="font-clash text-3xl font-semibold sm:text-4xl">
          Verify Account
        </h1>
        <p className="font-geist text-neutral-600 max-md:max-w-full">
          Verify your account to unlock all the features and benefits.
        </p>
      </div>

      <VerifyEmailForm />
    </div>
  );
}
