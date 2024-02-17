"use client";
import React, { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import AuthSegmentedControl from "@/components/auth-segmented-control/AuthSegmentedControl";
import ResetPasswordForm from "@/components/auth-forms/ResetPasswordForm";
import { Loader } from "@mantine/core";

export default function ResetPasswordPage({ params }) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, []);
  

  return (
    <>
      {isLoading ? (
        <div className="flex h-full flex-col items-center justify-center gap-y-12">
          <Loader type="bars" color="primary" />
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-y-8">
          <Logo />

          <div className=" text-center">
            <h1 className="font-clash text-3xl font-semibold sm:text-4xl">
              Reset Password
            </h1>
            <p className="font-geist text-neutral-600 max-md:max-w-full">
              {" "}
              Enter your new password below to reset your account password
            </p>
          </div>

          <ResetPasswordForm params={params} />
        </div>
      )}
    </>
  );
}
