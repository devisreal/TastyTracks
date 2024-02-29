"use client";
import React, { useState } from "react";

import {
  IconEye,
  IconEyeOff,
  IconArrowRight,
  IconBuildingStore,
  IconCircleCheck,
  IconLocation,
  IconUser,
} from "@tabler/icons-react";
import { Stepper, Button, Group, rem } from "@mantine/core";
import { TermsOfUseModal, PrivacyPolicyModal } from "../AuthModals";
import { useMediaQuery } from "@mantine/hooks";

import * as Yup from "yup";
import { Formik } from "formik";
import YupPassword from "yup-password";
import "yup-phone-lite";
import { useAuth } from "@/contexts/AuthContext";
YupPassword(Yup);

const postcodeRegex = /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$/;
const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("Please enter first name"),
  last_name: Yup.string().required("Please enter last name "),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter a valid email address"),
  store_name: Yup.string().required("Please enter a store name"),
  brand_name: Yup.string().required("Please enter a brand name"),
  description: Yup.string().required("Please enter a description"),
  phone_number: Yup.string()
    .phone("GB", "Please enter a valid phone number")
    .required("Please enter phone number"),
  website: Yup.string().url(),
  address_line1: Yup.string().required("Please enter a valid address"),
  address_line2: Yup.string(),
  postcode: Yup.string()
    .matches(postcodeRegex, "Invalid UK postcode")
    .required("Please enter a postcode"),
  city: Yup.string().required("Please enter a city"),
  password: Yup.string()
    .min(8, "Password must be 6 characters or more")
    .minUppercase(1, "Password requires at least 1 uppercase character")
    .required("Choose a password"),
  password2: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Repeat your password"),
  accepted_terms: Yup.boolean()
    .required("Required")
    .oneOf([true], "You must accept the terms and conditions."),
});
const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  store_name: "",
  brand_name: "",
  description: "",
  phone_number: "",
  website: "",
  address_line1: "",
  address_line2: "",
  postcode: "",
  city: "",
  password: "",
  password2: "",
  accepted_terms: false,
};

export default function SignUpRestaurantForm() {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signupRestaurant } = useAuth();
  const matches = useMediaQuery("(max-width: 768px)");

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await signupRestaurant(values, resetForm, setSubmitting);
    } catch (error) {
      console.error("Signup Error:", error);
      // Handle signup error (e.g., display error message)
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <form
          className="mx-auto w-full space-y-4 font-geist"
          onSubmit={formik.handleSubmit}
        >
          <div className="mx-auto my-8 max-w-screen-md sm:my-10">
            <Stepper
              active={active}
              onStepClick={setActive}
              allowNextStepsSelect={false}
              completedIcon={
                <IconCircleCheck style={{ width: rem(24), height: rem(24) }} />
              }
              color="primary"
              classNames={{
                stepLabel: "font-clash",
                stepDescription: "font-geist",
              }}
              orientation={matches ? "vertical" : "horizontal"}
            >
              {/* Restaurant Details */}
              <Stepper.Step
                label="Restaurant Details"
                description="Establish Identity"
                icon={
                  <IconBuildingStore
                    style={{ width: rem(22), height: rem(22) }}
                  />
                }
              >
                <div className="space-y-4 sm:mt-4">
                  {/* Store Name */}
                  <fieldset className="">
                    <label
                      htmlFor="store_name"
                      className="sr-only mb-2 block text-sm font-medium"
                    >
                      Store Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="store_name"
                        {...formik.getFieldProps("store_name")}
                        className={`auth-input ${formik.touched.store_name && formik.errors.store_name ? "border-red-500 ring-1 ring-red-500" : ""}`}
                        placeholder="Enter your Store's Name"
                      />
                      <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center gap-3 ps-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-building-store h-5 w-5 text-gray-600"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M3 21l18 0" />
                          <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
                          <path d="M5 21l0 -10.15" />
                          <path d="M19 21l0 -10.15" />
                          <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
                        </svg>

                        <div className="h-6 w-px bg-gray-300" />
                      </div>
                    </div>
                    {formik.touched.store_name && formik.errors.store_name ? (
                      <small className="text-red-500">
                        {formik.errors.store_name}
                      </small>
                    ) : null}
                  </fieldset>

                  {/* Brand Name */}
                  <fieldset className="">
                    <label
                      htmlFor="brand_name"
                      className="sr-only mb-2 block text-sm font-medium"
                    >
                      Brand Name
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="brand_name"
                        {...formik.getFieldProps("brand_name")}
                        className={`auth-input ${formik.touched.brand_name && formik.errors.brand_name ? "border-red-500 ring-1 ring-red-500" : ""}`}
                        placeholder="Enter your Brand Name"
                      />
                      <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center gap-3 ps-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-carousel-horizontal h-5 w-5 text-gray-600"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M7 5m0 1a1 1 0 0 1 1 -1h8a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1z" />
                          <path d="M22 17h-1a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h1" />
                          <path d="M2 17h1a1 1 0 0 0 1 -1v-8a1 1 0 0 0 -1 -1h-1" />
                        </svg>

                        <div className="h-6 w-px bg-gray-300" />
                      </div>
                    </div>
                    {formik.touched.brand_name && formik.errors.brand_name ? (
                      <small className="text-red-500">
                        {formik.errors.brand_name}
                      </small>
                    ) : null}
                  </fieldset>

                  {/* Description */}
                  <fieldset className="">
                    <label htmlFor="description" className="sr-only mb-2">
                      Description
                    </label>
                    <div className="relative">
                      <textarea
                        id="description"
                        {...formik.getFieldProps("description")}
                        className={`auth-textarea ${formik.touched.description && formik.errors.description ? "border-red-500 ring-1 ring-red-500" : ""}`}
                        rows="4"
                        placeholder="Enter a Description"
                      ></textarea>
                      <div className="pointer-events-none absolute inset-y-0 start-0 z-20 my-4 flex gap-3 ps-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-script text-gray-600"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="1.2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M17 20h-11a3 3 0 0 1 0 -6h11a3 3 0 0 0 0 6h1a3 3 0 0 0 3 -3v-11a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v8" />
                        </svg>

                        <div className="h-6 w-px bg-gray-300" />
                      </div>
                    </div>
                    {formik.touched.description && formik.errors.description ? (
                      <small className="text-red-500">
                        {formik.errors.description}
                      </small>
                    ) : null}
                  </fieldset>

                  {/* Phone Number */}
                  <fieldset className="">
                    <label
                      htmlFor="phone_number"
                      className="sr-only mb-2 block text-sm font-medium"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone_number"
                        value={"+44"}
                        {...formik.getFieldProps("phone_number")}
                        className={`auth-input ${formik.touched.phone_number && formik.errors.phone_number ? "border-red-500 ring-1 ring-red-500" : ""}`}
                        placeholder="Enter your Phone Number (+44...)"
                      />
                      <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center gap-3 ps-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-phone h-5 w-5 text-gray-600"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                        </svg>

                        <div className="h-6 w-px bg-gray-300" />
                      </div>
                    </div>
                    {formik.touched.phone_number &&
                    formik.errors.phone_number ? (
                      <small className="text-red-500">
                        {formik.errors.phone_number}
                      </small>
                    ) : null}
                  </fieldset>

                  {/* Website */}
                  <fieldset className="">
                    <label
                      htmlFor="website"
                      className="sr-only mb-2 block text-sm font-medium"
                    >
                      Website (optional)
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="website"
                        value={"+44"}
                        {...formik.getFieldProps("website")}
                        className={`auth-input ${formik.touched.website && formik.errors.website ? "border-red-500 ring-1 ring-red-500" : ""}`}
                        placeholder="Enter your Website (optional)"
                      />
                      <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center gap-3 ps-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-world-share h-5 w-5 text-gray-600"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M20.94 13.045a9 9 0 1 0 -8.953 7.955" />
                          <path d="M3.6 9h16.8" />
                          <path d="M3.6 15h9.4" />
                          <path d="M11.5 3a17 17 0 0 0 0 18" />
                          <path d="M12.5 3a16.991 16.991 0 0 1 2.529 10.294" />
                          <path d="M16 22l5 -5" />
                          <path d="M21 21.5v-4.5h-4.5" />
                        </svg>

                        <div className="h-6 w-px bg-gray-300" />
                      </div>
                    </div>
                    {formik.touched.website && formik.errors.website ? (
                      <small className="text-red-500">
                        {formik.errors.website}
                      </small>
                    ) : null}
                  </fieldset>
                </div>
              </Stepper.Step>

              {/* Location Details */}
              <Stepper.Step
                label="Location Details"
                description="Geographical Insight"
                icon={
                  <IconLocation style={{ width: rem(22), height: rem(22) }} />
                }
              >
                <div className="space-y-4 sm:mt-4">
                  {/* Address Line 1 */}
                  <fieldset className="">
                    <label
                      htmlFor="address_line1"
                      className="sr-only mb-2 block text-sm font-medium"
                    >
                      Address Line 1
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="address_line1"
                        {...formik.getFieldProps("address_line1")}
                        className={`auth-input ${formik.touched.address_line1 && formik.errors.address_line1 ? "border-red-500 ring-1 ring-red-500" : ""}`}
                        placeholder="Enter Address Line 1"
                      />
                      <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center gap-3 ps-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-map-2 h-5 w-5 text-gray-600"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v7.5" />
                          <path d="M9 4v13" />
                          <path d="M15 7v5.5" />
                          <path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z" />
                          <path d="M19 18v.01" />
                        </svg>

                        <div className="h-6 w-px bg-gray-300" />
                      </div>
                    </div>
                    {formik.touched.address_line1 &&
                    formik.errors.address_line1 ? (
                      <small className="text-red-500">
                        {formik.errors.address_line1}
                      </small>
                    ) : null}
                  </fieldset>

                  {/* Address Line 2 */}
                  <fieldset className="">
                    <label
                      htmlFor="address_line2"
                      className="sr-only mb-2 block text-sm font-medium"
                    >
                      Address Line 2
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="address_line2"
                        {...formik.getFieldProps("address_line2")}
                        className={`auth-input ${formik.touched.address_line2 && formik.errors.address_line2 ? "border-red-500 ring-1 ring-red-500" : ""}`}
                        placeholder="Enter Address Line 2 (optional)"
                      />
                      <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center gap-3 ps-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-map-2 h-5 w-5 text-gray-600"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 18.5l-3 -1.5l-6 3v-13l6 -3l6 3l6 -3v7.5" />
                          <path d="M9 4v13" />
                          <path d="M15 7v5.5" />
                          <path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z" />
                          <path d="M19 18v.01" />
                        </svg>

                        <div className="h-6 w-px bg-gray-300" />
                      </div>
                    </div>
                    {formik.touched.address_line2 &&
                    formik.errors.address_line2 ? (
                      <small className="text-red-500">
                        {formik.errors.address_line2}
                      </small>
                    ) : null}
                  </fieldset>

                  {/* Post Code and City */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                    {/* Post COde */}
                    <fieldset className="w-full">
                      <label
                        htmlFor="postcode"
                        className="sr-only mb-2 block text-sm font-medium"
                      >
                        Post Code
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="postcode"
                          {...formik.getFieldProps("postcode")}
                          className={`auth-input ${formik.touched.postcode && formik.errors.postcode ? "border-red-500 ring-1 ring-red-500" : ""}`}
                          placeholder="Enter your post code"
                        />
                        <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center gap-3 ps-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-mail-pin h-5 w-5 text-gray-600"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 19h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4.5" />
                            <path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z" />
                            <path d="M19 18v.01" />
                            <path d="M3 7l9 6l9 -6" />
                          </svg>

                          <div className="h-6 w-px bg-gray-300" />
                        </div>
                      </div>
                      {formik.touched.postcode && formik.errors.postcode ? (
                        <small className="font-geist text-red-500">
                          {formik.errors.postcode}
                        </small>
                      ) : null}
                    </fieldset>

                    {/* City */}
                    <fieldset className="w-full">
                      <label
                        htmlFor="city"
                        className="sr-only mb-2 block text-sm font-medium"
                      >
                        City
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="city"
                          {...formik.getFieldProps("city")}
                          className={`auth-input ${formik.touched.city && formik.errors.city ? "border-red-500 ring-1 ring-red-500" : ""}`}
                          placeholder="Enter your city"
                        />
                        <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center gap-3 ps-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-map-pin h-5 w-5 text-gray-600"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                          </svg>
                          <div className="h-6 w-px bg-gray-300" />
                        </div>
                      </div>
                      {formik.touched.city && formik.errors.city ? (
                        <small className="font-geist text-red-500">
                          {formik.errors.city}
                        </small>
                      ) : null}
                    </fieldset>
                  </div>
                </div>
              </Stepper.Step>

              {/* Account Details */}
              <Stepper.Step
                label="Account Details"
                description="Secure Access"
                icon={<IconUser style={{ width: rem(22), height: rem(22) }} />}
              >
                <div className="space-y-4 sm:mt-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                    {/* Firstname */}
                    <fieldset className="w-full">
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
                          className={`auth-input ${formik.touched.first_name && formik.errors.first_name ? "border-red-500 ring-1 ring-red-500" : ""}`}
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

                          <div className="h-6 w-px bg-gray-300" />
                        </div>
                      </div>
                      {formik.touched.first_name && formik.errors.first_name ? (
                        <small className="font-geist text-red-500">
                          {formik.errors.first_name}
                        </small>
                      ) : null}
                    </fieldset>

                    {/* Lastname */}
                    <fieldset className="w-full">
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
                          className={`auth-input ${formik.touched.last_name && formik.errors.last_name ? "border-red-500 ring-1 ring-red-500" : ""}`}
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
                          <div className="h-6 w-px bg-gray-300" />
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
                        className={`auth-input ${formik.touched.email && formik.errors.email ? "border-red-500 ring-1 ring-red-500" : ""}`}
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
                        <div className="h-6 w-px bg-gray-300" />
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
                      <small className="text-red-500">
                        {formik.errors.password}
                      </small>
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
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="cursor-pointer text-gray-500"
                        >
                          {showConfirmPassword ? <IconEyeOff /> : <IconEye />}
                        </button>
                      </div>
                    </div>
                    {formik.touched.password2 && formik.errors.password2 ? (
                      <small className="text-red-500">
                        {formik.errors.password2}
                      </small>
                    ) : null}
                  </fieldset>
                </div>
              </Stepper.Step>

              {/* Completed Form */}
              <Stepper.Completed>
                <div className="space-y-4 sm:mt-4">
                  {/* Accept Terms and Conditions */}
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
                        <label
                          htmlFor="accepted_terms"
                          className="text-xs sm:text-sm"
                        >
                          I accept the <TermsOfUseModal />
                          and <PrivacyPolicyModal />
                        </label>
                      </div>
                    </div>
                    {formik.touched.accepted_terms &&
                    formik.errors.accepted_terms ? (
                      <small className="text-red-500">
                        {formik.errors.accepted_terms}
                      </small>
                    ) : null}
                  </fieldset>
                </div>

                <p className="mt-4 font-geist">
                  <span className="font-semibold text-red-500">NOTE:</span> Make
                  sure all required fields are completed and confirm all details
                </p>

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
                  className="mt-12"
                >
                  Sign Up
                </Button>
              </Stepper.Completed>
            </Stepper>

            <Group className="font-geist" justify="center" mt="xl">
              {active !== 0 && (
                <Button color="gray" variant="light" onClick={prevStep}>
                  Back
                </Button>
              )}
              {active !== 3 && (
                <Button color="secondary" onClick={nextStep}>
                  Next step
                </Button>
              )}
            </Group>
          </div>
        </form>
      )}
    </Formik>
  );
}
