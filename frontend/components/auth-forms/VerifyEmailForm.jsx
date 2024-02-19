"use client";
import React, { useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import { PinInput } from "@mantine/core";
import { useAuth } from "@/contexts/AuthContext";

export default function VerifyEmailForm() {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { verifyEmail } = useAuth();  

  const handleChange = (value) => {
    setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await verifyEmail(otp, setIsSubmitting);
    } catch (error) {
      console.error("Email Verification Error:", error);
      // Handle verification error (e.g., display error message)
    }
  };
  return (
    <form
      className="w-full space-y-8 font-geist sm:w-[36rem]"
      onSubmit={handleSubmit}
    >
      <fieldset className="my-4 flex justify-center">
        <PinInput
          value={otp}
          onChange={handleChange}
          size="xl"
          length={6}
          type="number"
          oneTimeCode
          placeholder="⚬"
          name="otp"
          // radius="lg"
          styles={{
            input: {
              fontFamily: "var(--font-clash)",
              fontWeight: 600,
              borderRadius: "10px",
            },
            pinInput: {
              outline: "2px solid #f68b1e",
              outlineOffset: "-2px",
              borderRadius: "10px",
            },
          }}
        />
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
        loading={isSubmitting}
        loaderProps={{ type: "dots" }}
      >
        Submit
      </Button>
    </form>
  );
}
