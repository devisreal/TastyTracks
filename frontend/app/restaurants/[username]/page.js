"use client";

import Navbar from "@/components/navbar/Navbar";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { Loader, Button, ActionIcon } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import MealCard from "@/components/meal-card/MealCard";

export default function RestaurantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [restaurantDetail, setRestaurantDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const fetchRestaurantDetail = async () => {
      try {
        const response = await axios.get(
          `https://tasty-tracks.onrender.com/auth/restaurant/detail/?username=${params.username}`,
        );
        setRestaurantDetail(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        router.push("/restaurants");
        toast.error("No restaurant with that username found");
      }
    };

    if (params.username) {
      fetchRestaurantDetail();
    }
  }, [params.username, router]);

  return (
    <>
      <Navbar />

      {!isLoading ? (
        <div>
          <div>
            <div className=" px-4 py-6 sm:px-6 lg:px-8">
              <div className="space-y-1.5">
                <h1 className="tracking- text-center font-clash text-4xl font-bold">
                  {restaurantDetail.store_name}
                </h1>
                <p className="text-center font-geist text-gray-600">
                  {restaurantDetail.description}
                </p>
              </div>
              <div className="mx-auto mt-10 grid max-w-screen-md grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium tracking-wide text-gray-500">
                      Location
                    </p>
                    <p className="inline-flex items-center gap-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                      </svg>
                      {restaurantDetail.address_line1}, {restaurantDetail.city},{" "}
                      {restaurantDetail.postcode}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium tracking-wide text-gray-500">
                      Contact
                    </p>
                    <p className="flex items-center gap-x-2">
                      <span className="inline-flex items-center gap-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-5 text-gray-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                          />
                        </svg>
                        {restaurantDetail.phone_number}
                      </span>
                      |
                      <span className="inline-flex items-center gap-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 text-gray-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                          />
                        </svg>
                        {restaurantDetail.user.email}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-24 max-w-[85rem] px-4 sm:px-4 lg:px-0">
                <div className="px-2">
                  <h2 className="font-clash text-xl font-medium md:text-2xl">
                    Meals by {restaurantDetail.store_name}
                  </h2>
                </div>
                {restaurantDetail.menu_items.length > 0 ? (
                  <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-4 lg:space-y-0">
                    {restaurantDetail.menu_items.map((meal) => (
                      <MealCard meal={meal} key={meal.id} menu />
                    ))}
                  </div>
                ) : (
                  <div className="mt-2 flex flex-col items-center justify-center space-y-4 border py-12">
                    <IconX
                      width={40}
                      height={40}
                      stroke={3}
                      className="text-red-500"
                    />
                    <p className="">
                      {restaurantDetail.store_name} has no meals
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen flex-col items-center justify-center gap-y-12">
          <Loader type="bars" color="primary" />
        </div>
      )}
    </>
  );
}
