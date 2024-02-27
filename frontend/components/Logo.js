import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";

export default function Logo({
  className,
  fullWhite,
  fullColoured,
  fullBlack,
  IconWhite,
  IconColoured,
  IconBlack,
}) {
  const matches = useMediaQuery("(min-width: 576px)");
  return (
    <Link href="/" className={className}>
      {fullColoured && (
        <Image
          src={"/images/logo/full_coloured.webp"}
          alt="Logo"
          width={matches ? 220 : 200}
          height={matches ? 100 : 80}
          priority
          quality={100}
        />
      )}
      {IconColoured && (
        <Image
          src={"/images/logo/icon_coloured.webp"}
          alt="Logo"
          width={80}
          height={80}
          priority
          quality={100}
        />
      )}
      {IconWhite && (
        <Image
          src="/images/logo/icon_white.webp"
          alt="Logo"
          width={80}
          height={80}
          priority
          quality={100}
        />
      )}
      {fullWhite && (
        <Image
          src={"/images/logo/full_white.webp"}
          alt="Logo"
          width={matches ? 220 : 200}
          height={matches ? 100 : 80}
          priority
          quality={100}
        />
      )}
      <span className="sr-only">Home</span>
    </Link>
  );
}
