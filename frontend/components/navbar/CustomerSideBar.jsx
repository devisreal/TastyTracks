"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function CustomerDashboardSideBar() {
  const pathname = usePathname();
  const { logout, isAuthenticated, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout Error:", error);      
    }
  };

  return (
    <div className="sticky top-0 -my-2 divide-y divide-gray-200 font-geist">
      <ul className="space-y-2 py-3">
        <li>
          <Link
            href="/user/profile"
            className={`flex items-center gap-3 border-s-[3px]  px-4 py-3 ${pathname === "/user/profile" ? "border-primary-500 bg-primary-100/80 text-primary-700" : "text-gray-500 hover:border-gray-200 hover:bg-gray-100 hover:text-gray-700 border-transparent"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-user-circle"
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
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
            </svg>

            <span className="text-base font-medium"> Profile </span>
          </Link>
        </li>

        <li>
          <Link
            href="/user/orders"
            className={`flex items-center gap-3 border-s-[3px]  px-4 py-3 ${pathname === "/user/orders" ? "border-primary-500 bg-primary-100/80 text-primary-700" : "text-gray-500 hover:border-gray-200 hover:bg-gray-100 hover:text-gray-700 border-transparent"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-shopping-bag"
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
              <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
              <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
            </svg>

            <span className="text-base font-medium"> Orders </span>
          </Link>
        </li>

        <li>
          <Link
            href="/user/favourites"
            className={`flex items-center gap-3 border-s-[3px]  px-4 py-3 ${pathname === "/user/favourites" ? "border-primary-500 bg-primary-100/80 text-primary-700" : "text-gray-500 hover:border-gray-200 hover:bg-gray-100 hover:text-gray-700 border-transparent"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-heart"
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
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>

            <span className="text-base font-medium"> Favourites </span>
          </Link>
        </li>

        <li>
          <Link
            href="/user/payment-methods"
            className={`flex items-center gap-3 border-s-[3px]  px-4 py-3 ${pathname === "/user/payment-methods" ? "border-primary-500 bg-primary-100/80 text-primary-700" : "text-gray-500 hover:border-gray-200 hover:bg-gray-100 hover:text-gray-700 border-transparent"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-credit-card"
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
              <path d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
              <path d="M3 10l18 0" />
              <path d="M7 15l.01 0" />
              <path d="M11 15l2 0" />
            </svg>

            <span className="text-base font-medium"> Payment Methods </span>
          </Link>
        </li>

        <li>
          <Link
            href="/user/address"
            className={`flex items-center gap-3 border-s-[3px]  px-4 py-3 ${pathname === "/user/address" ? "border-primary-500 bg-primary-100/80 text-primary-700" : "text-gray-500 hover:border-gray-200 hover:bg-gray-100 hover:text-gray-700 border-transparent"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-location-pin"
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
              <path d="M12 18l-2 -4l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5l-2.901 8.034" />
              <path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z" />
              <path d="M19 18v.01" />
            </svg>

            <span className="text-base font-medium"> Addresses </span>
          </Link>
        </li>
      </ul>
      <ul className="space-y-2 py-3">
        <li>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 border-s-[3px] border-transparent px-4 py-3 text-gray-500 hover:border-red-500 hover:bg-red-50 hover:text-red-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-logout"
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
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
              <path d="M9 12h12l-3 -3" />
              <path d="M18 15l3 -3" />
            </svg>

            <span className="text-base font-medium"> Logout </span>
          </button>
        </li>
      </ul>
    </div>
  );
}
