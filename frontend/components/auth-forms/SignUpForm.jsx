"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

import {
  IconEye,
  IconEyeOff,
  IconArrowRight,
  IconArrowUpRight,
  IconSquareRoundedLetterR,
} from "@tabler/icons-react";
import { Button } from "@mantine/core";
import { TermsOfUseModal, PrivacyPolicyModal } from "../AuthModals";

import * as Yup from "yup";
import { Formik } from "formik";
import YupPassword from "yup-password";
YupPassword(Yup);

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const router = useRouter();

  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password2: "",
        accepted_terms: false,
      }}
      validationSchema={Yup.object({
        first_name: Yup.string().required("Required"),
        last_name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .min(8, "Password must be 6 characters or more")
          .minUppercase(1, "Password requires at least 1 uppercase character")
          .required("Required"),
        password2: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Required"),
        accepted_terms: Yup.boolean()
          .required("Required")
          .oneOf([true], "You must accept the terms and conditions."),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(async () => {
          const { first_name, last_name, email, password, password2 } = values;
          const res = await axios.post(
            "https://tasty-tracks.onrender.com/api/create-customer/",
            {
              user: {
                first_name,
                last_name,
                email,
                password,
                password2,
              },
            },
          );
          const response = res.data;          
          if (res.status === 201) {
            router.push("/auth/verify-email/");
            toast.success(response.message, { duration: 6000 });
            setSubmitting(false);
          }

          setSubmitting(false);
          // alert(JSON.stringify(values, null, 2));
          // resetForm({
          //   values: "",
          // });
        }, 1000);
      }}
    >
      {(formik) => (
        <form
          className="w-full space-y-4 font-geist sm:w-[38rem]"
          onSubmit={formik.handleSubmit}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
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
                  {...formik.getFieldProps("first_name")}
                  className={`block w-full rounded-lg border-gray-200 px-4 py-4 ps-14 text-gray-800 shadow-sm focus:z-10 focus:border-primary-400 focus:ring-primary-400 ${formik.touched.first_name && formik.errors.first_name ? "border-red-500 ring-1 ring-red-500" : ""}`}
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
              {formik.touched.first_name && formik.errors.first_name ? (
                <small className="font-geist text-red-500">
                  {formik.errors.first_name}
                </small>
              ) : null}
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
                  {...formik.getFieldProps("last_name")}
                  className={`block w-full rounded-lg border-gray-200 px-4 py-4 ps-14 text-gray-800 shadow-sm focus:z-10 focus:border-primary-400 focus:ring-primary-400 ${formik.touched.last_name && formik.errors.last_name ? "border-red-500 ring-1 ring-red-500" : ""}`}
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
              {formik.touched.last_name && formik.errors.last_name ? (
                <small className="font-geist text-red-500">
                  {formik.errors.last_name}
                </small>
              ) : null}
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
                {...formik.getFieldProps("email")}
                className={`block w-full rounded-lg border-gray-200 px-4 py-4 ps-14 text-gray-800 shadow-sm focus:z-10 focus:border-primary-400 focus:ring-primary-400 ${formik.touched.email && formik.errors.email ? "border-red-500 ring-1 ring-red-500" : ""}`}
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
            {formik.touched.email && formik.errors.email ? (
              <small className="font-geist text-red-500">
                {formik.errors.email}
              </small>
            ) : null}
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
                {...formik.getFieldProps("password")}
                className={`block w-full rounded-lg border-gray-200 px-4 py-4 ps-14 text-gray-800 shadow-sm focus:z-10 focus:border-primary-400 focus:ring-primary-400 ${formik.touched.password && formik.errors.password ? "border-red-500 ring-1 ring-red-500" : ""}`}
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
            {formik.touched.password && formik.errors.password ? (
              <small className="text-red-500">{formik.errors.password}</small>
            ) : null}
          </fieldset>

          {/* Confirm Password */}
          <fieldset className="">
            <label
              htmlFor="password2"
              className="sr-only mb-2 block text-sm font-medium"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="password2"
                {...formik.getFieldProps("password2")}
                className={`block w-full rounded-lg border-gray-200 px-4 py-4 ps-14 text-gray-800 shadow-sm focus:z-10 focus:border-primary-400 focus:ring-primary-400 ${formik.touched.password2 && formik.errors.password2 ? "border-red-500 ring-1 ring-red-500" : ""}`}
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
            {formik.touched.password2 && formik.errors.password2 ? (
              <small className="text-red-500">{formik.errors.password2}</small>
            ) : null}
          </fieldset>

          <fieldset>
            <div className="flex items-center">
              <div className="flex">
                <input
                  type="checkbox"
                  id="accepted_terms"
                  {...formik.getFieldProps("accepted_terms")}
                  className="pointer-events-none mt-0.5 shrink-0 rounded-sm border-gray-200 text-orange-600 focus:ring-orange-500"
                />
              </div>
              <div className="ms-3">
                <label htmlFor="accepted_terms" className="text-sm">
                  I accept the <TermsOfUseModal />
                  and <PrivacyPolicyModal />
                </label>
              </div>
            </div>
            {formik.touched.accepted_terms && formik.errors.accepted_terms ? (
              <small className="text-red-500">
                {formik.errors.accepted_terms}
              </small>
            ) : null}
          </fieldset>

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
            loading={formik.isSubmitting}
            loaderProps={{ type: "dots" }}
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
      )}
    </Formik>
  );
}
