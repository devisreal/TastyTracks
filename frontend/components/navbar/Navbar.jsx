"use client";
import React, { useState } from "react";
import Link from "next/link";
import Logo from "../Logo";
import styles from "./Navbar.module.css";

export default function Navbar({ instantFixed }) {
  const [colorChange, setColorchange] = useState(false);

  const changeNavbarColor = () => {
    if (window.scrollY >= 300) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", changeNavbarColor);
  }

  return (
    <nav
      className={`w-full ${instantFixed ? "fixed" : ""} ${styles.header_sticky}  ${
        colorChange
          ? `${styles.sticky} border-b border-gray-200 bg-white shadow`
          : "bg-transparent py-1"
      }`}
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            {colorChange ? (
              <Logo className={""} fullColoured />
            ) : (
              <Logo className={""} fullWhite />
            )}
          </div>

          <div className="hidden  md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 font-geist font-medium">
                <li>
                  <Link
                    className={` ${colorChange ? "text-gray-500 transition hover:text-gray-500/75" : "text-white"}`}
                    href="/"
                  >
                    {" "}
                    Home{" "}
                  </Link>
                </li>

                <li>
                  <Link
                    className={` ${colorChange ? "text-gray-500 transition hover:text-gray-500/75" : "text-white"}`}
                    href="/about"
                  >
                    {" "}
                    About{" "}
                  </Link>
                </li>

                <li>
                  <a
                    className={` ${colorChange ? "text-gray-500 transition hover:text-gray-500/75" : "text-white"}`}
                    href="#"
                  >
                    {" "}
                    Menu{" "}
                  </a>
                </li>

                <li>
                  <a
                    className={` ${colorChange ? "text-gray-500 transition hover:text-gray-500/75" : "text-white"}`}
                    href="#"
                  >
                    {" "}
                    Find Restaurants{" "}
                  </a>
                </li>

                <li>
                  <a
                    className={` ${colorChange ? "text-gray-500 transition hover:text-gray-500/75" : "text-white"}`}
                    href="#"
                  >
                    {" "}
                    Special Offers{" "}
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4 hidden">
              <Link
                className="rounded-md bg-primary-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                href="/auth/login"
              >
                Login
              </Link>

              <div className="hidden sm:flex">
                <Link
                  className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-semibold text-primary-600"
                  href="/auth/customer/signup"
                >
                  Register
                </Link>
              </div>
            </div>

            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
