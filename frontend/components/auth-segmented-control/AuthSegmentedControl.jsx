"use client";
import React, { useLayoutEffect } from "react";
import { SegmentedControl } from "@mantine/core";
import classes from "./AuthSegmentedControl.module.css";
import { useRouter, usePathname } from "next/navigation";
import { useValue } from "@/contexts/ValueContext";
export default function AuthSegmentedControl() {
  const { value, setValue } = useValue();
  const router = useRouter();
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname === "/auth/login") {
      setValue("login");
    } else if (pathname === "/auth/customer/signup") {
      setValue("signup");
    }
  }, [pathname, setValue]);

  return (
    <SegmentedControl
      fullWidth
      value={value}
      onChange={setValue}
      className="font-geist"
      size="md"
      color="primary"
      data={[
        {
          value: "login",
          label: (
            <button
              className="h-full w-full"
              onClick={() => {
                router.push("/auth/login");
                setValue("login");
              }}
            >
              Login
            </button>
          ),
        },
        {
          value: "signup",
          label: (
            <button
              className="h-full w-full"
              onClick={() => {
                router.push("/auth/customer/signup");
                setValue("signup");
              }}
            >
              Sign Up
            </button>
          ),
        },
      ]}
      classNames={classes}
    />
  );
}
