import Header from "@/components/header/Header";
import Navbar from "@/components/navbar/Navbar";
import HomeTabs from "@/components/home-tabs/HomeTabs";
import Footer from "@/components/footer/footer";
import TestimonialCarousel from "@/components/testimonial-carousel/Carousel";
import { Button } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
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

      <section className="my-[14rem] bg-primary-100/60 py-16">
        <div className="mx-auto  max-w-[85rem] overflow-hidden">
          <h3 className="my-4 px-3 text-center font-clash text-3xl font-semibold leading-none sm:px-0 sm:text-4xl">
            What Our Customers Say About Us
          </h3>
          <p className="text-center font-geist text-base text-gray-600 md:text-lg">
            Read what our happy customers have to say about us.
          </p>

          <div className="mt-28 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:gap-8 ">
            <div className="">
              <div className="relative mx-auto w-[320px] sm:w-[360px]">
                <div className="mx-auto rounded-2xl bg-primary-400/70 lg:absolute">
                  <Image
                    src="/images/testimonial.webp"
                    width={360}
                    height={540}
                    alt="Testimonial Image"
                    className="-mt-16"
                  />
                </div>
              </div>
            </div>

            <div className="flex h-[30rem] items-center ">
              <TestimonialCarousel />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-primary-200/40 px-6 pt-16 shadow-xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-40 lg:text-left">
            <h2 className="font-clash text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Get Started With Us Today!
            </h2>
            <p className="mt-4 font-geist text-lg leading-8 text-gray-700">
              Discover food wherever and whenever and get your food delivered
              quickly.
            </p>
            <div className="mt-6 flex items-center justify-center gap-x-6 lg:justify-start">
              <Button
                color="primary"
                size="md"
                radius="md"
                classNames={{
                  label: "text-md font-geist font-medium",
                }}
                component={Link}
                href="/auth/login"
              >
                Get started
              </Button>
              <Link
                href="/about"
                className="group inline-flex gap-x-1.5 font-geist text-sm font-semibold leading-6 text-gray-900 md:text-md"
              >
                Learn more{" "}
                <div
                  aria-hidden="true"
                  className="transition group-hover:translate-x-0.5"
                >
                  →
                </div>
              </Link>
            </div>
          </div>
          <div className="relative mt-16 h-96 sm:h-96 lg:my-8 ">
            <img
              className="left-0 top-0 mx-auto max-w-[24rem] rounded-md sm:w-[30rem] lg:absolute  lg:max-w-none"
              src="/images/illustration3.png"
              alt="App screenshot"
              width={1824}
              height={1080}
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
