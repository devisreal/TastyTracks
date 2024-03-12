"use client";

import Navbar from "@/components/navbar/Navbar";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { Loader, Button } from "@mantine/core";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

export default function MenuDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [menuDetail, setMenuDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [menuImages, setMenuImages] = useState([]);
  const [mainImage, setMainImage] = useState(0);

  useLayoutEffect(() => {
    const fetchMenuDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/menu/menu-items/${params.slug}`,
        );
        setMenuDetail(response.data);
        setIsLoading(false);

        const images = [];
        if (response.data.image_1) images.push(response.data.image_1);
        if (response.data.image_2) images.push(response.data.image_2);
        if (response.data.image_3) images.push(response.data.image_3);
        setMenuImages(images);
      } catch (error) {
        router.push("/menu");
        toast.error("No meal with that name found");
      }
    };

    if (params.slug) {
      fetchMenuDetail();
    }
  }, [params.slug, router]);

  return (
    <div>
      {!isLoading ? (
        <div className="py-6">
          <div className="mx-auto mt-6 max-w-[85rem] px-4 sm:px-6 lg:px-8">
            <div className="-mx-4 flex flex-col gap-8 md:flex-row">
              <div className="px-4 md:flex-1">
                <div>
                  <div className="bg-gray-00 mb-4 h-64 rounded-lg md:-mx-2">
                    <div className="relative mb-4 flex h-72 items-center justify-center rounded-lg bg-gray-100 md:h-[22rem]">
                      <Image
                        src={menuImages[mainImage]}
                        alt={menuDetail.name}
                        sizes="500px"
                        fill
                        priority
                        className="rounded-xl"
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-4 flex py-0 md:-mx-2 md:py-16">
                    <div className="mt-10 grid w-full grid-cols-4 gap-4">
                      {menuImages.map((image, index) => (
                        <div className="" key={index}>
                          <button
                            className={`relative flex h-24 w-full items-center justify-center rounded-lg bg-gray-100 ring-2  focus:outline-none md:h-32 ${index === mainImage ? "ring-primary-500 ring-offset-4" : "ring-transparent"}`}
                          >
                            <Image
                              src={image}
                              alt={menuDetail.name}
                              sizes="500px"
                              fill
                              className="rounded-lg"
                              style={{
                                objectFit: "cover",
                              }}
                              onClick={() => setMainImage(index)}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 md:flex-1">
                <h2 className="mb-2 font-clash text-2xl font-semibold leading-tight tracking-tight text-gray-800 md:text-4xl">
                  {menuDetail.name}
                </h2>

                <div className="my-4 flex items-center space-x-4">
                  <div>
                    <div className="flex rounded-lg bg-gray-100 px-3 py-2">
                      <span className="mr-1 mt-1 font-medium text-primary-400">
                        &#xa3;
                      </span>
                      <span className="font-clash text-3xl font-semibold text-primary-600">
                        {menuDetail.price}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <h2 className="font-clash text-xl font-semibold">
                    Description
                  </h2>
                  <p className="font-geist text-gray-500">
                    Experience the authentic flavors of Italy with our delicious
                    Spaghetti Bolognese. This classic pasta dish is made with
                    love and care, using only the finest ingredients to ensure
                    that every bite is packed with flavor.
                  </p>
                </div>

                <ul className="my-4 flex items-center gap-4 font-geist text-sm">
                  <li className="flex space-x-3">
                    {menuDetail.is_vegetarian ? (
                      <span className="flex size-5 items-center justify-center rounded-full bg-green-100 text-green-500">
                        <svg
                          className="size-3.5 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    ) : (
                      <span className="flex size-5 items-center justify-center rounded-full bg-red-100 text-red-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="size-3.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </span>
                    )}
                    <span className="font-medium text-gray-600">
                      Vegeterian
                    </span>
                  </li>

                  <li className="flex space-x-3">
                    {menuDetail.is_vegan ? (
                      <span className="flex size-5 items-center justify-center rounded-full bg-green-100 text-green-500">
                        <svg
                          className="size-3.5 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    ) : (
                      <span className="flex size-5 items-center justify-center rounded-full bg-red-100 text-red-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="size-3.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </span>
                    )}
                    <span className="font-medium text-gray-600">Vegan</span>
                  </li>

                  <li className="flex space-x-3">
                    {menuDetail.is_gluten_free ? (
                      <span className="flex size-5 items-center justify-center rounded-full bg-green-100 text-green-500">
                        <svg
                          className="size-3.5 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    ) : (
                      <span className="flex size-5 items-center justify-center rounded-full bg-red-100 text-red-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="size-3.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </span>
                    )}
                    <span className="font-medium text-gray-600">
                      Gluten free
                    </span>
                  </li>
                </ul>

                <div className="flex items-center space-x-4 py-4">
                  <div className="relative">
                    <div className="absolute left-0 right-0 block pt-2 text-center text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Qty
                    </div>
                    <select className="flex h-14 cursor-pointer appearance-none items-end rounded-xl border border-gray-200 pb-1 pl-4 pr-8">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>

                    {/* <svg
                      className="absolute bottom-0 right-0 mb-2 mr-2 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg> */}
                  </div>

                  <Button
                    type="button"
                    // className="h-14 rounded-xl bg-indigo-600 px-6 py-2 font-semibold text-white hover:bg-indigo-500"
                    color="primary"
                    size="md"
                    classNames={{
                      label: "font-geist text-md",
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>

                <div className="grid gap-2 leading-loose">
                  {menuDetail.ingredients && (
                    <>
                      <h2 className="font-clash text-lg font-semibold md:text-xl">
                        Ingredients
                      </h2>
                      <p className="font-geist text-gray-500">
                        {menuDetail.ingredients}
                      </p>
                    </>
                  )}

                  {menuDetail.allergens && (
                    <>
                      <h2 className="font-clash text-lg font-semibold md:text-xl">
                        Allergens
                      </h2>
                      <p className="font-geist text-gray-500">
                        {menuDetail.allergens}
                      </p>
                    </>
                  )}

                  <ul className="my-5 flex flex-col space-y-2">
                    <li className="inline-flex items-center space-x-2 font-geist text-gray-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                      <span className="text-sm font-semibold md:text-base">
                        Cook time:
                      </span>
                      <span className="text-sm font-normal md:text-base">
                        {menuDetail.cook_time}mins
                      </span>
                    </li>

                    <li className="inline-flex items-center space-x-2 font-geist text-gray-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                      <span className="text-sm font-semibold md:text-base">
                        Calories:
                      </span>
                      <span className="text-sm font-normal md:text-base">
                        {menuDetail.calories}kcal
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen flex-col items-center justify-center gap-y-12">
          <Loader type="bars" color="primary" />
        </div>
      )}
    </div>
  );
}
