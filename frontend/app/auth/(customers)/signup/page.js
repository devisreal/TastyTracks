import React from "react";
import Logo from "@/components/Logo";
import AuthSegmentedControl from "@/components/auth-segmented-control/AuthSegmentedControl";
import SignUpForm from "@/components/auth-forms/SignUpForm";

export default function SignUpPage() {
  return (
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
  );
}

/**
 * 
 * <div className="flex gap-4 p-5 mt-10 rounded-md border border-solid border-[color:var(--Primary-95,#E5EFFF)] text-stone-500 max-md:flex-wrap max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/bcf1fbd7a1f0abc253fa0ff6533c304bf6611d3f1fa4dd40cb28a31939d13519?"
        className="w-6 aspect-square"
      />
      <div className="w-px h-6 bg-sky-100" />
      <div className="grow max-md:max-w-full">Enter your Email</div>
    </div>
 * 
 */
