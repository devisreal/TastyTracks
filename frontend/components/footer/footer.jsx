"use client";
import React from "react";
import Link from "next/link";
import Logo from "../Logo";
import { useAuth } from "@/contexts/AuthContext";

export default function Footer() {
  const { IsAuthenticated } = useAuth();
  return (
    <footer className="mt-[14rem]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="-mb-0.5 w-full"
        viewBox="0 0 1367.743 181.155"
      >
        <path
          className="fill-current text-gray-100"
          id="wave"
          data-name="wave"
          d="M0,0S166.91-56.211,405.877-49.5,715.838,14.48,955.869,26.854,1366,0,1366,0V115H0Z"
          transform="translate(1.743 66.155)"
        ></path>
      </svg>
      <div className="border bg-gray-100 bg-gradient-to-b to-transparent pt-1">
        <div className="container m-auto space-y-8 px-6 text-gray-600  md:px-12 lg:px-20">
          <div className="grid grid-cols-8 gap-6 md:gap-0">
            <div className="col-span-8 border-r border-gray-100 md:col-span-2 lg:col-span-3">
              <div className="flex items-center justify-between gap-6 border-b border-white py-6 md:block md:space-y-6 md:border-none md:py-0">
                <Logo fullColoured />
              </div>
            </div>

            <div className="borer col-span-8 md:col-span-6 lg:col-span-5">
              <div className="grid grid-cols-2 gap-6 pb-16 text-right sm:grid-cols-2 md:pl-16">
                <div>
                  <h6 className="font-clash text-lg font-semibold text-gray-800 md:text-xl">
                    Company
                  </h6>
                  <ul className="mt-4 list-inside space-y-4 font-geist font-medium">
                    <li>
                      <Link
                        href="/about"
                        className="transition hover:text-primary-600"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="transition hover:text-primary-600">
                        Blog
                      </a>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="transition hover:text-primary-600"
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="transition hover:text-primary-600">
                        Terms & Conditions
                      </a>
                    </li>
                    <li>
                      <a href="#" className="transition hover:text-primary-600">
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-clash text-lg font-semibold text-gray-800 md:text-xl">
                    Products
                  </h6>
                  <ul className="mt-4 list-inside space-y-4 font-geist font-medium">
                    <li>
                      <Link href="/restaurants" className="transition hover:text-primary-600">
                        Restaurants near me
                      </Link>
                    </li>

                    {!IsAuthenticated && (
                      <li>
                        <Link
                          href="/auth/login"
                          className="transition hover:text-primary-600"
                        >
                          Login
                        </Link>
                      </li>
                    )}

                    {!IsAuthenticated && (
                      <li>
                        <Link
                          href="/auth/customer/signup"
                          className="transition hover:text-primary-600"
                        >
                          Sign Up
                        </Link>
                      </li>
                    )}

                    <li>
                      <Link
                        href="/auth/restaurant/signup"
                        className="transition hover:text-primary-600"
                      >
                        Add your restaurant
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-between border-t border-gray-300 py-4 pb-8 font-geist md:pl-16">
                <span>&copy; Tasty Tracks {new Date().getFullYear()}</span>
                <span>All right reserved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
