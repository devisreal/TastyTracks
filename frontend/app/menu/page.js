"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import axios from "axios";
import {  
  IconArrowNarrowRight,
} from "@tabler/icons-react";
import { Loader } from "@mantine/core";
import MealCard from "@/components/meal-card/MealCard";

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [sortedMenuItems, setSortedMenuItems] = useState([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/menu/all-menu-items/",
        );

        setMenu(response.data);
        setSortedMenuItems(response.data);
        setIsLoadingMenu(false);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/menu/category/",
        );
        const firstFiveCategories = response.data.slice(0, 5); // Get first five categories
        setCategories(firstFiveCategories);
        setIsLoadingCategories(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchMenus();
    fetchCategories();
  }, []);

  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    sortMenuItems(selectedOption);
  };

  const sortMenuItems = (option) => {
    const sorted = [...menu].sort((a, b) => {
      // Custom sorting logic based on option (ascending or descending)
      if (option === "asc") {
        return a.price - b.price;
      } else if (option === "desc") {
        return b.price - a.price;
      }
    });
    setSortedMenuItems(sorted);
  };

  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-6 lg:px-8 xl:px-0">
        <header className="bg-gray-10 menu_header mx-auto mt-6 flex h-[40rem] max-w-[85rem] flex-col items-start justify-end rounded-2xl p-8 sm:p-12">
          <h1 className="font-clash text-4xl font-bold text-white md:text-6xl">
            Menu
          </h1>

          <p className="font-geist text-base text-gray-200 md:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </p>
        </header>
      </div>
      <section className="mx-auto mt-20 max-w-[85rem]">
        {!isLoadingCategories ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5">
            {categories.map((category, index) => (
              <div className="group mx-auto w-fit" key={index}>
                <div
                  style={{
                    position: "relative",
                    width: "260px",
                    height: "150px",
                  }}
                >
                  <Image
                    src={category.image}
                    alt={category.image}
                    sizes="250px"
                    fill
                    style={{
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                    className="transition duration-300 group-hover:scale-[1.02]"
                  />
                </div>

                <h5 className="mt-3 font-clash text-xl font-medium">
                  {category.name}
                </h5>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-20 flex-col items-center justify-center gap-y-12">
            <Loader type="bars" color="primary" />
          </div>
        )}
      </section>

      <section className="mx-auto mt-20 max-w-[85rem] px-6">
        <div className="mt-6">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <input
              type="search"
              id="search"
              name="search"
              className="text- block w-full rounded-xl border-gray-300 px-4 py-4 ps-14 font-geist shadow-sm focus:z-10 focus:border-primary-500 focus:ring-primary-500 md:text-lg"
              placeholder="Search for items or stores"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center ps-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <span className="inline-flex w-fit gap-x-2 rounded-full border-none bg-gray-100 px-4 py-2 font-geist text-md font-medium focus:border-none focus:outline-none">
            Sort by <IconArrowNarrowRight />
          </span>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            className="block w-fit rounded-full border-none bg-gray-100 px-6 py-2 pe-9 font-geist text-md font-medium focus:border-none focus:outline-none"
          >
            <option value="">Price</option>
            <option value="asc">Price (Low to High)</option>
            <option value="desc">Price (High to Low)</option>
          </select>
          <select className="block w-fit rounded-full border-none bg-gray-100 px-6 py-2 pe-9 font-geist text-md font-medium focus:border-none focus:outline-none">
            <option defaultValue>Rating</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
      </section>

      <div className="mx-auto max-w-[85rem] px-4 sm:px-4 lg:px-0">
        <div className="mx-auto max-w-2xl py-4 lg:max-w-none lg:py-4">
          {!isLoadingMenu ? (
            <div className="mt-6 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-4 lg:space-y-0">
              {sortedMenuItems.map((meal) => (
                <MealCard meal={meal} key={meal.id} menu />
              ))}
            </div>
          ) : (
            <div className="flex h-20 flex-col items-center justify-center gap-y-12">
              <Loader type="bars" color="primary" />
            </div>
          )}
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
