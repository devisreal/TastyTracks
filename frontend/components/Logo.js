import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/images/logo/coloured.webp"
        alt="Logo"
        width={80}
        height={80}
        priority
      />
    </Link>
  );
}
