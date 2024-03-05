import AuthCarousel from "@/components/auth-carousel/Carousel";
import { ValueProvider } from "@/contexts/ValueContext";
import { Button } from "@mantine/core";
import { IconHome, IconHome2 } from "@tabler/icons-react";
import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <ValueProvider>
      <section className="relative bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative  lg:col-span-5 lg:h-full xl:col-span-3">
            <AuthCarousel />
          </section>

          <main className="px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-4 xl:col-span-9">
            {children}
          </main>
        </div>

        <div className="absolute right-0 top-0 p-4">
          <Button
            leftSection={<IconHome2 size={22} />}
            component={Link}
            variant="default"
            href="/"
            className="font-geist"
            classNames={{
              label: "font-medium",
            }}
          >
            Go Home
          </Button>
        </div>
      </section>
    </ValueProvider>
  );
}
