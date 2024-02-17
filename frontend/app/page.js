"use client";

import { Button } from "@mantine/core";
import { toast } from "sonner";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-clash text-3xl font-medium">Tasty Tracks</h1>

      <Button
        variant="light"
        color="primary"
        onClick={() =>
          toast(
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, in cum assumenda illum id aliquam?",
          )
        }
      >
        Render my toast
      </Button>

      <div className="flex gap-x-4">
        <Button
          component={Link}
          href="/auth/login/"
          variant="light"
          color="primary"
        >
          Login
        </Button>
        <Button
          component={Link}
          href="/auth/signup/"
          variant="filled"
          color="secondary"
        >
          SignUp
        </Button>
      </div>
    </main>
  );
}
