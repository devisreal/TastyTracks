"use client";
import React, { useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import { PinInput } from "@mantine/core";

export default function VerifyEmailForm() {
  const [pin, setPin] = useState("");

  const handleChange = (value) => {
    setPin(value);
  };
  return (
    <form className="w-full space-y-8 font-geist sm:w-[36rem]">
      <fieldset className="my-4 flex justify-center">
        <PinInput
          value={pin}
          onChange={handleChange}
          size="lg"
          length={6}
          type="number"
          oneTimeCode
          placeholder="⚬"
          styles={{
            input: {
              fontFamily: "var(--font-geist-sans)",
              fontWeight: 600,
            },
            pinInput: {
              outline: "2px solid #f68b1e",
              outlineOffset: "-2px",
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
      >
        Submit
      </Button>
    </form>
  );
}
