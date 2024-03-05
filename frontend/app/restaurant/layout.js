import Navbar from "@/components/navbar/Navbar";
import RestaurantDashboardSideBar from "@/components/navbar/RestaurantSideBar";
import React from "react";

export default function RestaurantDashboardLayout({ children }) {
  return <>
  <Navbar />

  <main className="mx-auto mt-14 max-w-[90rem] ">
    <div className="grid grid-cols-1 gap-4 px-4 sm:px-8 md:px-8 lg:grid-cols-3 lg:gap-6 lg:px-0">
      <div className="hidden px-12 lg:block">
        <RestaurantDashboardSideBar />
      </div>
      <div className="h-96 rounded-lg bg-gray-100 lg:col-span-2">
        {children}
      </div>
    </div>
  </main>

  {/* {children} */}
</>
}