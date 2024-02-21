import Logo from "@/components/Logo";
import AuthSegmentedControl from "@/components/auth-segmented-control/AuthSegmentedControl";
import SignUpCustomerForm from "@/components/auth-forms/SignUpCustomerForm";

export const metadata = {
  title: "Customer Sign Up | Tasty Tracks",
  description: "...",
};

export default function CustomerSignUpPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-8">
      <Logo />

      <div className=" text-center">
        <h1 className="font-clash text-3xl font-semibold sm:text-4xl">
          Sign Up
        </h1>
        <p className="font-geist text-sm text-neutral-600 max-md:max-w-full sm:text-base">
          {" "}
          Join us today to unlock exclusive features.
        </p>
      </div>

      <div className=" w-80">
        <AuthSegmentedControl />
      </div>

      <SignUpCustomerForm />
      {/* <p className="max-w-2xl text-center">
        Welcome! To get started, create your account below. If you already have
        an account, you can log in to access it. Rest assured, we prioritize
        your privacy and never share your information with third parties.
      </p> */}
    </div>
  );
}
