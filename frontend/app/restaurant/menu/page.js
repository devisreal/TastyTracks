"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Loader, TypographyStylesProvider } from "@mantine/core";
import MealCard from "@/components/meal-card/MealCard";
import api from "@/utils/api";

export default function RestaurantMenu() {
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [restaurantMenu, setRestaurantMenu] = useState([]);

  useLayoutEffect(() => {
    const getRestaurantMenu = async () => {
      try {
        const res = await api.get(
          "/menu/menu-items/by_restaurant/",
        );
        if (res.status === 200) {
          setRestaurantMenu(res.data);
          setIsLoadingMenu(false);
        }
      } catch (error) {
        console.error("Fetch Menu Item error", error);
        toast.error("Error fetching menus");
      }
    };
    getRestaurantMenu();
    setIsLoadingMenu(false);
  }, []);

  return (
    <div className="py-2">
      <div className="h-16 border-b dark:border-gray-700 dark:bg-gray-800 lg:py-2.5">
        <div className="flex items-center justify-between space-x-4 px-6 2xl:container">
          <h5
            hidden
            className="block font-clash text-2xl font-medium text-gray-800"
          >
            Menu
          </h5>

          <div className="flex space-x-4">
            <div hidden className="md:block">
              <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                <span className="absolute left-4 flex h-6 items-center border-r border-gray-300 pr-3 dark:border-gray-700">
                  <svg
                    xmlns="http://ww50w3.org/2000/svg"
                    className="w-4 fill-current"
                    viewBox="0 0 35.997 36.004"
                  >
                    <path
                      id="Icon_awesome-search"
                      data-name="search"
                      d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
                    ></path>
                  </svg>
                </span>
                <input
                  type="search"
                  name="leadingIcon"
                  id="leadingIcon"
                  placeholder="Search here"
                  className="w-full rounded-xl border border-gray-300 py-2.5 pl-14 pr-4 text-sm text-gray-600 outline-none transition focus:border-cyan-300 dark:border-gray-700 dark:bg-gray-900"
                />
              </div>
            </div>

            <button
              aria-label="search"
              className="h-10 w-10 rounded-xl border bg-gray-100 active:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:active:bg-gray-800 md:hidden"
            >
              <svg
                xmlns="http://ww50w3.org/2000/svg"
                className="mx-auto w-4 fill-current text-gray-600 dark:text-gray-300"
                viewBox="0 0 35.997 36.004"
              >
                <path
                  id="Icon_awesome-search"
                  data-name="search"
                  d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
                ></path>
              </svg>
            </button>

            <Link
              href="/restaurant/menu/add"
              className="rounded-xl border bg-gray-100 p-2 hover:bg-gray-200 active:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-square-rounded-plus-filled m-auto size-7 text-primary-600"
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
                  d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm0 6a1 1 0 0 0 -1 1v2h-2l-.117 .007a1 1 0 0 0 .117 1.993h2v2l.007 .117a1 1 0 0 0 1.993 -.117v-2h2l.117 -.007a1 1 0 0 0 -.117 -1.993h-2v-2l-.007 -.117a1 1 0 0 0 -.993 -.883z"
                  fill="currentColor"
                  strokeWidth="0"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl py-4 lg:max-w-none lg:py-4">
        {!isLoadingMenu ? (
          <div className="mt-6 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-4 lg:space-y-0">
            {restaurantMenu.map((meal) => (
              <MealCard meal={meal} key={meal.id} restaurant />
            ))}
          </div>
        ) : (
          <div className="flex h-20 flex-col items-center justify-center gap-y-12">
            <Loader type="bars" color="primary" />
          </div>
        )}
      </div>
    </div>
  );
}
