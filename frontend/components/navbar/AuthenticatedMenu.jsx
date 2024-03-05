import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, rem, Avatar } from "@mantine/core";
import {
  IconUserCircle,
  IconShoppingBag,
  IconHeart,
  IconCreditCard,
  IconLocationPin,
  IconLogout,
  IconLayoutGrid,
  IconBasket,
  IconToolsKitchen2,
  IconBadgeAd,
  IconStarHalfFilled,
  IconSettings,
} from "@tabler/icons-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthenticatedMenu() {
  const pathname = usePathname();
  const { logout, isAuthenticated, user } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout Error:", error);
      // Handle logout error (e.g., display error message)
    }
  };

  if (user === null) return null
  return (
    <>
      {isAuthenticated && (
        <Menu
          shadow="md"
          width={220}
          transitionProps={{ transition: "pop", duration: 150 }}
          arrowPosition="side"
          position="bottom-end"
        >
          <Menu.Target>
            <Avatar
              radius="xl"
              className="cursor-pointer"
              size={45}
              variant="white"
              color={"primary"}
              src={null}
              alt="Avatar"
            />
          </Menu.Target>

          {user.user_type === "customer" && (
            <Menu.Dropdown className="font-geist">
              <Menu.Item
                classNames={{
                  itemLabel: "text-md font-medium",
                }}
                component={Link}
                href="/user/profile"
                color={`${pathname === "/user/profile" ? "primary" : ""}`}
                leftSection={
                  <IconUserCircle
                    style={{ width: rem(24), height: rem(24) }}
                    stroke={1.6}
                  />
                }
              >
                Profile
              </Menu.Item>
              <Menu.Item
                classNames={{
                  itemLabel: "text-md font-medium",
                }}
                component={Link}
                href="/user/orders"
                color={`${pathname === "/user/orders" ? "primary" : ""}`}
                leftSection={
                  <IconShoppingBag
                    style={{ width: rem(24), height: rem(24) }}
                    stroke={1.6}
                  />
                }
              >
                Orders
              </Menu.Item>
              <Menu.Item
                classNames={{
                  itemLabel: "text-md font-medium",
                }}
                component={Link}
                href="/user/favourites"
                color={`${pathname === "/user/favourites" ? "primary" : ""}`}
                leftSection={
                  <IconHeart
                    style={{ width: rem(24), height: rem(24) }}
                    stroke={1.6}
                  />
                }
              >
                Favourites
              </Menu.Item>
              <Menu.Item
                classNames={{
                  itemLabel: "text-md font-medium",
                }}
                component={Link}
                href="/user/payment-methods"
                color={`${pathname === "/user/payment-methods" ? "primary" : ""}`}
                leftSection={
                  <IconCreditCard
                    style={{ width: rem(24), height: rem(24) }}
                    stroke={1.6}
                  />
                }
              >
                Payment Methods
              </Menu.Item>
              <Menu.Item
                classNames={{
                  itemLabel: "text-md font-medium",
                }}
                component={Link}
                href="/user/address"
                color={`${pathname === "/user/address" ? "primary" : ""}`}
                leftSection={
                  <IconLocationPin
                    style={{ width: rem(24), height: rem(24) }}
                    stroke={1.6}
                  />
                }
              >
                Addresses
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item
                color="red"
                classNames={{
                  itemLabel: "text-md font-medium",
                }}
                leftSection={
                  <IconLogout
                    style={{ width: rem(24), height: rem(24) }}
                    stroke={1.6}
                  />
                }
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          )}

          {user.user_type === "restaurant" && (
            <Menu.Dropdown className="font-geist">
              <Menu.Item
                classNames={{
                  itemLabel: "text-md font-medium",
                  item: "bg-red-500",
                }}
                component={Link}
                href="/restaurant/dashboard"
                color={`${pathname === "/restaurant/dashboard" ? "primary" : ""}`}
                leftSection={
                  <IconLayoutGrid
                    style={{ width: rem(24), height: rem(24) }}
                    stroke={1.6}
                  />
                }
              >
                Dashboard
              </Menu.Item>
              <Menu.Item
                classNames={{
                  itemLabel: "text-md font-medium",
                }}
                component={Link}
                href="/restaurant/orders"
                color={`${pathname === "/restaurant/orders" ? "primary" : ""}`}
                leftSection={
                  <IconBasket
                    style={{ width: rem(24), height: rem(24) }}
                    stroke={1.6}
                  />
                }
              >
                Orders
              </Menu.Item>
              <Menu.Item
                classNames={{
                  itemLabel: "text-md font-medium",
                }}
                component={Link}
                href="/restaurant/menu"
                color={`${pathname === "/restaurant/menu" ? "primary" : ""}`}
                leftSection={
                  <IconToolsKitchen2
                    style={{ width: rem(24), height: rem(24) }}
                    stroke={1.6}
                  />
                }
              >
                Menu
              </Menu.Item>
              <Menu.Item
                classNames={{
                  itemLabel: "text-md font-medium",
                }}
                component={Link}
                href="/restaurant/promotions"
                color={`${pathname === "/restaurant/promotions" ? "primary" : ""}`}
                leftSection={
                  <IconBadgeAd
                    style={{ width: rem(24), height: rem(24) }}
                    stroke={1.6}
                  />
                }
              >
                Promotions
              </Menu.Item>
              <Menu.Item
                classNames={{
                  itemLabel: "text-md font-medium",
                }}
                component={Link}
                href="/restaurant/reviews"
                color={`${pathname === "/restaurant/reviews" ? "primary" : ""}`}
                leftSection={
                  <IconStarHalfFilled
                    style={{ width: rem(24), height: rem(24) }}
                    stroke={1.6}
                  />
                }
              >
                Reviews
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item
                classNames={{
                  itemLabel: "text-md font-medium",
                }}
                component={Link}
                href="/restaurant/settings"
                color={`${pathname === "/restaurant/settings" ? "primary" : ""}`}
                leftSection={
                  <IconSettings
                    style={{ width: rem(24), height: rem(24) }}
                    stroke={1.6}
                  />
                }
              >
                Settings
              </Menu.Item>
              <Menu.Item
                color="red"
                classNames={{
                  itemLabel: "text-md font-medium",
                }}
                leftSection={
                  <IconLogout
                    style={{ width: rem(24), height: rem(24) }}
                    stroke={1.6}
                  />
                }
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          )}
        </Menu>
      )}
    </>
  );
}
