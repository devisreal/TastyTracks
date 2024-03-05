"use client";
import { Tabs, Paper, Button } from "@mantine/core";
import Link from "next/link";
import classes from "./HomeTabs.module.css";
import { useMediaQuery } from "@mantine/hooks";

const tabs = [
  {
    value: "sushi",
    title: "Sushi",
    subtitle: "Enjoy a variety of sushi dishes",
    images: [
      "https://res.cloudinary.com/ds4h5p2np/image/upload/v1709065612/tasty_tracks/home_tabs/sushi-1_k8jwfr.webp",
      "https://res.cloudinary.com/ds4h5p2np/image/upload/v1709065649/tasty_tracks/home_tabs/sushi-2_fdpart.webp",
    ],
  },
  {
    value: "burger",
    title: "Burger",
    subtitle: "Experience our delicious burgers",
    images: [
      "https://res.cloudinary.com/ds4h5p2np/image/upload/v1709065630/tasty_tracks/home_tabs/burger-1_apzfpv.webp",
      "https://res.cloudinary.com/ds4h5p2np/image/upload/v1709065629/tasty_tracks/home_tabs/burger-2_foyqbt.webp",
    ],
  },
  {
    value: "ramen",
    title: "Ramen",
    subtitle: "Experience the flavours of Japan",
    images: [
      "https://res.cloudinary.com/ds4h5p2np/image/upload/v1709065643/tasty_tracks/home_tabs/ramen-1_ouh94y.webp",
      "https://res.cloudinary.com/ds4h5p2np/image/upload/v1709065661/tasty_tracks/home_tabs/ramen-2_ya2sdk.webp",
    ],
  },
  {
    value: "sandwich",
    title: "Sandwich",
    subtitle: "Try our fresh sandwiches",
    images: [
      "https://res.cloudinary.com/ds4h5p2np/image/upload/v1709065665/tasty_tracks/home_tabs/sandwich-1_gteecm.webp",
      "https://res.cloudinary.com/ds4h5p2np/image/upload/v1709065651/tasty_tracks/home_tabs/sandwich-2_bgaf6f.webp",
    ],
  },
  {
    value: "salads",
    title: "Salads",
    subtitle: "Indulge in our fresh salads",
    images: [
      "https://res.cloudinary.com/ds4h5p2np/image/upload/v1709065585/tasty_tracks/home_tabs/salad-1_lmsx3j.jpg",
      "https://res.cloudinary.com/ds4h5p2np/image/upload/v1709065603/tasty_tracks/home_tabs/salad-2_vusbra.jpg",
    ],
  },
];

export default function HomeTabs() {
  const matches = useMediaQuery("(max-width: 768px)");
  const matchesTabList = useMediaQuery("(min-width: 768px)");

  return (
    <Tabs
      defaultValue="sushi"
      variant="pills"
      orientation={matches ? "horizontal" : "vertical"}
      className="mx-auto my-20 flex max-w-screen-xl gap-4 p-4 lg:p-0 lg:px-6 xl:max-w-screen-lg xl:gap-6"
      classNames={classes}
    >
      <Tabs.List
        grow={matchesTabList ? false : true}
        justify={matchesTabList ? "start" : "space-between"}
        className="mb-10 sm:mb-0"
      >
        {tabs.map((tab, index) => (
          <Tabs.Tab value={tab.value} key={index}>
            <div className="flex flex-col gap-3 p-2 text-center md:text-left">
              <h5 className="font-inter text-xl font-semibold text-gray-900">
                {tab.title}
              </h5>
              <p className="font-geist text-base text-gray-500">
                {tab.subtitle}
              </p>
            </div>
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {tabs.map((tab, index) => (
        <Tabs.Panel
          key={index}
          value={tab.value}
          className="flex flex-col gap-6 sm:p-4 sm:flex-row md:flex-col xl:flex-row"
        >
          {tab.images.map((image, index) => (
            <Paper
              key={index}
              shadow="md"
              p="xl"
              radius="md"
              className={`${classes.card} mx-auto w-80 sm:w-96`}
              style={{
                backgroundImage: `url(${image})`,
              }}
            >
              <Button
                variant="white"
                color="dark"
                className="mt-auto"
                component={Link}
                href="/about"
              >
                Buy Now
              </Button>
            </Paper>
          ))}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
