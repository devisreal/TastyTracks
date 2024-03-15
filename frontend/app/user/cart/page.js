"use client";
import React, { useState, useLayoutEffect } from "react";
import { Button } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { ActionIcon, Loader } from "@mantine/core";
import { IconTrash, IconPlus, IconMinus } from "@tabler/icons-react";
import api from "@/utils/api";
import { toast } from "sonner";
import { currencyFormat } from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";

export default function CartPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState({});
  const isEmptyCart = Object.keys(cart).length === 0 ? true : false;
  const {
    isDeleting,
    deleteCartItem,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useAuth();
  const getCustomerCart = async () => {
    try {
      const res = await api.get("/orders/cart/me/");
      if (res.status === 200) {
        setCart(res.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Fetch Menu Item error", error);
      toast.error("Error fetching menus");
    }
  };
  useLayoutEffect(() => {
    getCustomerCart();
  }, []);

  return (
    <>
      <>
        <div className="h-fit border-b lg:py-2.5">
          <div className="flex items-center justify-between space-x-4 px-6 2xl:container">
            <h5
              hidden
              className="block font-clash text-2xl font-medium text-gray-800"
            >
              Cart
            </h5>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-gray-300 lg:mt-2">
          <>
            {!isLoading ? (
              <>
                {!isEmptyCart ? (
                  <>
                    <div className="p-0">
                      <div className="grid gap-4">
                        {cart.cart_items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 border-b p-4 last:border-b-0"
                          >
                            <div className="flex items-center gap-4">
                              <Image
                                src={item.menu_item.image_1}
                                width={100}
                                height={100}
                                className="rounded-lg object-cover"
                                alt="Thumbnail"
                                priority
                                style={{
                                  aspectRatio: "80 / 80",
                                  objectFit: "cover",
                                }}
                              />
                              <div className="grid gap-1.5">
                                <h1 className="font-clash text-sm font-medium md:text-lg">
                                  {item.menu_item.name}
                                </h1>
                                <div className="font-geist text-sm text-gray-600 ">
                                  {currencyFormat.format(item.menu_item.price)}
                                </div>
                              </div>
                            </div>
                            <div className="ml-auto flex items-center gap-4">
                              <div className="flex items-center gap-2 text-md">
                                <ActionIcon
                                  size={24}
                                  variant="default"
                                  aria-label="Delete"
                                  radius="md"
                                  onClick={() => decreaseCartQuantity(item.id)}
                                >
                                  <IconMinus
                                    style={{ width: "70%", height: "70%" }}
                                    stroke={1.5}
                                  />
                                </ActionIcon>
                                <span className="font-semibold">
                                  {item.quantity}
                                </span>
                                <ActionIcon
                                  size={24}
                                  variant="default"
                                  aria-label="Delete"
                                  radius="md"
                                  onClick={() => increaseCartQuantity(item.id)}
                                >
                                  <IconPlus
                                    style={{ width: "70%", height: "70%" }}
                                    stroke={1.5}
                                  />
                                </ActionIcon>
                              </div>

                              <ActionIcon
                                size={32}
                                variant="default"
                                aria-label="Delete"
                                radius="md"
                                onClick={() => deleteCartItem(item.id)}
                                loading={isDeleting}
                              >
                                <IconTrash
                                  style={{ width: "70%", height: "70%" }}
                                  stroke={1.5}
                                />
                              </ActionIcon>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{currencyFormat.format(cart.total_price)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                    </div>
                    <div className="flex items-center justify-end p-6">
                      <div className="flex items-center  gap-4 ">
                        <Button
                          color="primary"
                          classNames={{
                            label: "font-geist",
                          }}
                          variant="light"
                          component={Link}
                          href="/menu"
                        >
                          Continue shopping
                        </Button>
                        <Button
                          color="green.9"
                          classNames={{
                            label: "font-geist",
                          }}
                        >
                          Checkout
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="py-6 text-center font-geist">
                    <Image
                      alt="Easy Order Image"
                      src="/images/gifs/empty-cart.gif"
                      className="mx-auto"
                      width={150}
                      height={150}
                    />
                    <h4 className="mt-2">
                      Your cart is empty. <br />{" "}
                      <Link
                        href="/menu"
                        className="underline transition hover:text-primary-600"
                      >
                        Add some items to it
                      </Link>
                    </h4>
                  </div>
                )}
              </>
            ) : (
              <div className="flex h-40 flex-col items-center justify-center gap-y-12">
                <Loader type="bars" color="primary" />
              </div>
            )}
          </>
        </div>
      </>
    </>
  );
}
