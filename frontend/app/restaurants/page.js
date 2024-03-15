"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { Loader, Button } from "@mantine/core";

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/auth/restaurants/",
        );

        setRestaurants(response.data);
        setIsLoadingRestaurants(false);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-6 lg:px-8 xl:px-0">
        <header className="bg-gray-10 restaurant_header mx-auto mt-6 flex h-[40rem] max-w-[85rem] flex-col items-start justify-end rounded-2xl p-8 sm:p-12">
          <h1 className="font-clash text-4xl font-bold text-white md:text-6xl">
            Restaurants
          </h1>

          <p className="font-geist text-base text-gray-200 md:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </p>
        </header>
      </div>

      {/* {restaurants.map((restaurant) => (
        <li className="mx-auto my-20 max-w-md">
          <Link href={`/restaurants/${restaurant?.user.username}`}>
            {restaurant?.user.username}
          </Link>
        </li>
      ))} */}

      <div className="w-full py-12">
        <div className="mx-auto mt-6 grid max-w-[85rem] gap-6 px-4 md:grid-cols-2 xl:grid-cols-3">
          {!isLoadingRestaurants ? (
            <>
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant.restaurant_id}
                  className="rounded-lg border shadow-sm transition hover:shadow-md"
                >
                  <div className="flex h-full flex-col">
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div className="space-y-2">
                        <h2 className="font-clash text-xl font-semibold">
                          {restaurant.store_name}
                        </h2>
                        <p className="font-giest text-sm text-gray-600">
                          {restaurant.address_line1}, {restaurant.city}, {restaurant.country}
                        </p>
                        <p className="text-sm text-gray-500">{restaurant.phone_number}</p>
                      </div>
                      <div className="mt-2 flex items-center justify-end space-x-2">
                        <Button
                          color="#333"
                          variant="light"
                          className="text-sm font-medium underline"
                          component={Link}
                          href={`/restaurants/${restaurant?.user.username}`}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="mx-auto w-full max-w-sm rounded-md border border-gray-200 p-4 shadow">
              <div className="flex animate-pulse space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 rounded bg-slate-200"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-2 rounded bg-slate-200"></div>
                      <div className="col-span-1 h-2 rounded bg-slate-200"></div>
                    </div>
                    <div className="h-2 rounded bg-slate-200"></div>
                  </div>
                  <div className="ml-auto h-10 w-28 rounded bg-slate-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
