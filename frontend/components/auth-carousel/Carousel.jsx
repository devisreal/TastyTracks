"use client";
import React from "react";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import classes from "./Carousel.module.css";
import Image from "next/image";

export default function AuthCarousel() {
  const autoplay = useRef(Autoplay({ delay: 7000 }));
  return (
    <div
      className="hidden lg:flex"
      style={{
        height: "100%",
        weight: "100%",
      }}
    >
      <Carousel
        withIndicators
        withControls={false}
        slideGap="sm"
        height="100%"
        style={{ flex: 1, width: "100%", borderRadius: "0" }}
        loop
        classNames={{
          indicator: classes.carouselIndicator,
        }}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        <Carousel.Slide>
          <div className="w-full">
            <Image
              alt="Auth Carousel"
              src="/images/auth/image.png"
              className="absolute inset-0 h-full w-full pr-1"
              sizes="auto"
              fill={true}
              quality={100}
            />
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="w-full">
            <Image
              alt="Auth Carousel"
              src="/images/auth/image2.png"
              className="absolute inset-0 h-full w-full pr-1"
              sizes="auto"
              fill={true}
              quality={100}
            />
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <div className="w-full">
            <Image
              alt="Auth Carousel"
              src="/images/auth/image3.png"
              className="absolute inset-0 h-full w-full pr-1"
              sizes="auto"
              fill={true}
              quality={100}
            />
          </div>
        </Carousel.Slide>
      </Carousel>
    </div>
  );
}
