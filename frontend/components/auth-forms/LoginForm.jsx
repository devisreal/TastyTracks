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
import * as Yup from "yup";
import { Formik } from "formik";
import YupPassword from "yup-password";
YupPassword(Yup);
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .min(8, "Password must be 6 characters or more")
          .minUppercase(1, "Password requires at least 1 uppercase character")
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(async () => {
          const { email, password } = values;
          const res = await axios.post(
            "https://tasty-tracks.onrender.com/api/login/",
            values,
          );
          const response = res.data;          
          const user = {
            email: response.email,
            username: response.username,
            full_name: response.full_name,
          };
          if (res.status === 200) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("access", response.tokens.access);
            localStorage.setItem("refresh", response.tokens.refresh);
            router.push("/users/profile");
            toast.success("Login Successful");
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
          className="w-full space-y-4 font-geist sm:w-[36rem]"
          onSubmit={formik.handleSubmit}
        >
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

          <div className="flex justify-end">
            <Link
              href="/auth/forgot-password/"
              className="font-geist text-md underline"
            >
              Forgot Password?
            </Link>
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
            loading={formik.isSubmitting}
            loaderProps={{ type: "dots" }}
          >
            Login
          </Button>

          <p className="mt-4 flex justify-center gap-2 text-center text-gray-800 sm:mt-0">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup/"
              className="group inline-flex items-center gap-2 font-medium text-gray-800 underline"
            >
              Sign up{" "}
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
