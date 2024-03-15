import React from "react";

export default function OrdersPage() {
  return (
    <>
      <div className="h-fit border-b lg:py-2.5">
        <div className="flex items-center justify-between space-x-4 px-6 2xl:container">
          <h5
            hidden
            className="block font-clash text-2xl font-medium text-gray-800"
          >
            My Orders
          </h5>
        </div>
      </div>
    </>
  );
}
