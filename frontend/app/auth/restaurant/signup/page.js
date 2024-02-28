import Logo from "@/components/Logo";
import SignUpRestaurantForm from "@/components/auth-forms/SignUpRestaurantForm";

export const metadata = {
  title: "Restaurant Sign Up | Tasty Tracks",
  description: "...",
};

export default function RestaurantSignUpPage() {
  return (
    <div className="flex h-full flex-col justify-center  py-1 sm:gap-y-4">
      <Logo IconColoured className={"sm:mx-auto"} />

      <div className="sm:text-center">
        <h1 className="font-clash text-3xl font-semibold sm:text-4xl">
          Add a Restaurant
        </h1>
        <p className="font-geist text-sm text-neutral-600 max-md:max-w-full sm:text-base">
          {" "}
          Expand Your Reach – Sign Up Your Restaurant with Us
        </p>
      </div>

      <SignUpRestaurantForm />
    </div>
  );
}
