"use client";
import React from "react";
import { Button } from "@mantine/core";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { IconPhoto, IconExternalLink, IconArrowRight } from '@tabler/icons-react';

export default function RestaurantProfile() {
  const { user } = useAuth();

  return (
    <>
      <div
        className="sticky top-0 border-b dark:border-gray-700 dark:bg-gray-800 lg:py-2.5"
        suppressHydrationWarning
      >
        <header>
          <div className="mx-auto max-w-screen-xl px-2 py-4 sm:px-6 sm:py-3 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl font-clash">
                  Welcome Back, {user?.full_name}
                </h1>

                <p className="mt-1.5 text-sm text-gray-500 font-geist">
                  Let's create a new menu item! ‍! 🎉
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center font-geist">
                <Button                  
                  type="button"
                  color="dark"
                  variant="light"
                  rightSection={<IconExternalLink size={18} />}
                  component={Link}
                  href="/restaurant/orders"
                >
                  View Orders                  
                </Button>

                <Button
                  color="primary"                  
                  component={Link}
                  href="/restaurant/menu/add"
                >
                  Create Menu
                </Button>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
