import Header from "@/components/header/Header";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import HomeTabs from "@/components/home-tabs/HomeTabs";

export default function Home() {
  return (
    <div className="">
      <Navbar instantFixed />
      <Header />

      <section className="mx-auto mt-[14rem] max-w-[85rem]">
        <h3 className="my-4 text-center font-clash text-3xl font-semibold sm:text-4xl">
          Your Favourite Food Delivery Partner
        </h3>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="p-6 text-center">
            <Image
              alt="Easy Order Image"
              src="/images/gifs/easy-order.gif"
              className="mx-auto"
              width={150}
              height={150}
            />
            <h5 className="mt-4 font-clash text-2xl font-semibold">
              Easy to Order
            </h5>
            <p className="mt-2 font-geist text-base">
              You only need a few steps in ordering food
            </p>
          </div>
          <div className="p-6 text-center">
            <Image
              alt="Fast Delivery Image"
              src="/images/gifs/fast-delivery.gif"
              className="mx-auto"
              width={150}
              height={150}
            />
            <h5 className="mt-4 font-clash text-2xl font-semibold">
              Faster Delivery
            </h5>
            <p className="font-geist text-base">
              Get it even faster. On time, every time.
            </p>
          </div>
          <div className="p-6 text-center">
            <Image
              alt="Best Quality Image"
              src="/images/gifs/best-quality.gif"
              className="mx-auto mt-14"
              width={150}
              height={150}
            />
            <h5 className="mt-4 font-clash text-2xl font-semibold">
              Best Quality
            </h5>
            <p className="font-geist text-base">
              Experience top-notch quality, delivered at your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* <div className="flex gap-x-3 font-geist">
        <Link href="/auth/login">Login</Link>
        <Link href="/auth/customer/signup">Signup</Link>
        <Link href="/auth/restaurant/signup">Signup(Restaurant)</Link>
      </div> */}

      <br />
      <br />
      <br />

      <section className="mx-auto mt-[10rem] max-w-[85rem]">
        <h3 className="my-4 text-center font-clash text-3xl font-semibold sm:text-4xl leading-none">
          Menu That Always Makes You Fall In Love
        </h3>
        <p className="text-center text-gray-600 font-geist text-base md:text-lg">
          Discover a world of delectable treats on our platform.
        </p>
        <HomeTabs />
      </section>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
