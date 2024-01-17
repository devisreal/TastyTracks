"use client";

import { Button } from "@mantine/core";
import { toast } from "sonner";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="font-clash text-3xl font-medium">Tasty Tracks</h1>

      <Button variant="light" color="primary" onClick={() => toast.error("This is a sonner toast")}>
        Render my toast
      </Button>

      <div className="flex gap-x-4">
        <Button variant="filled" color="primary">
          Primary Button
        </Button>
        <Button variant="filled" color="secondary">
          Secondary Button
        </Button>
      </div>
    </main>
  );
}
