"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "../Logo";
import styles from "./Navbar.module.css";
import { Button, Loader } from "@mantine/core";
import { SideNav } from "./SideNav";
import { useAuth } from "@/contexts/AuthContext";
import AuthenticatedMenu from "./AuthenticatedMenu";

export default function Navbar({ instantFixed }) {
  const [colorChange, setColorchange] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuth();
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const changeNavbarColor = () => {
      if (window.scrollY >= 300) {
        setColorchange(true);
      } else {
        setColorchange(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("scroll", changeNavbarColor);

    // Remove event listener when coTimemponent unmounts
    return () => {
      document.removeEventListener("scroll", changeNavbarColor);
    };
  }, []);

  return (
    <>
      {instantFixed ? (
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

              <div className="hidden lg:block">
                <nav aria-label="Global">
                  <ul className="flex items-center gap-6 font-geist font-medium">
                    <li>
                      <Link
                        className={`${colorChange ? `text-gray-500 transition hover:text-gray-500/85 ${pathname === "/" ? "active-link" : ""}` : `text-white hover:text-gray-200 ${pathname === "/" ? "active-link" : ""}`}`}
                        href="/"
                      >
                        {" "}
                        Home{" "}
                      </Link>
                    </li>

                    <li>
                      <Link
                        className={`${colorChange ? `text-gray-500 transition hover:text-gray-500/85 ${pathname === "/about" ? "active-link" : ""}` : `text-white hover:text-gray-200 ${pathname === "/about" ? "active-link" : ""}`}`}
                        href="/about"
                      >
                        {" "}
                        About{" "}
                      </Link>
                    </li>

                    <li>
                      <Link
                        className={`${colorChange ? `text-gray-500 transition hover:text-gray-500/85 ${pathname === "/menu" ? "active-link" : ""}` : `text-white hover:text-gray-200 ${pathname === "/menu" ? "active-link" : ""}`}`}
                        href="/menu"
                      >
                        {" "}
                        Menu{" "}
                      </Link>
                    </li>

                    <li>
                      <Link
                        className={` ${colorChange ? `text-gray-500 transition hover:text-gray-500/75 ${pathname === "/restaurants" ? "active-link" : ""}` : `text-white hover:text-gray-200 ${pathname === "/restaurants" ? "active-link" : ""}`}`}
                        href="/restaurants"
                      >
                        {" "}
                        Find Restaurants{" "}
                      </Link>
                    </li>
                    
                  </ul>
                </nav>
              </div>

              {!isLoading ? (
                <div
                  className="flex items-center gap-4"
                  suppressHydrationWarning
                >
                  {isAuthenticated ? (
                    <AuthenticatedMenu />
                  ) : (
                    <div className="hidden sm:flex sm:gap-4">
                      <Button
                        variant="filled"
                        color="primary"
                        component={Link}
                        href="/auth/login"
                        classNames={{
                          label:
                            "font-medium font-geist text-md px-2 py-1 rounded-md",
                        }}
                      >
                        Login
                      </Button>

                      <div className="hidden sm:flex">
                        <Button
                          variant={colorChange ? "outline" : "white"}
                          color="primary"
                          component={Link}
                          href="/auth/customer/signup"
                          classNames={{
                            label:
                              "font-medium font-geist text-md px-2 py-1 rounded-md",
                          }}
                        >
                          Sign Up
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="block md:hidden">
                    <SideNav
                      instantFixed={instantFixed}
                      colorChange={colorChange}
                    />
                  </div>
                </div>
              ) : (
                <Loader color="white" type="dots" />
              )}
            </div>
          </div>
        </nav>
      ) : (
        <nav
          className={`z-50 w-full ${styles.header_sticky}  ${
            colorChange
              ? `${styles.sticky} border-b border-gray-200 bg-white shadow`
              : "border-b border-gray-200 bg-transparent bg-white shadow"
          }`}
        >
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              <div className="md:flex md:items-center md:gap-12">
                <Logo className={""} fullColoured />
              </div>

              <div className="hidden lg:block">
                <nav aria-label="Global">
                  <ul className="flex items-center gap-6 font-geist font-medium">
                    <li>
                      <Link
                        className={`text-gray-500 transition hover:text-gray-500/85 ${pathname === "/" ? "active-link" : ""}`}
                        href="/"
                      >
                        {" "}
                        Home{" "}
                      </Link>
                    </li>

                    <li>
                      <Link
                        className={`text-gray-500 transition hover:text-gray-500/85 ${pathname === "/about" ? "active-link" : ""}`}
                        href="/about"
                      >
                        {" "}
                        About{" "}
                      </Link>
                    </li>

                    <li>
                      <Link
                        className={`text-gray-500 transition hover:text-gray-500/85 ${pathname === "/menu" ? "active-link" : ""}`}
                        href="/menu"
                      >
                        {" "}
                        Menu{" "}
                      </Link>
                    </li>

                    <li>
                      <Link
                        className={`text-gray-500 transition hover:text-gray-500/85 ${pathname === "/restaurants" ? "active-link" : ""}`}
                        href="/restaurants"
                      >
                        {" "}
                        Find Restaurants{" "}
                      </Link>
                    </li>

                    
                  </ul>
                </nav>
              </div>

              {!isLoading ? (
                <div
                  className="flex items-center gap-4"
                  suppressHydrationWarning
                >
                  {isAuthenticated ? (
                    <AuthenticatedMenu />
                  ) : (
                    <div className="hidden sm:flex sm:gap-4">
                      <Button
                        variant="filled"
                        color="primary"
                        component={Link}
                        href="/auth/login"
                        classNames={{
                          label:
                            "font-medium font-geist text-md px-2 py-1 rounded-md",
                        }}
                      >
                        Login
                      </Button>

                      <div className="hidden sm:flex">
                        <Button
                          variant={colorChange ? "outline" : "white"}
                          color="primary"
                          component={Link}
                          href="/auth/customer/signup"
                          classNames={{
                            label:
                              "font-medium font-geist text-md px-2 py-1 rounded-md",
                          }}
                        >
                          Sign Up
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="block md:hidden">
                    <SideNav />
                  </div>
                </div>
              ) : (
                <Loader color="primary" type="dots" />
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
