import Header from "@/components/header/Header";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import HomeTabs from "@/components/home-tabs/HomeTabs";
import TestimonialCarousel from "@/components/testimonial-carousel/Carousel";

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

      <section className="mx-auto mt-[14rem] max-w-[85rem]">
        <h3 className="my-4 px-3 text-center font-clash text-3xl font-semibold leading-none sm:px-0 sm:text-4xl">
          Menu That Always Makes You Fall In Love
        </h3>
        <p className="text-center font-geist text-base text-gray-600 md:text-lg">
          Discover a world of delectable treats on our platform.
        </p>
        <HomeTabs />
      </section>

      <div className="bg-primary-100/60 py-16 mt-[14rem]">
        <section className="mx-auto  max-w-[85rem] overflow-hidden">
          <h3 className="my-4 px-3 text-center font-clash text-3xl font-semibold leading-none sm:px-0 sm:text-4xl">
            What Our Customers Say About Us
          </h3>
          <p className="text-center font-geist text-base text-gray-600 md:text-lg">
            Read what our happy customers have to say about us.
          </p>

          <div className="mt-28 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:gap-8 ">
            <div className="">
              <div className="relative mx-auto w-[360px]">
                <div className="mx-auto rounded-2xl bg-primary-400/70 lg:absolute">
                  <Image
                    src="/images/testimonial.webp"
                    width={360}
                    height={540}
                    alr="Testimonial Image"
                    className="-mt-16"
                  />
                </div>
              </div>
            </div>

            <div className="flex h-[30rem] items-center ">
              <TestimonialCarousel />
            </div>
          </div>
        </section>
      </div>

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

      <div className="flex gap-x-3 font-geist">
        <Link href="/auth/login">Login</Link>
        <Link href="/auth/customer/signup">Signup</Link>
        <Link href="/auth/restaurant/signup">Signup(Restaurant)</Link>
      </div>
    </div>
  );
}
