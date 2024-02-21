"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { IconEye, IconEyeOff, IconArrowRight } from "@tabler/icons-react";
import { Button } from "@mantine/core";

import * as Yup from "yup";
import { Formik } from "formik";
import YupPassword from "yup-password";
YupPassword(Yup);
import api from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";

export default function ResetPasswordForm({ params }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { resetPassword } = useAuth();

  const {
    slug: [uuid, token],
  } = params;

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const data = {
      password: values.password,
      confirm_password: values.password2,
      uidb64: uuid,
      token: token,
    };
    try {
      await resetPassword(data, setSubmitting, resetForm);
    } catch (error) {
      console.error("Reset Password Error:", error);
      // Handle reset password error (e.g., display error message)
    }
  };

  return (
    <Formik
      initialValues={{
        password: "",
        password2: "",
      }}
      validationSchema={Yup.object({
        password: Yup.string()
          .min(8, "Password must be 6 characters or more")
          .minUppercase(1, "Password requires at least 1 uppercase character")
          .required("Required"),
        password2: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Required"),
      })}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <form
          className="w-full space-y-4 font-geist sm:w-[38rem]"
          onSubmit={formik.handleSubmit}
        >
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
                className={`auth-input ${formik.touched.password && formik.errors.password ? "border-red-500 ring-1 ring-red-500" : ""}`}
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

                <div className="h-6 w-px bg-gray-300" />
              </div>

              <div className="absolute inset-y-0 end-0 z-20 flex items-center pe-4">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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
                className={`auth-input ${formik.touched.password2 && formik.errors.password2 ? "border-red-500 ring-1 ring-red-500" : ""}`}
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

                <div className="h-6 w-px bg-gray-300" />
              </div>

              <div className="absolute inset-y-0 end-0 z-20 flex items-center pe-4">
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
              label: "text-sm sm:text-base font-medium",
            }}
            loading={formik.isSubmitting}
            loaderProps={{ type: "dots" }}
          >
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
}
