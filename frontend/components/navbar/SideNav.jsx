"use client";

import { useDisclosure } from "@mantine/hooks";
import { Drawer, ActionIcon, Button } from "@mantine/core";
import { IconMenu, IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export function SideNav({ instantFixed, colorChange }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { isAuthenticated } = useAuth();

  return (
    <div className="md:hidden">
      <Drawer
        offset={8}
        radius="md"
        opened={opened}
        onClose={close}
        size="sm"
        position="right"
        overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
        // withCloseButton={false}
        title=""
        className="font-darker_grotesque"
      >
        <div className="space-y-6">
          {/* <div className="flex w-fit">
            <Drawer.CloseButton size={"lg"} className="hover:bg-gray-200" />
          </div> */}

          <ul className="flex flex-col gap-2 font-geist text-lg font-medium">
            <li>
              <Link
                href="/"
                className="block rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/menu"
                className="block rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Find Restaurants
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Special Offers
              </Link>
            </li>
          </ul>

          {!isAuthenticated && (
            <div className="flex flex-col gap-y-3">
              <Button
                variant="filled"
                color="primary"
                component={Link}
                href="/auth/login"
                size="lg"
                classNames={{
                  label: "font-medium font-geist text-lg px-2 py-2 rounded-md",
                }}
              >
                Login
              </Button>

              <Button
                variant="outline"
                color="primary"
                component={Link}
                href="/auth/customer/signup"
                size="lg"
                classNames={{
                  label: "font-medium font-geist text-lg px-2 py-2 rounded-md",
                }}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </Drawer>

      <ActionIcon
        onClick={open}
        color={`${instantFixed ? `${colorChange ? "#000" : "#fff"}` : "#121212"}`}
        variant="light"
        size="xl"
        radius="md"
        aria-label="Settings"
      >
        <IconMenu2 width={24} height={24} stroke={1.7} />
      </ActionIcon>
    </div>
  );
}
