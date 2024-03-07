"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function RestaurantDashboardSideBar() {
  const pathname = usePathname();
  const { logout, isAuthenticated, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout Error:", error);
      // Handle logout error (e.g., display error message)
    }
  };

  return (
    <div className="sticky top-0 -my-2 divide-y divide-gray-200 font-geist">
      <ul className="space-y-2 py-3">
        <li>
          <Link
            href="/restaurant/dashboard"
            className={`flex items-center gap-3 border-s-[3px]  px-4 py-3 ${pathname === "/restaurant/dashboard" ? "border-primary-500 bg-primary-100/80 text-primary-700" : " border-transparent text-gray-500 hover:border-gray-200 hover:bg-gray-100 hover:text-gray-700"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-layout-grid"
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
              <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
              <path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
              <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
              <path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
            </svg>

            <span className="text-base font-medium"> Dashboard </span>
          </Link>
        </li>

        <li>
          <Link
            href="/restaurant/orders"
            className={`flex items-center gap-3 border-s-[3px]  px-4 py-3 ${pathname === "/restaurant/orders" ? "border-primary-500 bg-primary-100/80 text-primary-700" : "border-transparent text-gray-500 hover:border-gray-200 hover:bg-gray-100 hover:text-gray-700"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-basket"
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
              <path d="M10 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
              <path d="M5.001 8h13.999a2 2 0 0 1 1.977 2.304l-1.255 7.152a3 3 0 0 1 -2.966 2.544h-9.512a3 3 0 0 1 -2.965 -2.544l-1.255 -7.152a2 2 0 0 1 1.977 -2.304z" />
              <path d="M17 10l-2 -6" />
              <path d="M7 10l2 -6" />
            </svg>

            <span className="text-base font-medium"> Orders </span>
          </Link>
        </li>

        <li>
          <Link
            href="/restaurant/menu"
            className={`flex items-center gap-3 border-s-[3px]  px-4 py-3 ${pathname === "/restaurant/menu" || pathname === "/restaurant/menu/add" ? "border-primary-500 bg-primary-100/80 text-primary-700" : "border-transparent text-gray-500 hover:border-gray-200 hover:bg-gray-100 hover:text-gray-700"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-tools-kitchen-2"
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
              <path d="M19 3v12h-5c-.023 -3.681 .184 -7.406 5 -12zm0 12v6h-1v-3m-10 -14v17m-3 -17v3a3 3 0 1 0 6 0v-3" />
            </svg>

            <span className="text-base font-medium"> Menu </span>
          </Link>
        </li>

        <li>
          <Link
            href="/restaurant/promotions"
            className={`flex items-center gap-3 border-s-[3px]  px-4 py-3 ${pathname === "/restaurant/promotions" ? "border-primary-500 bg-primary-100/80 text-primary-700" : "border-transparent text-gray-500 hover:border-gray-200 hover:bg-gray-100 hover:text-gray-700"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-badge-ad"
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
              <path d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
              <path d="M14 9v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
              <path d="M7 15v-4.5a1.5 1.5 0 0 1 3 0v4.5" />
              <path d="M7 13h3" />
            </svg>

            <span className="text-base font-medium"> Promotions </span>
          </Link>
        </li>

        <li>
          <Link
            href="/restaurant/reviews"
            className={`flex items-center gap-3 border-s-[3px]  px-4 py-3 ${pathname === "/restaurant/reviews" ? "border-primary-500 bg-primary-100/80 text-primary-700" : "border-transparent text-gray-500 hover:border-gray-200 hover:bg-gray-100 hover:text-gray-700"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-star-half-filled"
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
                d="M12 1a.993 .993 0 0 1 .823 .443l.067 .116l2.852 5.781l6.38 .925c.741 .108 1.08 .94 .703 1.526l-.07 .095l-.078 .086l-4.624 4.499l1.09 6.355a1.001 1.001 0 0 1 -1.249 1.135l-.101 -.035l-.101 -.046l-5.693 -3l-5.706 3c-.105 .055 -.212 .09 -.32 .106l-.106 .01a1.003 1.003 0 0 1 -1.038 -1.06l.013 -.11l1.09 -6.355l-4.623 -4.5a1.001 1.001 0 0 1 .328 -1.647l.113 -.036l.114 -.023l6.379 -.925l2.853 -5.78a.968 .968 0 0 1 .904 -.56zm0 3.274v12.476a1 1 0 0 1 .239 .029l.115 .036l.112 .05l4.363 2.299l-.836 -4.873a1 1 0 0 1 .136 -.696l.07 -.099l.082 -.09l3.546 -3.453l-4.891 -.708a1 1 0 0 1 -.62 -.344l-.073 -.097l-.06 -.106l-2.183 -4.424z"
                strokeWidth="0"
                fill="currentColor"
              />
            </svg>

            <span className="text-base font-medium"> Reviews </span>
          </Link>
        </li>
      </ul>
      <ul className="space-y-2 py-3">
        <li>
          <Link
            href="/restaurant/settings"
            className={`flex items-center gap-3 border-s-[3px]  px-4 py-3 ${pathname === "/restaurant/settings" ? "border-primary-500 bg-primary-100/80 text-primary-700" : "border-transparent text-gray-500 hover:border-gray-200 hover:bg-gray-100 hover:text-gray-700"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-settings"
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
              <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
              <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
            </svg>

            <span className="text-base font-medium"> Settings </span>
          </Link>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 border-s-[3px] border-transparent  px-4 py-3 text-gray-500 hover:border-red-500 hover:bg-red-50 hover:text-red-700 "
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
