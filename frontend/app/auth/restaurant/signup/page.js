"use client";
import React, { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import AuthSegmentedControl from "@/components/auth-segmented-control/AuthSegmentedControl";
import SignUpForm from "@/components/auth-forms/SignUpForm";
import { Loader } from "@mantine/core";

export default function SignUpPage() {
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
              Sign Up
            </h1>
            <p className="font-geist text-neutral-600 max-md:max-w-full">
              {" "}
              Join us today to unlock exclusive features.
            </p>
          </div>

          <div className=" w-80">
            <AuthSegmentedControl />
          </div>

          <SignUpForm />
          {/* <p className="max-w-2xl text-center">
        Welcome! To get started, create your account below. If you already have
        an account, you can log in to access it. Rest assured, we prioritize
        your privacy and never share your information with third parties.
      </p> */}
        </div>
      )}
    </>
  );
}
