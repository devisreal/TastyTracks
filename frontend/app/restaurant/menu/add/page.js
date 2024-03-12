import AddMenuForm from "@/components/menu-forms/AddMenuForm";
import React from "react";

export default function RestaurantAddMenuPage() {
  return (
    <>
      <div className="px-6">
        <div className="flex items-center justify-between space-x-4 border-b  2xl:container lg:py-2.5">
          <h5
            hidden
            className="block font-clash text-2xl font-medium text-gray-800"
          >
            Create Menu
          </h5>
        </div>

        <AddMenuForm />
      </div>
    </>
  );
}
