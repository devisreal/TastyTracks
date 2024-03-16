"use client";
import { useLayoutEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@mantine/core";
import Link from "next/link";
import { IconEdit } from "@tabler/icons-react";
import Image from "next/image";

const ProfilePage = () => {
  const { customerDetail, fetchCustomerDetail } = useAuth();

  useLayoutEffect(() => {
    fetchCustomerDetail();
  }, []);

  return (
    <>
      <div className="border-b lg:py-2" suppressHydrationWarning>
        <header>
          <div className="mx-auto max-w-screen-xl px-2 py-4 sm:px-4 sm:py-3 lg:px-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <h1 className="font-clash text-2xl font-semibold text-gray-900 sm:text-3xl">
                  Welcome Back, {customerDetail?.user?.first_name}{" "}
                  {customerDetail?.user?.last_name}
                </h1>

                <p className="mt-1.5 font-geist text-sm text-gray-500">
                  Hello!, Let&apos;s get you started 🎉
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-4 font-geist sm:mt-0 sm:flex-row sm:items-center">
                <Button
                  type="button"
                  color="dark"
                  variant="light"
                  rightSection={<IconEdit size={18} />}
                  component={Link}
                  href="/user/edit-profile/"
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </header>
      </div>

      <div className=" md:px-6">
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Avatar
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <Image
                  src={
                    customerDetail?.avatar
                      ? customerDetail?.avatar
                      : "/images/male.jpg"
                  }
                  alt="upload image"
                  width={112}
                  height={112}
                  priority
                  className="img-display-before h-28 w-28 rounded-full object-cover"
                />
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {customerDetail?.user?.first_name}{" "}
                {customerDetail?.user?.last_name}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email Address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {customerDetail?.user?.email}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {customerDetail?.phone_number ? customerDetail?.phone_number : (
                  <span className=" text-red-500">No phone number added</span>
                )}
              </dd>
            </div>
            
          </dl>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
