"use client";
import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import Link from "next/link";
import * as Yup from "yup";
import { Formik } from "formik";
import api from "@/utils/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from 'axios'

export default function ForgotPasswordForm() {
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(async () => {
          const res = await axios.post("https://tasty-tracks.onrender.com/api/password-reset/", {
            email: values.email,
          });
          if (res.status === 200) {
            toast.success(res.data.message);
            setSubmitting(false);
            resetForm({
              values: "",
            });
            router.push("/auth/login");
          }
        }, 1000);
      }}
    >
      {(formik) => (
        <form
          className="w-full space-y-6 font-geist sm:w-[36rem]"
          onSubmit={formik.handleSubmit}
        >
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
            Submit
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
