import Logo from "@/components/Logo";
import ResetPasswordForm from "@/components/auth-forms/ResetPasswordForm";

export const metadata = {
  title: "Reset Password | Tasty Tracks",
  description: "...",
};

export default function ResetPasswordPage({ params }) {
  return (
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
  );
}
