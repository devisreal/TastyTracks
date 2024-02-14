"use client";
import React, { useState } from "react";
import {
  IconEye,
  IconEyeOff,
  IconArrowRight,
  IconArrowUpRight,
} from "@tabler/icons-react";
import { Button } from "@mantine/core";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";

function TermsOfUseModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        title="Terms of Use"
        centered
        overlayProps={{
          backgroundOpacity: 0.65,
          blur: 3,
        }}
      >
        <div className="mx-auto px-4 py-2">
          <h1 className="mb-3 font-clash text-3xl font-semibold sm:text-4xl">
            Terms of Use
          </h1>
          <p className="mb-4 font-geist">
            Welcome to Tasty Tracks, an online food ordering system. By
            accessing or using our website, you agree to comply with and be
            bound by the following terms and conditions:
          </p>

          <h2 className="mb-2 mt-3 text-xl font-bold sm:text-2xl">
            1. Use of Website
          </h2>
          <p className="mb-3 font-geist">
            You agree to use our website for lawful purposes and in a way that
            does not infringe the rights of others.
          </p>

          <h2 className="mb-2 mt-3 text-xl font-bold sm:text-2xl">
            2. Account Registration
          </h2>
          <p className="mb-3 font-geist">
            In order to access certain features of our website, you may be
            required to register for an account. You are responsible for
            maintaining the confidentiality of your account credentials.
          </p>

          <h2 className="mb-2 mt-3 text-xl font-bold sm:text-2xl">
            3. Ordering and Payment
          </h2>
          <p className="mb-3 font-geist">
            By placing an order through our website, you agree to pay all
            charges incurred. Payments are processed securely, and we do not
            store your payment information.
          </p>

          <h2 className="mb-2 mt-3 text-xl font-bold sm:text-2xl">
            4. Intellectual Property
          </h2>
          <p className="mb-3 font-geist">
            All content and materials available on our website are protected by
            intellectual property rights. You may not use, modify, reproduce, or
            distribute any content without our prior written consent.
          </p>

          <h2 className="mb-2 mt-3 text-xl font-bold sm:text-2xl">
            5. Disclaimer
          </h2>
          <p className="mb-3 font-geist">
            Our website is provided on an "as is" and "as available" basis. We
            make no warranties or representations of any kind, express or
            implied, regarding the accuracy, reliability, or availability of our
            website.
          </p>

          <h2 className="mb-2 mt-3 text-xl font-bold sm:text-2xl">
            6. Limitation of Liability
          </h2>
          <p className="mb-3 font-geist">
            We shall not be liable for any direct, indirect, incidental,
            special, or consequential damages arising out of or in any way
            connected with your use of our website.
          </p>

          <h2 className="mb-2 mt-3 text-xl font-bold sm:text-2xl">
            7. Changes to Terms
          </h2>
          <p className="mb-3 font-geist">
            We reserve the right to modify or update these terms of use at any
            time. It is your responsibility to review these terms periodically
            for changes.
          </p>

          <p className="mt-8">
            If you have any questions or concerns about these terms of use,
            please contact us.
          </p>
        </div>
      </Modal>
      <button
        type="button"
        onClick={open}
        className="cursor-pointer font-medium text-orange-600 decoration-2 hover:underline"
      >
        Terms of use
      </button>{" "}
    </>
  );
}

function PrivacyPolicyModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        title="Privacy Policy"
        centered
        overlayProps={{
          backgroundOpacity: 0.65,
          blur: 3,
        }}
      >
        <div className="mx-auto px-4 py-2">
          <h1 className="mb-4 font-clash text-3xl font-semibold sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mb-4">
            Welcome to Tasty Tracks, an online food ordering system. This
            Privacy Policy explains how we collect, use, and disclose
            information about you when you use our website. By accessing or
            using our website, you agree to this Privacy Policy.
          </p>

          <h2 className="mb-2 mt-6 text-xl font-bold sm:text-2xl">
            1. Information We Collect
          </h2>
          <p className="mb-4 font-geist">
            We collect information you provide directly to us, such as your
            name, email address, and phone number when you register for an
            account or place an order. We also collect information automatically
            when you use our website, such as your IP address, browser type, and
            device information.
          </p>

          <h2 className="mb-2 mt-6 text-xl font-bold sm:text-2xl">
            2. How We Use Your Information
          </h2>
          <p className="mb-4 font-geist">
            We use the information we collect to provide, maintain, and improve
            our services, communicate with you, and personalize your experience.
            We may also use your information to comply with legal obligations or
            protect our rights.
          </p>

          <h2 className="mb-2 mt-6 text-xl font-bold sm:text-2xl">
            3. Information Sharing
          </h2>
          <p className="mb-4 font-geist">
            We may share your information with third-party service providers or
            business partners who assist us in providing our services. We may
            also share your information in response to legal requests or to
            protect our rights.
          </p>

          <h2 className="mb-2 mt-6 text-xl font-bold sm:text-2xl">
            4. Security
          </h2>
          <p className="mb-4 font-geist">
            We take reasonable measures to protect your information from
            unauthorized access, disclosure, or alteration. However, no method
            of transmission over the Internet or electronic storage is 100%
            secure, so we cannot guarantee absolute security.
          </p>

          <h2 className="mb-2 mt-6 text-xl font-bold sm:text-2xl">
            5. Changes to This Policy
          </h2>
          <p className="mb-4 font-geist">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            You are advised to review this Privacy Policy periodically for any
            changes.
          </p>

          <p className="mt-8">
            If you have any questions or concerns about this Privacy Policy,
            please contact us.
          </p>
        </div>
      </Modal>
      <button
        type="button"
        onClick={open}
        className="cursor-pointer font-medium text-orange-600 decoration-2 hover:underline"
      >
        Privacy Policy
      </button>{" "}
    </>
  );
}

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form className="w-full space-y-5 font-geist sm:w-[38rem]">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Firstname */}
        <fieldset className="">
          <label
            htmlFor="first_name"
            className="sr-only mb-2 block text-sm font-medium"
          >
            First name
          </label>
          <div className="relative">
            <input
              type="text"
              id="first_name"
              name="first_name"
              className="block w-full rounded-lg border-gray-200 px-4 py-4 ps-14 text-gray-800 shadow-sm focus:z-10 focus:border-primary-400 focus:ring-primary-400 "
              placeholder="Enter your First name"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center gap-3 ps-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.6}
                stroke="currentColor"
                className="h-5 w-5 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>

              <div className="h-6 w-px bg-gray-300 focus:bg-primary-500" />
            </div>
          </div>
        </fieldset>

        {/* Lastname */}
        <fieldset className="">
          <label
            htmlFor="last_name"
            className="sr-only mb-2 block text-sm font-medium"
          >
            Last name
          </label>
          <div className="relative">
            <input
              type="text"
              id="last_name"
              name="last_name"
              className="block w-full rounded-lg border-gray-200 px-4 py-4 ps-14 text-gray-800 shadow-sm focus:z-10 focus:border-primary-400 focus:ring-primary-400 "
              placeholder="Enter your Last name"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center gap-3 ps-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.6}
                stroke="currentColor"
                className="h-5 w-5 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <div className="h-6 w-px bg-gray-300 focus:bg-primary-500" />
            </div>
          </div>
        </fieldset>
      </div>

      {/* Email */}
      <fieldset className="">
        <label
          htmlFor="email"
          className="sr-only mb-2 block text-sm font-medium"
        >
          Email address
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            className="block w-full rounded-lg border-gray-200 px-4 py-4 ps-14 text-gray-800 shadow-sm focus:z-10 focus:border-primary-400 focus:ring-primary-400 "
            placeholder="Enter your Email"
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center gap-3 ps-4">
            <svg
              className="size-5 flex-shrink-0 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <div className="h-6 w-px bg-gray-300 focus:bg-primary-500" />
          </div>
        </div>
      </fieldset>

      {/* Password */}
      <fieldset className="">
        <label
          htmlFor="password"
          className="sr-only mb-2 block text-sm font-medium"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="block w-full rounded-lg border-gray-200 px-4 py-4 ps-14 text-gray-800 shadow-sm focus:z-10 focus:border-primary-400 focus:ring-primary-400 "
            placeholder="Enter your Password"
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center gap-3 ps-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.6}
              stroke="currentColor"
              className="size-5 flex-shrink-0 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>

            <div className="h-6 w-px bg-gray-300 focus:bg-primary-500" />
          </div>

          <div className="absolute inset-y-0 end-0 z-20 flex items-center pe-4">
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="cursor-pointer text-gray-500"
            >
              {showPassword ? <IconEyeOff /> : <IconEye />}
            </button>
          </div>
        </div>
      </fieldset>

      {/* Confirm Password */}
      <fieldset className="">
        <label
          htmlFor="confirm_password"
          className="sr-only mb-2 block text-sm font-medium"
        >
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirm_password"
            name="confirm_password"
            className="block w-full rounded-lg border-gray-200 px-4 py-4 ps-14 text-gray-800 shadow-sm focus:z-10 focus:border-primary-400 focus:ring-primary-400 "
            placeholder="Confirm Password"
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center gap-3 ps-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.6}
              stroke="currentColor"
              className="size-5 flex-shrink-0 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>

            <div className="h-6 w-px bg-gray-300 focus:bg-primary-500" />
          </div>

          <div className="absolute inset-y-0 end-0 z-20 flex items-center pe-4">
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="cursor-pointer text-gray-500"
            >
              {showConfirmPassword ? <IconEyeOff /> : <IconEye />}
            </button>
          </div>
        </div>
      </fieldset>

      <div className="flex items-center">
        <div className="flex">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="pointer-events-none mt-0.5 shrink-0 rounded-sm border-gray-200 text-orange-600 focus:ring-orange-500"
          />
        </div>
        <div className="ms-3">
          <label htmlFor="remember-me" className="text-sm">
            I accept the <TermsOfUseModal />
            and <PrivacyPolicyModal />
          </label>
        </div>
      </div>

      <Button
        type="submit"
        fullWidth
        size="lg"
        variant="gradient"
        gradient={{ from: "primary.6", to: "primary.5" }}
        justify="space-between"
        rightSection={<IconArrowRight />}
        leftSection={<span />}
        classNames={{
          label: "text-base font-medium",
        }}
      >
        Sign Up
      </Button>

      <p className="mt-4 flex justify-center gap-2 text-center text-gray-800 sm:mt-0">
        Already have an account?{" "}
        <Link
          href="/auth/login/"
          className="group inline-flex items-center gap-2 font-medium text-gray-800 underline"
        >
          Login{" "}
          <IconArrowUpRight
            size={24}
            className="transition duration-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </p>
    </form>
  );
}
