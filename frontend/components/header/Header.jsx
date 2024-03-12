import React from "react";
import { Button } from "@mantine/core";

export default function Header() {
  return (
    <header className="relative overflow-hidden">
      <img
        alt="Header Image"
        src="https://res.cloudinary.com/ds4h5p2np/image/upload/q_auto:best/v1708987263/tasty_tracks/home-header_jfv392.webp"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="relative flex items-center justify-center bg-gradient-to-t from-gray-900/70 to-gray-900/75 py-40 md:py-48 xl:py-64">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mx-auto text-center lg:mx-0">
            <h2 className="font-clash text-4xl font-bold leading-none tracking-normal text-white sm:text-6xl md:leading-normal">
              Order your favourite food online
            </h2>
            <p className="mt-4 font-geist leading-8 text-gray-100 sm:mt-0 sm:text-lg">
              Fast, fresh, and convenient food delivery.
            </p>

            <div className="mx-auto mt-12 max-w-3xl">
              <label
                htmlFor="search"
                className="sr-only block text-sm font-medium"
              >
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  name="search"
                  className="block w-full rounded-full border-gray-200 px-4 py-4 pe-16 ps-14 font-geist text-md shadow-sm focus:z-10 focus:border-black focus:ring-white focus:ring-offset-2 sm:py-5 md:text-lg"
                  placeholder="e.g. SW11 3TE"
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center ps-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-location-filled text-gray-700"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M20.891 2.006l.106 -.006l.13 .008l.09 .016l.123 .035l.107 .046l.1 .057l.09 .067l.082 .075l.052 .059l.082 .116l.052 .096c.047 .1 .077 .206 .09 .316l.005 .106c0 .075 -.008 .149 -.024 .22l-.035 .123l-6.532 18.077a1.55 1.55 0 0 1 -1.409 .903a1.547 1.547 0 0 1 -1.329 -.747l-.065 -.127l-3.352 -6.702l-6.67 -3.336a1.55 1.55 0 0 1 -.898 -1.259l-.006 -.149c0 -.56 .301 -1.072 .841 -1.37l.14 -.07l18.017 -6.506l.106 -.03l.108 -.018z"
                      strokeWidth="0"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="absolute inset-y-0 end-0 z-20 flex items-center pe-2 sm:pe-3">
                  <Button
                    type="submit"
                    radius="xl"
                    size="lg"
                    className="font-geist"
                    classNames={{
                      label: "text-md md:text-base",
                      inner: "sm:px-4",
                    }}
                    variant="gradient"
                    gradient={{ from: "primary.6", to: "primary.5" }}
                  >
                    Search
                  </Button>
                </div>
              </div>
              <p className="mt-4 font-geist text-sm text-white sm:text-md">
                Enter your post code to see restaurants near you
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
