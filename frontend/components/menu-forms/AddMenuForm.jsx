"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import axios from "axios";

import { Button } from "@mantine/core";
import * as Yup from "yup";
import { Formik } from "formik";
import YupPassword from "yup-password";
import { useAuth } from "@/contexts/AuthContext";
YupPassword(Yup);

const initialValues = {
  name: "",
  description: "",
  price: "",
  image_1: "",
  image_2: "",
  image_3: "",
  category: "",
  is_vegetarian: false,
  is_vegan: false,
  is_gluten_free: false,
  allergens: "",
  cook_time: "",
  calories: "",
  ingredients: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Please enter a description"),
  price: Yup.number().required("Price is required"),
  category: Yup.string().required("Category is required"),
  is_vegetarian: Yup.boolean(),
  is_vegan: Yup.boolean(),
  is_gluten_free: Yup.boolean(),
  allergens: Yup.string(),
  cook_time: Yup.number().required("Cook time is required"),
  calories: Yup.number().required("Calories is required"),
  ingredients: Yup.string().required("Ingredients is required"),
  image_1: Yup.mixed()
    .required("At least one image must be added")
    .test("imageFormat", "Only image files are allowed", (value) => {
      if (value) {
        const supportedFormats = ["jpg", "jpeg", "png", "gif", "webp"]; // Add more formats if needed
        return supportedFormats.includes(
          value.name.split(".").pop().toLowerCase(),
        );
      }
      return true;
    })
    .test("imageSize", "Image size can not be more than 5MB", (value) => {
      if (value) {
        return value.size <= 5, 242, 880; // Adjust size limit as needed (3MB = 3 * 1024 * 1024 bytes)
      }
      return true;
    }),
  // Add more validation as needed
});

export default function AddMenuForm() {
  const { addMenuItem } = useAuth();

  const [categories, setCategories] = useState([]);

  useLayoutEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://tasty-tracks.onrender.com/menu/category/",
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await addMenuItem(values, resetForm, setSubmitting);
    } catch (error) {
      console.error("Add Item Error:", error);
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
          className="mb-10 space-y-4 font-geist"
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
        >
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900 md:text-md"
              >
                Menu name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  {...formik.getFieldProps("name")}
                  className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-md sm:leading-6 ${formik.touched.name && formik.errors.name ? " ring-2 ring-red-500 focus:ring-red-500" : "ring-gray-300"}`}
                />
              </div>
              {formik.touched.name && formik.errors.name ? (
                <small className="font-geist text-red-500">
                  {formik.errors.name}
                </small>
              ) : null}
            </div>

            <div className="">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900 md:text-md"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  id="price"
                  {...formik.getFieldProps("price")}
                  placeholder="00.00"
                  className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-md sm:leading-6 ${formik.touched.price && formik.errors.price ? " ring-2 ring-red-500 focus:ring-red-500" : "ring-gray-300"}`}
                />
              </div>
              {formik.touched.price && formik.errors.price ? (
                <small className="font-geist text-red-500">
                  {formik.errors.price}
                </small>
              ) : null}
            </div>
          </div>

          <div>
            <label
              htmlFor="image_1"
              className="block text-sm font-medium md:text-md"
            >
              Image 1
            </label>
            <input
              type="file"
              name="image_1"
              accept="image/*"
              className="file:font-giest mt-4 block w-full rounded-lg border text-sm shadow-sm ring-1 ring-primary-500 file:me-4 file:rounded file:border-0 file:bg-primary-600 file:px-4 file:py-3 file:font-medium file:text-white focus:z-10 focus:border-primary-500 focus:ring-primary-500"
              onChange={(event) =>
                formik.setFieldValue("image_1", event.target.files[0])
              }
            />
            {formik.touched.image_1 && formik.errors.image_1 ? (
              <small className="font-geist text-red-500">
                {formik.errors.image_1}
              </small>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="image_2"
              className="block text-sm font-medium md:text-md"
            >
              Image 2 (optional)
            </label>
            <input
              type="file"
              name="image_2"
              accept="image/*"
              className="file:font-giest mt-4 block w-full rounded-lg border text-sm shadow-sm ring-1 ring-primary-500 file:me-4 file:rounded file:border-0 file:bg-primary-600 file:px-4 file:py-3 file:font-medium file:text-white focus:z-10 focus:border-primary-500 focus:ring-primary-500"
              onChange={(event) =>
                formik.setFieldValue("image_2", event.target.files[0])
              }
            />
          </div>
          <div>
            <label
              htmlFor="image_3"
              className="block text-sm font-medium md:text-md"
            >
              Image 3 (optional)
            </label>
            <input
              type="file"
              name="image_3"
              accept="image/*"
              className="file:font-giest mt-4 block w-full rounded-lg border text-sm shadow-sm ring-1 ring-primary-500 file:me-4 file:rounded file:border-0 file:bg-primary-600 file:px-4 file:py-3 file:font-medium file:text-white focus:z-10 focus:border-primary-500 focus:ring-primary-500"
              onChange={(event) =>
                formik.setFieldValue("image_3", event.target.files[0])
              }
            />
          </div>

          <div className="">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900 md:text-md"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                rows={3}
                {...formik.getFieldProps("description")}
                className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-md sm:leading-6 ${formik.touched.description && formik.errors.description ? " ring-2 ring-red-500 focus:ring-red-500" : "ring-gray-300"}`}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Write a few sentences about this meal.
            </p>
            {formik.touched.description && formik.errors.description ? (
              <small className="font-geist text-red-500">
                {formik.errors.description}
              </small>
            ) : null}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className=" sm:col-span-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900 md:text-md"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  {...formik.getFieldProps("category")}
                  className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-md sm:leading-6 ${formik.touched.category && formik.errors.category ? " ring-2 ring-red-500 focus:ring-red-500" : "ring-gray-300"}`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {formik.touched.category && formik.errors.category ? (
                <small className="font-geist text-red-500">
                  {formik.errors.category}
                </small>
              ) : null}
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="ingredients"
                className="block text-md font-medium leading-6 text-gray-900 md:text-md"
              >
                Ingredients
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="ingredients"
                  {...formik.getFieldProps("ingredients")}
                  className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-md sm:leading-6 ${formik.touched.ingredients && formik.errors.ingredients ? " ring-2 ring-red-500 focus:ring-red-500" : "ring-gray-300"}`}
                />
              </div>
              {formik.touched.ingredients && formik.errors.ingredients ? (
                <small className="font-geist text-red-500">
                  {formik.errors.ingredients}
                </small>
              ) : null}
            </div>
          </div>

          <div className="mt-10 space-y-6">
            <fieldset>
              <legend className="text-sm  font-medium leading-6 text-gray-900 md:text-md">
                Meal options
              </legend>
              <div className="mt-6 space-y-4">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="is_vegetarian"
                      type="checkbox"
                      {...formik.getFieldProps("is_vegetarian")}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="is_vegetarian"
                      className="font-medium text-gray-900"
                    >
                      Vegetarian
                    </label>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="is_vegan"
                      type="checkbox"
                      {...formik.getFieldProps("is_vegan")}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="is_vegan"
                      className="font-medium text-gray-900"
                    >
                      Vegan
                    </label>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="is_gluten_free"
                      type="checkbox"
                      {...formik.getFieldProps("is_gluten_free")}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="is_gluten_free"
                      className="font-medium text-gray-900"
                    >
                      Gluten free
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-6 sm:gap-x-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900 md:text-md"
              >
                Allergens
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  {...formik.getFieldProps("allergens")}
                  className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-md sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="calories"
                className="block text-sm font-medium leading-6 text-gray-900 md:text-md"
              >
                Calories
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  id="calories"
                  {...formik.getFieldProps("calories")}
                  placeholder="00.0(kcal)"
                  className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-md sm:leading-6 ${formik.touched.calories && formik.errors.calories ? " ring-2 ring-red-500 focus:ring-red-500" : "ring-gray-300"}`}
                />
              </div>
              {formik.touched.calories && formik.errors.calories ? (
                <small className="font-geist text-red-500">
                  {formik.errors.calories}
                </small>
              ) : null}
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="cook_time"
                className="block text-sm font-medium leading-6 text-gray-900 md:text-md"
              >
                Cook time
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="cook_time"
                  {...formik.getFieldProps("cook_time")}
                  placeholder="00(mins)"
                  className={`block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-md sm:leading-6 ${formik.touched.cook_time && formik.errors.cook_time ? " ring-2 ring-red-500 focus:ring-red-500" : "ring-gray-300"}`}
                />
              </div>
              {formik.touched.cook_time && formik.errors.cook_time ? (
                <small className="font-geist text-red-500">
                  {formik.errors.cook_time}
                </small>
              ) : null}
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
              label: "text-sm sm:text-base font-medium",
            }}
            loading={formik.isSubmitting}
            loaderProps={{ type: "dots" }}
            className="mt-12"
          >
            Create Menu
          </Button>
        </form>
      )}
    </Formik>
  );
}
