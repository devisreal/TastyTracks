import Link from "next/link";
import { Button } from "@mantine/core";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
          404
        </h1>
        <p className="text-gray-500 md:text-xl/relaxed">Page Not Found</p>
      </div>
      <p className="font-geist mb-6 text-sm text-gray-500 md:text-base">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Button component={Link} href="/" variant="light" color="primary">
        Back to the homepage
      </Button>
    </div>
  );
}
