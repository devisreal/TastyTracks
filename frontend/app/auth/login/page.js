import React from "react";
import AuthSegmentedControl from "@/components/auth-segmented-control/AuthSegmentedControl";
import Logo from "@/components/Logo";
import LoginForm from "@/components/auth-forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-10">
      <Logo />

      <div className="text-center">
        <h1 className="font-clash text-3xl font-semibold sm:text-4xl">Login</h1>
        <p className="font-geist text-neutral-600 max-md:max-w-full">
          Welcome back! Please log in to access your account.
        </p>
      </div>

      <div className="w-80">
        <AuthSegmentedControl />
      </div>

      <LoginForm />

      <p className="max-w-2xl text-center">
        Welcome back! Please log in to access your account. If you don&apos;t have an
        account yet, you can create one by clicking on the &lsquo;Sign Up&rsquo; button
        below. We take your privacy seriously and will never share your
        information with third parties.
      </p>
    </div>
  );
}
