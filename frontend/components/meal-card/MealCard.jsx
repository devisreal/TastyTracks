"use client";
import React from "react";
import Link from "next/link";
import { IconSquareRoundedPlusFilled, IconEdit } from "@tabler/icons-react";
import { useAuth } from "@/contexts/AuthContext";

export default function MealCard({ meal, restaurant = false, menu = false }) {
  const { user } = useAuth();
  return (
    <div
      key={meal.id}
      className="bg-gray-00 group relative rounded-2xl p-3 py-6"
    >
      <div className="sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 relative h-80 w-full overflow-hidden rounded-xl bg-white group-hover:opacity-80 sm:h-60">
        <img
          src={meal.image_1}
          alt={meal.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <h3 className="mt-4 font-clash text-md font-medium text-gray-900 md:text-xl">
        {menu && <Link href={`/menu/${meal.slug}`}>{meal.name}</Link>}
        {restaurant && (
          <Link href={`/restaurant/menu/${meal.slug}`}>{meal.name}</Link>
        )}
      </h3>
      <div className="mt-2 flex items-center justify-between">
        <p className="font-giest text-base font-medium text-gray-900">
          £{meal.price}
        </p>

        {user.user_type === "customer" && (
          <IconSquareRoundedPlusFilled width={30} height={30} />
        )}
        {user.user_type === "restaurant" && <IconEdit width={22} height={22} />}
      </div>
    </div>
  );
}
