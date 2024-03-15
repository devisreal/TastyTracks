"use client";
import React, { useState, useLayoutEffect, useRef } from "react";
import { Loader, Button } from "@mantine/core";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import * as Yup from "yup";
import "yup-phone-lite";
import { Formik } from "formik";
import Link from "next/link";
import { IconCloudUpload } from "@tabler/icons-react";

const post_codeRegex = /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$/;
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  first_name: Yup.string().required("Please enter first name"),
  last_name: Yup.string().required("Please enter last name "),
  phone_number: Yup.string()
    .phone("GB", "Please enter a valid phone number")
    .required("Please enter phone number"),
  address: Yup.string().required("Please enter a valid address"),
  city: Yup.string().required("Please enter a city"),
  state: Yup.string(),
  post_code: Yup.string()
    .matches(post_codeRegex, "Invalid UK post_code")
    .required("Please enter a post_code"),
});

export default function EditProfilePage() {
  const { customerDetail, fetchCustomerDetail, updateCustomerDetails } =
    useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const inputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleClick = (event) => {
    inputRef.current.click();
  };

  useLayoutEffect(() => {
    fetchCustomerDetail();
    setIsLoading(false);
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await updateCustomerDetails(values, resetForm, setSubmitting);
      // console.log(values);
    } catch (error) {
      console.error("Add Item Error:", error);
    }
  };

  return (
    <>
      <div className="h-fit border-b lg:py-2.5">
        <div className="flex items-center justify-between space-x-4 px-6 2xl:container">
          <h5
            hidden
            className="block font-clash text-2xl font-medium text-gray-800"
          >
            Edit Profile
          </h5>
        </div>
      </div>

      {!isLoading ? (
        <Formik
          enableReinitialize={true}
          initialValues={{
            username: customerDetail?.user?.username
              ? customerDetail?.user?.username
              : "",
            avatar: customerDetail?.avatar ? customerDetail?.avatar : "",
            first_name: customerDetail?.user?.first_name
              ? customerDetail?.user?.first_name
              : "",
            last_name: customerDetail?.user?.last_name
              ? customerDetail?.user?.last_name
              : "",
            phone_number: customerDetail?.phone_number
              ? customerDetail?.phone_number
              : "",
            address: customerDetail?.address ? customerDetail?.address : "",
            city: customerDetail?.city ? customerDetail?.city : "",
            state: customerDetail?.state ? customerDetail?.state : "",
            post_code: customerDetail?.post_code
              ? customerDetail?.post_code
              : "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <div className="space-y-6 px-6 font-geist">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Username
                      </label>
                      <div className="mt-2">
                        <div
                          className={`flex rounded-md shadow-sm ring-1 ring-inset  sm:max-w-md ${formik.touched.username && formik.errors.username ? " ring-2 ring-red-500 focus:ring-red-500" : "ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600"}`}
                        >
                          <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                            tastytracks/
                          </span>
                          <input
                            type="text"
                            id="username"
                            {...formik.getFieldProps("username")}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="janesmith"
                          />
                        </div>
                        {formik.touched.username && formik.errors.username ? (
                          <small className="font-geist text-red-500">
                            {formik.errors.username}
                          </small>
                        ) : null}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="email"
                          id="email"
                          value={customerDetail?.user?.email}
                          readOnly
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 read-only:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="photo"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Avatar
                      </label>
                      <div className="mt-2 flex items-center gap-x-4">
                        <div className="">
                          {image ? (
                            <Image
                              src={URL.createObjectURL(image)}
                              alt="upload image"
                              height={112}
                              width={112}
                              priority
                              className="h-28 w-28 rounded-full object-cover"
                            />
                          ) : (
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
                          )}

                          <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={(event) => {
                              formik.setFieldValue(
                                "avatar",
                                event.target.files[0],
                              );
                              const file = event.target.files[0];
                              console.log(file);
                              setImage(event.target.files[0]);
                            }}
                            ref={inputRef}
                            style={{ display: "none" }}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={handleClick}
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="first-name"
                          {...formik.getFieldProps("first_name")}
                          className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-md sm:leading-6 ${formik.touched.first_name && formik.errors.first_name ? " ring-2 ring-red-500 focus:ring-red-500" : "ring-gray-300"}`}
                        />
                      </div>
                      {formik.touched.first_name && formik.errors.first_name ? (
                        <small className="font-geist text-red-500">
                          {formik.errors.first_name}
                        </small>
                      ) : null}
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="last-name"
                          {...formik.getFieldProps("last_name")}
                          className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-md sm:leading-6 ${formik.touched.last_name && formik.errors.last_name ? " ring-2 ring-red-500 focus:ring-red-500" : "ring-gray-300"}`}
                        />
                      </div>
                      {formik.touched.last_name && formik.errors.last_name ? (
                        <small className="font-geist text-red-500">
                          {formik.errors.last_name}
                        </small>
                      ) : null}
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="phone-number"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone number
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="phone-number"
                          {...formik.getFieldProps("phone_number")}
                          className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-md sm:leading-6 ${formik.touched.phone_number && formik.errors.phone_number ? " ring-2 ring-red-500 focus:ring-red-500" : "ring-gray-300"}`}
                          placeholder="Enter your Phone Number (+44...)"
                        />
                      </div>
                      {formik.touched.phone_number &&
                      formik.errors.phone_number ? (
                        <small className="font-geist text-red-500">
                          {formik.errors.phone_number}
                        </small>
                      ) : null}
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="street-address"
                          {...formik.getFieldProps("address")}
                          autoComplete="street-address"
                          className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-md sm:leading-6 ${formik.touched.address && formik.errors.address ? " ring-2 ring-red-500 focus:ring-red-500" : "ring-gray-300"}`}
                        />
                      </div>
                      {formik.touched.address && formik.errors.address ? (
                        <small className="font-geist text-red-500">
                          {formik.errors.address}
                        </small>
                      ) : null}
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="city"
                          {...formik.getFieldProps("city")}
                          className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-md sm:leading-6 ${formik.touched.city && formik.errors.city ? " ring-2 ring-red-500 focus:ring-red-500" : "ring-gray-300"}`}
                        />
                      </div>
                      {formik.touched.city && formik.errors.city ? (
                        <small className="font-geist text-red-500">
                          {formik.errors.city}
                        </small>
                      ) : null}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="state"
                          {...formik.getFieldProps("state")}
                          className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-md sm:leading-6 ${formik.touched.state && formik.errors.state ? " ring-2 ring-red-500 focus:ring-red-500" : "ring-gray-300"}`}
                        />
                      </div>
                      {formik.touched.state && formik.errors.state ? (
                        <small className="font-geist text-red-500">
                          {formik.errors.state}
                        </small>
                      ) : null}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="postal-code"
                          {...formik.getFieldProps("post_code")}
                          className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-md sm:leading-6 ${formik.touched.post_code && formik.errors.post_code ? " ring-2 ring-red-500 focus:ring-red-500" : "ring-gray-300"}`}
                        />
                      </div>
                      {formik.touched.post_code && formik.errors.post_code ? (
                        <small className="font-geist text-red-500">
                          {formik.errors.post_code}
                        </small>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Button
                  type="button"
                  variant="subtle"
                  color="#333"
                  component={Link}
                  href="/user/profile"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  color="green.8"
                  rightSection={
                    <IconCloudUpload width={20} height={20} stroke={2} />
                  }
                  loading={formik.isSubmitting}
                  loaderProps={{ type: "dots" }}
                >
                  Save
                </Button>
              </div>
            </form>
          )}
        </Formik>
      ) : (
        <div className="flex h-40 flex-col items-center justify-center gap-y-12">
          <Loader type="bars" color="primary" />
        </div>
      )}
    </>
  );
}
