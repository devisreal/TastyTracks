import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";

const previewMeals = [
  {
    name: "Sushi",
    image:
      "https://res.cloudinary.com/ds4h5p2np/image/upload/v1709065649/tasty_tracks/home_tabs/sushi-2_fdpart.webp",
  },
  {
    name: "Burgers",
    image:
      "https://res.cloudinary.com/ds4h5p2np/image/upload/v1709065630/tasty_tracks/home_tabs/burger-1_apzfpv.webp",
  },
  {
    name: "Ramen",
    image:
      "https://res.cloudinary.com/ds4h5p2np/image/upload/v1709065661/tasty_tracks/home_tabs/ramen-2_ya2sdk.webp",
  },
  {
    name: "Sandwiches",
    image:
      "https://res.cloudinary.com/ds4h5p2np/image/upload/v1709065665/tasty_tracks/home_tabs/sandwich-1_gteecm.webp",
  },
  {
    name: "Salads",
    image:
      "https://res.cloudinary.com/ds4h5p2np/image/upload/v1709065585/tasty_tracks/home_tabs/salad-1_lmsx3j.jpg",
  },
];

const callouts = [
  {
    name: "Desk and Office",
    description: "Work from home accessories",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    imageAlt:
      "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    href: "#",
  },
  {
    name: "Self-Improvement",
    description: "Journals and note-taking",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    href: "#",
  },
  {
    name: "Travel",
    description: "Daily commute essentials",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "#",
  },
  {
    name: "Travels",
    description: "Daily commute essentials",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "#",
  },
];

function Example() {
  return (
    <div className="">
      <div className="mx-auto max-w-[85rem] px-4 sm:px-4 lg:px-0">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-4 lg:space-y-0">
            {callouts.map((callout) => (
              <div
                key={callout.name}
                className="group relative rounded-2xl bg-gray-200 p-3 py-6"
              >
                <div className="sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:h-52">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {callout.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default function MenuPage() {
  return (
    <div>
      <Navbar />
      <div className="px-2 sm:px-0">
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5">
          {previewMeals.map((meal, index) => (
            <div className="group mx-auto w-fit" key={index}>
              <div
                style={{
                  position: "relative",
                  width: "260px",
                  height: "150px",
                }}
              >
                <Image
                  src={meal.image}
                  alt={meal.image}
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
                {meal.name}
              </h5>
            </div>
          ))}
        </div>
      </section>
      <br />
      <br />
      <br />
      <br />
      <br />
      <section className="mx-auto max-w-[85rem]">
        <div className="flex items-center gap-3 font-geist">
          <span className="inline-flex items-center gap-x-1.5 rounded-full border border-gray-200 px-4 py-1.5 text-md font-medium text-gray-800">
            All
          </span>

          <div className="inline-flex flex-nowrap items-center rounded-full border border-gray-200 bg-white p-1.5 px-2 pe-3 ">
            <img
              className="me-1.5 inline-block size-6 rounded-full"
              src="https://img.freepik.com/free-psd/delicious-cheese-pizza-isolated-transparent-background_84443-1224.jpg?t=st=1709233429~exp=1709237029~hmac=0c04c091352a9f00ac9a203a67fc3e3e70ffc42aedb446145f21f37994d86f81&w=826"
              alt="Image Description"
            />
            <div className="whitespace-nowrap text-md font-medium text-gray-800">
              Pizza
            </div>
          </div>

          <div className="inline-flex flex-nowrap items-center rounded-full border border-gray-200 bg-white p-1.5 px-2 pe-3 ">
            <img
              className="me-1.5 inline-block size-6 rounded-full"
              src="https://img.freepik.com/free-psd/delicious-cheese-pizza-isolated-transparent-background_84443-1224.jpg?t=st=1709233429~exp=1709237029~hmac=0c04c091352a9f00ac9a203a67fc3e3e70ffc42aedb446145f21f37994d86f81&w=826"
              alt="Image Description"
            />
            <div className="whitespace-nowrap text-md font-medium text-gray-800">
              Pizza
            </div>
          </div>

          <div className="inline-flex flex-nowrap items-center rounded-full border border-gray-200 bg-white p-1.5 px-2 pe-3 ">
            <img
              className="me-1.5 inline-block size-6 rounded-full"
              src="https://img.freepik.com/free-psd/delicious-cheese-pizza-isolated-transparent-background_84443-1224.jpg?t=st=1709233429~exp=1709237029~hmac=0c04c091352a9f00ac9a203a67fc3e3e70ffc42aedb446145f21f37994d86f81&w=826"
              alt="Image Description"
            />
            <div className="whitespace-nowrap text-md font-medium text-gray-800">
              Pizza
            </div>
          </div>

          <div className="inline-flex flex-nowrap items-center rounded-full border border-gray-200 bg-white p-1.5 px-2 pe-3 ">
            <img
              className="me-1.5 inline-block size-6 rounded-full"
              src="https://img.freepik.com/free-psd/delicious-cheese-pizza-isolated-transparent-background_84443-1224.jpg?t=st=1709233429~exp=1709237029~hmac=0c04c091352a9f00ac9a203a67fc3e3e70ffc42aedb446145f21f37994d86f81&w=826"
              alt="Image Description"
            />
            <div className="whitespace-nowrap text-md font-medium text-gray-800">
              Pizza
            </div>
          </div>

          <div className="inline-flex flex-nowrap items-center rounded-full border border-gray-200 bg-white p-1.5 px-2 pe-3 ">
            <img
              className="me-1.5 inline-block size-6 rounded-full"
              src="https://img.freepik.com/free-psd/delicious-cheese-pizza-isolated-transparent-background_84443-1224.jpg?t=st=1709233429~exp=1709237029~hmac=0c04c091352a9f00ac9a203a67fc3e3e70ffc42aedb446145f21f37994d86f81&w=826"
              alt="Image Description"
            />
            <div className="whitespace-nowrap text-md font-medium text-gray-800">
              Pizza
            </div>
          </div>
        </div>

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
          <select className="block w-fit rounded-full border-none bg-gray-100 px-6 py-2 pe-9 font-geist text-md font-medium focus:border-none focus:outline-none">
            <option defaultValue>Sort by</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <select className="block w-fit rounded-full border-none bg-gray-100 px-6 py-2 pe-9 font-geist text-md font-medium focus:border-none focus:outline-none">
            <option defaultValue>Price</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <select className="block w-fit rounded-full border-none bg-gray-100 px-6 py-2 pe-9 font-geist text-md font-medium focus:border-none focus:outline-none">
            <option defaultValue>Rating</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>

        <br />
        <br />
        <br />
        <br />

        <Example />
      </section>
      <br />
      <br />
      <br />
      MenuPage
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
