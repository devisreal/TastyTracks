import AuthCarousel from "@/components/auth-carousel/Carousel";
import { ValueProvider } from "@/contexts/ValueContext";

export default function AuthLayout({ children }) {
  return (
    <ValueProvider>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative  lg:col-span-5 lg:h-full xl:col-span-3">
            <AuthCarousel />
          </section>

          <main className="px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-4 xl:col-span-9">
            {children}
          </main>
        </div>
      </section>
    </ValueProvider>
  );
}
